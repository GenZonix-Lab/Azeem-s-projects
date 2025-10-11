#import the required modules
import cv2, math
import mediapipe as mp
import urllib.request
import numpy as np
import socket

# Stream URL (ESP32-CAM)
url = "http://10.117.249.215/jpg"

# Transparency of camera image (1.0 = full camera, 0.0 = full background)
alpha = 0  

# Create a background (solid color, optional)
background = np.full((480, 640, 3), 0, dtype=np.uint8)

# Set up UDP connection
ESP32_IP = "10.117.249.63"  # 👈 Replace with your ESP32's IP from Serial Monitor
PORT = 4210
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Initialize Mediapipe
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

recognition = "stop"

# Function to determine which fingers are up
def fingers_status(hand_landmarks, hand_label):
    lm = hand_landmarks.landmark
    index_up  = lm[8].y  < lm[6].y
    middle_up = lm[12].y < lm[10].y
    ring_up   = lm[16].y < lm[14].y
    pinky_up  = lm[20].y < lm[18].y
    if hand_label == "Right":
        thumb_up = lm[4].x < lm[3].x
    else:
        thumb_up = lm[4].x > lm[3].x
    return [thumb_up, index_up, middle_up, ring_up, pinky_up]

# Function to recognize gestures based on finger states
def recognize_gesture(fingers, hand_landmarks, img_w, img_h):
    thumb, index, middle, ring, pinky = fingers
    # Simple digit detection
    """ if index and middle and ring and pinky and not thumb:
        return "circle" """
    if index and middle and ring and pinky and thumb:
        return "square"
    
    """ if index and pinky and not (ring or middle or thumb):
        return "infinity" """
    return "stop"

# Start video processing
with mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=1,
    min_detection_confidence=0.4,
    min_tracking_confidence=0.4
) as hands:
    while True:
        # Fetch image from ESP32-CAM
        try:
            resp = urllib.request.urlopen(url, timeout=2)
            image_data = resp.read()
        except:
            print("⚠️ Connection lost. Retrying...")
            continue

        # Decode the image
        np_arr = np.frombuffer(image_data, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if frame is None:
            continue

        # Flip for selfie-view
        display = cv2.flip(frame, 1)
        img_h, img_w = display.shape[:2]
        rgb = cv2.cvtColor(display, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb)

        # Resize background to match camera frame size (if needed)
        background_resized = cv2.resize(background, (img_w, img_h))
        # Blend camera image with background
        blended = cv2.addWeighted(display, alpha, background_resized, 1 - alpha, 0)

        if results.multi_hand_landmarks and results.multi_handedness:
            for hand_landmarks, handedness in zip(results.multi_hand_landmarks, results.multi_handedness):
                label = handedness.classification[0].label
                fingers = fingers_status(hand_landmarks, label)
                gesture = recognize_gesture(fingers, hand_landmarks, img_w, img_h)
                if(gesture!=recognition):
                    recognition=gesture
                    print("Message sent:", gesture)
                    sock.sendto(gesture.encode(), (ESP32_IP, PORT))
                mp_drawing.draw_landmarks(blended, hand_landmarks, mp_hands.HAND_CONNECTIONS)

                # Label text
                text_pos = (10, 30) if label == "Left" else (420, 30)
                color = (0, 255, 255) if label == "Left" else (0, 255, 0)
                cv2.putText(blended, f"{label}: {gesture}", text_pos,
                            cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
        else:
            gesture="stop"
            print("Message sent:", gesture)
            sock.sendto(gesture.encode(), (ESP32_IP, PORT))

        cv2.imshow("Hand Gestures (ESC to quit)", blended)
        if cv2.waitKey(1) & 0xFF == 27:
            break

cv2.destroyAllWindows()
