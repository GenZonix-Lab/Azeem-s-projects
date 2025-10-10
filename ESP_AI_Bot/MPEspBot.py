#import the required modules
import cv2, math
import mediapipe as mp
import urllib.request
import numpy as np
import socket
#Stream_url
url = "http://10.117.249.215/jpg"

# Set up UDP connection
ESP32_IP = "10.117.249.63"  # 👈 Replace with your ESP32's IP from Serial Monitor
PORT = 4210
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

# Initialize mediapipe
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils

# Function to determine which fingers are up
def fingers_status(hand_landmarks, hand_label):
    lm = hand_landmarks.landmark
    # finger up checks (True = finger extended)
    index_up  = lm[8].y  < lm[6].y
    middle_up = lm[12].y < lm[10].y
    ring_up   = lm[16].y < lm[14].y
    pinky_up  = lm[20].y < lm[18].y
    # thumb: x comparison depends on hand side (image coordinates)
    if hand_label == "Right":
        thumb_up = lm[4].x < lm[3].x
    else:
        thumb_up = lm[4].x > lm[3].x
    return [thumb_up, index_up, middle_up, ring_up, pinky_up]

# Function to recognize gestures based on finger states
def recognize_gesture(fingers, hand_landmarks, img_w, img_h):
    thumb, index, middle, ring, pinky = fingers
    # Simple digit detection
    if index and middle and ring and pinky and not thumb:
        return "backward"
    if index and middle and ring and pinky and thumb:
        return "forward"
    if index and pinky and not (ring or middle or thumb):
        return "left"
    if index and middle and not (ring or pinky or thumb):
        return "right"
    return "stop"

# Start video capture and process frames
with mp_hands.Hands(
    static_image_mode=False,
    max_num_hands=2,
    min_detection_confidence=0.6,
    min_tracking_confidence=0.6
) as hands:
    while True:
        # Fetch image from the URL
        resp = urllib.request.urlopen(url)
        image_data = resp.read()

        # Convert the bytes to a numpy array
        np_arr = np.frombuffer(image_data, np.uint8)

        # Decode the image
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        
        # Flip for selfie-display only (after processing & drawing)
        display = cv2.flip(frame, 1)
        # IMPORTANT: do NOT flip here (process raw frame)
        img_h, img_w = display.shape[:2]
        rgb = cv2.cvtColor(display, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb)

        if results.multi_hand_landmarks and results.multi_handedness:
            # zip keeps order aligned (landmarks <-> handedness)
            for hand_landmarks, handedness in zip(results.multi_hand_landmarks, results.multi_handedness):
                label = handedness.classification[0].label  # "Left" or "Right"
                fingers = fingers_status(hand_landmarks, label)
                gesture = recognize_gesture(fingers, hand_landmarks, img_w, img_h)
                # send gesture via UDP
                if(gesture):
                    sock.sendto(gesture.encode(), (ESP32_IP, PORT))
                    print("Message sent:", gesture)

                # draw landmarks & label on the (non-flipped) frame
                mp_drawing.draw_landmarks(display, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                # place text near the wrist (landmark 0)
                wrist_x = int(hand_landmarks.landmark[0].x * img_w)
                wrist_y = int(hand_landmarks.landmark[0].y * img_h)
                if label == "Right":
                    cv2.putText(display, f"{label}: {gesture}", (420,30),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (100,255,100), 3)
                else:
                    cv2.putText(display, f"{label}: {gesture}", (10,30),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0,200,200), 3)
        else:
            sock.sendto("stop".encode(), (ESP32_IP, PORT))
            print("Message sent:", "stop")

        cv2.imshow("Hand Gestures (esc to quit)", display)
        if cv2.waitKey(1) & 0xFF == 27:
            break

# Release and terminate resources
cv2.destroyAllWindows()
