import cv2
import urllib.request
import numpy as np
#import AI model library
from ultralytics import YOLO
# Load pretrained YOLOv8 small model
model = YOLO("yolo11n.pt")

url = "http://10.118.195.215/jpg"

cv2.namedWindow("ESP32-CAM Stream", cv2.WINDOW_NORMAL)
cv2.resizeWindow("ESP32-CAM Stream", 800, 600) 

while True:
    try:
        # Fetch image from the URL
        resp = urllib.request.urlopen(url)
        image_data = resp.read()

        # Convert the bytes to a numpy array
        np_arr = np.frombuffer(image_data, np.uint8)

        # Decode the image
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # Run YOLO object detection
        results = model(frame)

        # Draw results on frame
        annotated_frame = results[0].plot()

        # Show the frame
        cv2.imshow("ESP32-CAM Stream", annotated_frame)

        # Print all detected objects
        for result in results:
            for box in result.boxes:
                cls_id = int(box.cls[0])
                conf = float(box.conf[0])
                label = model.names[cls_id]
                print(f"Detected {label} with confidence {conf:.2f}")

        # Exit on 'q' key
        if cv2.waitKey(1) & 0xFF == ord(' '):
            break

    except Exception as e:
        print("Error:", e)
        break

cv2.destroyAllWindows()
