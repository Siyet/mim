#include <SoftwareSerial.h>
SoftwareSerial SIM800(8, 9);        // 8 - RX Arduino (TX SIM800L), 9 - TX Arduino (RX SIM800L)
int start_timestamp = 0;
String status = "00011000";
String old_status = "00010000";
void setup() {
  Serial.begin(115200);               // Скорость обмена данными с компьютер
  SIM800.begin(115200);               // Скорость обмена данными с модемом
  Serial.println("Start!");
}

void loop() {
  
  if (!start_timestamp) {
    SIM800.println("AT+CIPSTART=\"TCP\",\"95.214.63.201\",3000");
    start_timestamp = waitResp("");
  }
  if (old_status != status) {
    SIM800.println("AT+CIPSTART=\"TCP\",\"95.214.63.201\",5000");
    start_timestamp = waitResp("?u=a0cdb12605d7eabad6f5a44b64000d66&t=1564222485823&s=" + status);
    old_status = status;
  }
}

int waitResp (String request){
  String resp = "";
  
  while (true){
    if (!SIM800.available()) continue;
    resp = SIM800.readString();
    if (resp == "COONECT OK"){
      SIM800.println("AT+CIPSEND");
    } else if (resp == ">") {
      SIM800.println("GET /" + request + " HTTP/1.1");
      SIM800.println("Host: 95.214.63.201");
      SIM800.println("");
      SIM800.println("");
      SIM800.println((String)((char)26));
    } else if (resp.startsWith("timestamp:")){
      char* tmp = string2char(resp.substring(9));
      return atoi(tmp) + millis();
    }
    delay(10);
  }
  Serial.println("1Start!");
}
char* string2char(String command){
  if(command.length()!=0){
    char *p = const_cast<char*>(command.c_str());
    return p;
  }
}