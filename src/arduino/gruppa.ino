// Подключаем библиотеку Software Serial
#include <SoftwareSerial.h>
#include <TimerOne.h>
// Объявляем задействованные дискретные каналы контроллера для связи
SoftwareSerial outSerial(9, 10); // RX, TX
String str;
int strInt;
int stage;
int door;
int weight;
long count;
long timeMs;
boolean flagLift1;
boolean flagLift2;
boolean flagLift3;
boolean flagLift4;
boolean flagLift5;
boolean flagLift6;
boolean oldReadlift;
boolean ReadLoop;
String strRead;
void setup()
{
  ReadLoop = true; //признак отсутствия запроса
  oldReadlift = true;
  flagLift1 = false;
  flagLift2 = false;
  flagLift3 = false;
  flagLift4 = false;
  flagLift5 = false;
  flagLift6 = false;
  count = 0;
  Timer1.initialize(100);
  Timer1.attachInterrupt(timerIsr);
  Serial.begin(115200); // Обычная скорость передачи данных аппаратного UART порта (используем для проверки получения данных от другого контроллера)
  outSerial.begin(6944); //скорость обмена программного порта
  timeMs = 0;
}
void loop()//основной цикл
{
  if ((outSerial.available()) && (ReadLoop == true)) { //если есть данные
    count = 0;
    str = outSerial.read();
    Serial.println();
    Serial.print("timeMs   ");
    Serial.println(timeMs);
    if ( str.equals("0") == true) { //синхро байт
      timeMs = 0;
      oldReadlift = true;
      flagLift1 = false;
      flagLift2 = false;
      flagLift3 = false;
      flagLift4 = false;
      flagLift5 = false;
      flagLift6 = false;
    }
    else {
      if (timeMs < 60) {
        Serial.println();
        Serial.print("лифт 1   ");
        parseLift(str);
        flagLift1 = true;
      }
      else if (timeMs < 120) {
        Serial.println();
        Serial.print("лифт 2   ");
        parseLift(str);
        flagLift2 = true;
      }
      else if (timeMs < 180) {
        Serial.println();
        Serial.print("лифт 3   ");
        parseLift(str);
        flagLift3 = true;
      }
      else if (timeMs < 240) {
        Serial.println();
        Serial.print("лифт 4   ");
        parseLift(str);
        flagLift4 = true;
      }
      else if (timeMs < 300) {
        Serial.println();
        Serial.print("лифт 5   ");
        parseLift(str);
        flagLift5 = true;
      }
      else if (timeMs < 360) {
        Serial.println();
        Serial.print("лифт 6  ");
        parseLift(str);
        flagLift6 = true;
      }
      else  {  //не ответил ни один лифт
        Serial.print("между 38 и 50 мс  :  ");
        Serial.println(str);
      }
    }
  }
  // всегда
  if (count > 50000) { //если нет данных не от кого 5сек
    count = 0;
    for (int i = 1 ; i < 7; i++) {
      readLift(i);
    }
    ReadLoop = true; //закончили запросы

  }

  if ((timeMs > 500) && (oldReadlift == true)) { //после 50мс опрашиваем лифты которые не ответили
    oldReadlift = false;
    Serial.println("Флаги:");
    Serial.print(flagLift1);
    Serial.print(flagLift2);
    Serial.print(flagLift3);
    Serial.print(flagLift4);
    Serial.print(flagLift5);
    Serial.println(flagLift6);

    if (flagLift1 != true) {
      readLift(1);
    }
    if (flagLift2 != true) {
      readLift(2);
    }
    if (flagLift3 != true) {
      readLift(3);
    }
    if (flagLift4 != true) {
      readLift(4);
    }
    if (flagLift5 != true) {
      readLift(5);
    }
    if (flagLift6 != true) {
      readLift(6);
    }
  }
  //----------------------------------------------------------------------------------------
}
void parseLift(String str) {
  strInt = str.toInt();
  stage = strInt & 31;
  strInt = strInt >> 5;
  door = strInt & 1;
  strInt = strInt >> 1;
  weight = strInt & 1;

  Serial.print("Этаж ");
  Serial.print(stage);
  Serial.print(" ,");
  if (door == 1) {
    Serial.print("Двери закрыты");
  }
  else {
    Serial.print("Двери открыты");
  }
  Serial.print(" ,");
  if (weight == 1) {
    Serial.println("Есть пассажир");
  }
  else {
    Serial.println("Нет пассажира");
  }
}
void readLift(int numberLift) {
  ReadLoop = false; // вход в режим запроса сост.
  outSerial.write(numberLift);//запрос
  delay(2);
  if (outSerial.available()) {
    strRead = outSerial.read();
    if (strRead.equals("0") != true) {
      Serial.println();
      Serial.print("ЛИФТ № ");
      Serial.print(numberLift);
      Serial.print(" - Событие ");
      Serial.print(strRead);//out resp
    }
  }
  else {
    Serial.println();
    Serial.print("ЛИФТ № ");
    Serial.print(numberLift);
    Serial.print(" - Не отвечает  ");
  }
  ReadLoop = true;
}
void timerIsr() {
  timeMs++;
  count++;
}