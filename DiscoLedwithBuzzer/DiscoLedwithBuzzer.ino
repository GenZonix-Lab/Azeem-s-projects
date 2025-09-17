#include <Adafruit_NeoPixel.h>

// Pin setup
#define LED_PIN 5          // WS2812 data pin
#define NUM_LEDS 1         // Single LED
#define BUZZER_PIN 18      // Buzzer pin

Adafruit_NeoPixel strip(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);

// Notes (frequencies in Hz)
int melody[] = { 262, 294, 330, 349, 392, 440, 494, 523 }; // C D E F G A B C
int noteDuration = 300; // ms per note

void setup() {
  strip.begin();
  strip.show();
  pinMode(BUZZER_PIN, OUTPUT);
}

void loop() {
  for (int i = 0; i < 8; i++) {
    tone(BUZZER_PIN, melody[i]);  // Play note
    rainbowFlash(i);              // Change LED color with each note
    delay(noteDuration);
    noTone(BUZZER_PIN);           // Stop note
    delay(50);
  }
}

// Change LED color with note
void rainbowFlash(int pos) {
  uint32_t color = strip.Color(
    (pos * 32) % 255, 
    (255 - pos * 32) % 255, 
    (pos * 64) % 255
  );

  strip.setPixelColor(0, color); // Single LED
  strip.show();
}
