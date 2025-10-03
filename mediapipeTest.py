# STEP 1: Import the necessary modules.
import cv2
import numpy as np
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

# STEP 2: Create an HandLandmarker object.
base_options = python.BaseOptions(model_asset_path='hand_landmarker.task')
options = vision.HandLandmarkerOptions(base_options=base_options,num_hands=2)
detector = vision.HandLandmarker.create_from_options(options)


# STEP 3: Load the input image.
image = mp.Image.create_from_file("WIN_20251002_19_42_48_Pro.jpg") #Replace your image path


# STEP 4: Detect objects in the input image.
detection_result = detector.detect(image)

# STEP 5: Visualize the handmark detection position result
def visualize(image, detection_result):
	for hand in detection_result.hand_landmarks:
		for landmark in hand:
			x = int(landmark.x * image.shape[1])
			y = int(landmark.y * image.shape[0])
			cv2.circle(image, (x, y), 5, (0, 255, 0), -1)
	return image

# STEP 6: Process the detection result. In this case, visualize it.
image_copy = np.copy(image.numpy_view())
annotated_image = visualize(image_copy, detection_result)
rgb_annotated_image = cv2.cvtColor(annotated_image, cv2.COLOR_BGR2RGB)
cv2.namedWindow("Hand Landmarks", cv2.WINDOW_NORMAL)
cv2.resizeWindow("Hand Landmarks", 420, 315) 
cv2.imshow("Hand Landmarks", rgb_annotated_image)
cv2.waitKey(0)
cv2.destroyAllWindows()



