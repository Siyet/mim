#include <SoftwareSerial.h>
SoftwareSerial SIM800(8, 9);        // 8 - RX Arduino (TX SIM800L), 9 - TX Arduino (RX SIM800L)
int _step = 0;

void setup() {
  Serial.begin(115200);               // Скорость обмена данными с компьютер
  SIM800.begin(115200);               // Скорость обмена данными с модемом
  Serial.println("Start!");
  pinMode(A5, INPUT_PULLUP);
  pinMode(13, INPUT);
  digitalWrite(13,0);
}

void loop() {
  if (Serial.available()){
    SIM800.write(Serial.read());
  }
  if (SIM800.available()){
    Serial.write(SIM800.read());
  }
  if (!digitalRead(A5)){
    SIM800.println("AT+CMGS=\"+79774715265\"");
    _step = 1;
    delay(1000);
  }
  if(_step == 1){
    SIM800.println("ERROR: 105. Lublinskaya ulitsa, 201, p 2");
    SIM800.println((String)((char)26));
    _step = 0;
    delay(2000);
  }
  
  
//  if (old_status != _status && !SIM800.available() && _step == 0){
//    SIM800.println("AT+CIPSTART=\"TCP\",\"95.214.63.201\",5000");
//    _step = 1;
//  } else if (!SIM800.available()) return;
//  String resp = SIM800.readString();
//  Serial.println((String)_step + "resp: " + resp);
//  if (_step == 1 && resp.indexOf("CONNECT") > 0) {
//    Serial.println("send AT+CIPSEND");
//    SIM800.println("AT+CIPSEND");
//    _step = 2;
//  } else if (_step == 2 && resp.indexOf(">") > 0) {
//    SIM800.println("GET /?u=a0cdb12605d7eabad6f5a44b64000d66&t=1564222485823&s=" + _status + " HTTP/1.1");
//    SIM800.println("Host: 95.214.63.201");
//    SIM800.println("");
//    SIM800.println("");
//    SIM800.println((String)((char)26));
//    _step = 3;
//  } else if (_step == 3){
//    int idx = resp.indexOf("timestamp");
//    if (idx < 0) return; 
//    Serial.println(resp.substring(idx+11, idx+11+13));
//    char* tmp = string2char(resp.substring(idx+9, idx+9+13));
//    old_status = _status;
//    _step = 0;
//    Serial.println(old_status + " " + _status);
//    delay(2000);
//  }
}

char* string2char(String command){
  if(command.length()!=0){
    char *p = const_cast<char*>(command.c_str());
    return p;
  }
}