#include <Adafruit_NeoPixel.h>

// Pin configuration
#define LED_PIN 5          // WS2812 data pin connected to GPIO5 (change if needed)
#define NUM_LEDS 1         // Number of WS2812 LEDs
#define POT_PIN 34         // Potentiometer connected to GPIO34 (ADC pin on ESP32)

Adafruit_NeoPixel strip(NUM_LEDS, LED_PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'
  Serial.begin(115200);
}

void loop() {
  int potValue = analogRead(POT_PIN);  // Read potentiometer value (0–4095 on ESP32)

  if (potValue < 50) {  // Near zero = turn off LED
    strip.clear();
    strip.show();
  } else {
    int hue = map(potValue, 0, 4095, 0, 65535); // Map pot to hue range (rainbow)
    
    // Fixed brightness = 60% (out of 255 → ~153)
    uint8_t brightness = 222;  

    // Full saturation, fixed brightness
    uint32_t color = strip.gamma32(strip.ColorHSV(hue, 255, brightness));

    strip.setPixelColor(0, color); 
    strip.show();
  }

  delay(10); // Smooth update
}
