#include <SoftwareSerial.h>
SoftwareSerial SIM800(8, 9);        // 8 - RX Arduino (TX SIM800L), 9 - TX Arduino (RX SIM800L)
int start_timestamp = 0;
int _step = 0;
String _status = "00011000";
String old_status = "00010000";
void setup() {
  Serial.begin(115200);               // Скорость обмена данными с компьютер
  SIM800.begin(115200);               // Скорость обмена данными с модемом
  Serial.println("Start!");
}




void loop() {
  if ((!start_timestamp || old_status != _status) && !SIM800.available() && _step == 0){
    SIM800.println("AT+CIPSTART=\"TCP\",\"95.214.63.201\"," + (String)(start_timestamp ? "5000" : "3000"));
    _step = 1;
  } else if (!SIM800.available()) return;
  String resp = SIM800.readString();
  Serial.println((String)_step + "resp: " + resp);
  if (_step == 1 && resp.indexOf("CONNECT") > 0) {
    Serial.println("send AT+CIPSEND");
    SIM800.println("AT+CIPSEND");
    _step = 2;
  } else if (_step == 2 && resp.indexOf(">") > 0) {
    SIM800.println("GET /" + (start_timestamp ? ("?u=a0cdb12605d7eabad6f5a44b64000d66&t=1564222485823&s=" + _status) : "") + " HTTP/1.1");
    SIM800.println("Host: 95.214.63.201");
    SIM800.println("");
    SIM800.println("");
    SIM800.println((String)((char)26));
    _step = 3;
  } else if (_step == 3){
    int idx = resp.indexOf("timestamp");
    if (idx < 0) return; 
    Serial.println(resp.substring(idx+11, idx+11+13));
    char* tmp = string2char(resp.substring(idx+9, idx+9+13));
    if (start_timestamp && old_status != _status) old_status = _status;
    start_timestamp = atoi(tmp) + millis();
    _step = 0;
    Serial.println(old_status + " " + _status);
    delay(2000);
  }
}

char* string2char(String command){
  if(command.length()!=0){
    char *p = const_cast<char*>(command.c_str());
    return p;
  }
}




#include <SoftwareSerial.h>                     // Библиотека програмной реализации обмена по UART-протоколу
SoftwareSerial SIM800(8, 9);                    // RX, TX

String _response = "";                          // Переменная для хранения ответа модуля
void setup() {
  Serial.begin(115200);                           // Скорость обмена данными с компьютером
  SIM800.begin(115200);                           // Скорость обмена данными с модемом
  Serial.println("Start!");

  sendATCommand("AT", true);                    // Отправили AT для настройки скорости обмена данными

  // Команды настройки модема при каждом запуске
  //_response = sendATCommand("AT+CLIP=1", true);  // Включаем АОН
  //_response = sendATCommand("AT+DDET=1", true);  // Включаем DTMF
  // _response = sendATCommand("AT+CMGF=1;&W", true); // Включаем текстовый режима SMS (Text mode) и сразу сохраняем значение (AT&W)!

}

String sendATCommand(String cmd, bool waiting) {
  String _resp = "";                            // Переменная для хранения результата
  Serial.println(cmd);                          // Дублируем команду в монитор порта
  SIM800.println(cmd);                          // Отправляем команду модулю
  if (waiting) {                                // Если необходимо дождаться ответа...
    _resp = waitResponse();                     // ... ждем, когда будет передан ответ
    // Если Echo Mode выключен (ATE0), то эти 3 строки можно закомментировать
    if (_resp.startsWith(cmd)) {                // Убираем из ответа дублирующуюся команду
      _resp = _resp.substring(_resp.indexOf("\r", cmd.length()) + 2);
    }
    Serial.println(_resp);                      // Дублируем ответ в монитор порта
  }
  return _resp;                                 // Возвращаем результат. Пусто, если проблема
}

String waitResponse() {                         // Функция ожидания ответа и возврата полученного результата
  String _resp = "";                            // Переменная для хранения результата
  long _timeout = millis() + 10000;             // Переменная для отслеживания таймаута (10 секунд)
  while (!SIM800.available() && millis() < _timeout)  {}; // Ждем ответа 10 секунд, если пришел ответ или наступил таймаут, то...
  if (SIM800.available()) {                     // Если есть, что считывать...
    _resp = SIM800.readString();                // ... считываем и запоминаем
  }
  else {                                        // Если пришел таймаут, то...
    Serial.println("Timeout...");               // ... оповещаем об этом и...
  }
  return _resp;                                 // ... возвращаем результат. Пусто, если проблема
}

void loop() {
  if (SIM800.available())   {                   // Если модем, что-то отправил...
    _response = waitResponse();                 // Получаем ответ от модема для анализа
    _response.trim();                           // Убираем лишние пробелы в начале и конце
    Serial.println(_response);                  // Если нужно выводим в монитор порта
    //....
    if (_response.startsWith("+CMTI:")) {       // Пришло сообщение об отправке SMS
      int index = _response.lastIndexOf(",");   // Находим последнюю запятую, перед индексом
      String result = _response.substring(index + 1, _response.length()); // Получаем индекс
      result.trim();                            // Убираем пробельные символы в начале/конце
      _response=sendATCommand("AT+CMGR="+result, true); // Получить содержимое SMS
      parseSMS(_response);                      // Распарсить SMS на элементы
      sendATCommand("AT+CMGDA=\"DEL ALL\"", true); // Удалить все сообщения, чтобы не забивали память модуля
    }
  }
  if (Serial.available())  {                    // Ожидаем команды по Serial...
    SIM800.write(Serial.read());                // ...и отправляем полученную команду модему
  };
}


void parseSMS(String msg) {
  String msgheader  = "";
  String msgbody    = "";
  String msgphone    = "";

  msg = msg.substring(msg.indexOf("+CMGR: "));
  msgheader = msg.substring(0, msg.indexOf("\r"));

  msgbody = msg.substring(msgheader.length() + 2);
  msgbody = msgbody.substring(0, msgbody.lastIndexOf("OK"));
  msgbody.trim();

  int firstIndex = msgheader.indexOf("\",\"") + 3;
  int secondIndex = msgheader.indexOf("\",\"", firstIndex);
  msgphone = msgheader.substring(firstIndex, secondIndex);

  Serial.println("Phone: "+msgphone);
  Serial.println("Message: "+msgbody);

  // Далее пишем логику обработки SMS-команд.
  // Здесь также можно реализовывать проверку по номеру телефона
  // И если номер некорректный, то просто удалить сообщение.
}


void sendSMS(String phone, String message)
{
  sendATCommand("AT+CMGS=\"" + phone + "\"", true);             // Переходим в режим ввода текстового сообщения
  sendATCommand(message + "\r\n" + (String)((char)26), true);   // После текста отправляем перенос строки и Ctrl+Z
}