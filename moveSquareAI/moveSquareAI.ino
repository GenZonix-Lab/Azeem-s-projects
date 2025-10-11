#include <WiFi.h>
#include <WiFiUdp.h>
#include "motor_pin.h"

const char* ssid = "GenZonix";
const char* password = "qazwsxedcrfv";

WiFiUDP udp;
unsigned int localPort = 4210;

void setup() {
  Serial.begin(115200);
  pinMode(motor1A, OUTPUT);
  pinMode(motor1B, OUTPUT);
  pinMode(motor2A, OUTPUT);
  pinMode(motor2B, OUTPUT);
  stop(); 
  //wifi_config
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected!");
  Serial.print("ESP32 IP: ");
  Serial.println(WiFi.localIP());
  //udp_begin
  udp.begin(localPort);
  Serial.printf("Listening on UDP port %d\n", localPort);
}

void loop() {
  int packetSize = udp.parsePacket();
  if (packetSize) {
    char incomingPacket[255];
    int len = udp.read(incomingPacket, 255);
    if (len > 0) incomingPacket[len] = 0;
    Serial.print("Received: ");
    Serial.println(incomingPacket);
    handleCommand(incomingPacket);
  }
}
void handleCommand(String cmd) {
  if (cmd == "stop") stop();
  //else if (cmd == "circle") circle();
  else if (cmd == "square") square(500,400);
  //else if (cmd == "infinity") infinite();

  Serial.println("Command executed: " + cmd);
  delay(50);
}
