import cv2
import depthai
import asyncio
import base64
import socketio

# Define a unique robot ID
robot_id = "robot123"

# Create a Socket.IO client instance
sio = socketio.AsyncClient()


# Define event handlers for the client

@sio.event
async def connect():
    print("Connected to the server.")
    # Register the robot with the server after connecting
    await sio.emit('connect_robot', {'robot_id': robot_id})


@sio.event
async def disconnect():
    print("Disconnected from the server.")


@sio.on("robot_registered")
async def robot_registered(data):
    print(f"message: {data.get('message')}")


@sio.on("browser_connected")
async def browser_connected(data):
    print(f"message: {data.get('message')}")

img_num = 0

@sio.on('execute_command')
async def on_execute_command(data):
    global img_num
    # Handle the 'execute_command' event sent from the server
    command = data.get('command')
    print(f"Executing command: {command}")
    # Execute the command (replace with actual command handling logic)
    if command == 'start_robot':
        await capture_images()

    result = f"Command '{command}' executed"
    print(result)


async def capture_images():
    pipeline = depthai.Pipeline()

    # Color stream
    cam_rgb = pipeline.createColorCamera()
    cam_rgb.setPreviewSize(300, 300)
    cam_rgb.setInterleaved(False)

    xout_rgb = pipeline.createXLinkOut()
    xout_rgb.setStreamName("rgb")

    cam_rgb.preview.link(xout_rgb.input)

    with depthai.Device(pipeline) as device:
        print('Connected cameras:', device.getConnectedCameraFeatures())
        print('Device name:', device.getDeviceName(), ' Product name:', device.getProductName())
        q_rgb = device.getOutputQueue("rgb")
        in_rgb = q_rgb.get()
        print("in_rgb")
        print(in_rgb)
        if in_rgb is not None:
            frame = in_rgb.getCvFrame()
            print("frame")
            print(frame)
            encoded_image = get_image_data(frame)
            print(encoded_image)
            await sio.emit('robot_send_image', {'index': img_num, 'image_data': encoded_image})


def get_image_data(frame):
    _, buffer = cv2.imencode('.jpeg', frame)
    encoded_image = base64.b64encode(buffer).decode('utf-8')
    return encoded_image

async def main():
    # Connect the client to the server
    await sio.connect('http://localhost:5000')

    # Wait for events indefinitely
    await sio.wait()


asyncio.run(main())
