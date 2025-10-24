//ESP Now Master code
#include "ESP32_NOW.h"
#include "WiFi.h"
#include <esp_mac.h>  // For the MAC2STR and MACSTR macros

#define ESPNOW_WIFI_CHANNEL 6
#define r1 5
#define r2 18
bool r1_state = false;
bool r2_state = false;

String cmd="";

class ESP_NOW_Broadcast_Peer : public ESP_NOW_Peer {
public:
  // Constructor of the class using the broadcast address
  ESP_NOW_Broadcast_Peer(uint8_t channel, wifi_interface_t iface, const uint8_t *lmk) : ESP_NOW_Peer(ESP_NOW.BROADCAST_ADDR, channel, iface, lmk) {}

  // Destructor of the class
  ~ESP_NOW_Broadcast_Peer() {
    remove();
  }

  // Function to properly initialize the ESP-NOW and register the broadcast peer
  bool begin() {
    if (!ESP_NOW.begin() || !add()) {
      log_e("Failed to initialize ESP-NOW or register the broadcast peer");
      return false;
    }
    return true;
  }

  // Function to send a message to all devices within the network
  bool send_message(const uint8_t *data, size_t len) {
    if (!send(data, len)) {
      log_e("Failed to broadcast message");
      return false;
    }
    return true;
  }
};

uint32_t msg_count = 0;

// Create a broadcast peer object
ESP_NOW_Broadcast_Peer broadcast_peer(ESPNOW_WIFI_CHANNEL, WIFI_IF_STA, nullptr);

/* Main */

void setup() {
  Serial.begin(115200);
  pinMode(r1,INPUT_PULLUP);
  pinMode(r2,INPUT_PULLUP);

  // Initialize the Wi-Fi module
  WiFi.mode(WIFI_STA);
  WiFi.setChannel(ESPNOW_WIFI_CHANNEL);
  while (!WiFi.STA.started()) {
    delay(100);
  }
  Serial.println("ESP-NOW Master");
  Serial.println("  MAC Address: " + WiFi.macAddress());
  Serial.printf("  Channel: %d\n", ESPNOW_WIFI_CHANNEL);

  // Register the broadcast peer
  if (!broadcast_peer.begin()) {
    Serial.println("Failed to initialize broadcast peer");
    Serial.println("Reebooting in 5 seconds...");
    delay(5000);
    ESP.restart();
  }
}

void loop() {
  bool r1_val = digitalRead(r1);
  bool r2_val = digitalRead(r2);
  char data[32];
  if(!r1_val){
    r1_state = !r1_state;
    if(r1_state){
      cmd = "r1on";
    }else {
      cmd = "r1off";
    }
    snprintf(data, sizeof(data), "%s",cmd.c_str());
    Serial.printf("Broadcasting message: %s\n", data);
    if (!broadcast_peer.send_message((uint8_t *)data, sizeof(data))) {
      Serial.println("Failed to broadcast message");
    }
    delay(800);
  }else if(!r2_val){
    r2_state = !r2_state;
    if(r2_state){
      cmd = "r2on";
    }else {
      cmd = "r2off";
    }
    snprintf(data, sizeof(data), "%s",cmd.c_str());
    Serial.printf("Broadcasting message: %s\n", data);
    if (!broadcast_peer.send_message((uint8_t *)data, sizeof(data))) {
      Serial.println("Failed to broadcast message");
    }
    delay(800);
  } 
}


