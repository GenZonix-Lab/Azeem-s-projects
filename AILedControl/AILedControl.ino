#include <WiFi.h>
#include <WiFiUdp.h>
#include <Adafruit_NeoPixel.h>

#define LED_PIN 12      // GPIO connected to WS2812
#define NUM_LEDS 1      // Single LED

Adafruit_NeoPixel strip(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);

const char* ssid = "GenZonix";
const char* password = "qazwsxedcrfv";

// Set your desired static IP address here
IPAddress local_IP(10, 117, 24, 125);      // 👈 ESP32 will always use this
IPAddress gateway(192, 168, 1, 1);        // Usually your router’s IP
IPAddress subnet(255, 255, 255, 0);       // Common subnet
IPAddress primaryDNS(8, 8, 8, 8);         // Optional
IPAddress secondaryDNS(8, 8, 4, 4);       // Optional

WiFiUDP udp;
unsigned int localPort = 4210;

void setup() {
  Serial.begin(115200);

  // Configure static IP
  if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
    Serial.println("⚠️ Failed to configure Static IP");
  }

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected!");
  Serial.print("ESP32 IP: ");
  Serial.println(WiFi.localIP());

  udp.begin(localPort);
  Serial.printf("Listening on UDP port %d\n", localPort);

  strip.begin();
  strip.show();
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
  if (cmd == "Green") {
    strip.setPixelColor(0, strip.Color(0, 255, 0)); // Green
  } else if (cmd == "Red") {
    strip.setPixelColor(0, strip.Color(255, 0, 0)); // Red
  } else if (cmd == "White") {
    strip.setPixelColor(0, strip.Color(255, 255, 255)); // White
  } else if (cmd == "Yellow") {
    strip.setPixelColor(0, strip.Color(255, 255, 0)); // Yellow
  } else if (cmd == "Orange") {
    strip.setPixelColor(0, strip.Color(255, 165, 0)); // Orange
  } else if (cmd == "Cyan") {
    strip.setPixelColor(0, strip.Color(0, 255, 255)); // Cyan
  } else {
    strip.setPixelColor(0, strip.Color(0, 0, 0)); // Turn off for unknown command
  }

  strip.show();  // Update the LED
  Serial.println("Command executed: " + cmd);
}
