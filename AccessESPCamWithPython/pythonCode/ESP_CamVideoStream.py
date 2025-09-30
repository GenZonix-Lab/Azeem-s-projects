import cv2
import urllib.request
import numpy as np

url = "http://10.45.21.215/jpg" #Replace your ESP host address

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

        # Show the frame
        cv2.imshow("ESP32-CAM Stream", frame)

        # Exit on 'q' key
        if cv2.waitKey(1) & 0xFF == ord(' '):
            break

    except Exception as e:
        print("Error:", e)
        break

cv2.destroyAllWindows()
