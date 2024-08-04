import cv2
import depthai
import time
import asyncio
import base64
from os import path
import socketio
import socket

# Define a unique robot ID
robot_id = "robot123"

# Create a Socket.IO client instance
sio = socketio.AsyncClient()


# Set up the server to accept connections from the EV3 client
serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serversocket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
serversocket.bind(('0.0.0.0', 12345)) 
serversocket.listen(1)

print("Waiting for EV3 client connection...")
(clientsocket, address) = serversocket.accept()
print("Connected to EV3 client at", address)

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

stop_img_capture = False

@sio.on('execute_command')
async def on_execute_command(data):
    global stop_img_capture
    # Handle the 'execute_command' event sent from the server
    command = data.get('command')
    print(f"Executing command: {command}")
    # Execute the command (replace with actual command handling logic)
    if command == 'start_robot':
        stop_img_capture = False
        await capture_images()
    elif command == 'stop_img_capture':
        stop_img_capture = True
    result = f"Command '{command}' executed"

    # Optionally, send the result back to the server
    # sio.emit('command_result', {'robot_id': robot_id, 'result': result})
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
    img_num = 0

    with depthai.Device(pipeline) as device:
        print('Connected cameras:', device.getConnectedCameraFeatures())
        print('Device name:', device.getDeviceName(), ' Product name:', device.getProductName())
        q_rgb = device.getOutputQueue("rgb")

        img_num+=1
        in_rgb = q_rgb.get()
        print("in_rgb")
        print(in_rgb)
        if in_rgb is not None:
            frame = in_rgb.getCvFrame()
            encoded_image = get_image_data(frame)
            await sio.emit('robot_send_image', {'index': img_num,'image_data': encoded_image})


async def handle_ev3_client(clientsocket):
    while True:
        try:
            data = clientsocket.recv(1024)
            if not data:
                continue
            message = data.decode()
            print("Received from EV3 client:", message)
            if message == 'Take a picture':
                # Trigger image capture directly
                await capture_images()
                # Send acknowledgment back to EV3 client
                clientsocket.sendall("Picture taken".encode())
        except Exception as e:
            print("Error handling EV3 client:", e)

def get_image_data(frame):
    _, buffer = cv2.imencode('.jpeg', frame)
    encoded_image = base64.b64encode(buffer).decode('utf-8')
    return encoded_image

# async def send_images(frame):
#     # replace with better looping logic

async def main():
    # Connect the client to the server
    await sio.connect('http://100.66.219.234:5000')

    asyncio.create_task(handle_ev3_client(clientsocket))


    # Wait for events indefinitely
    await sio.wait()


asyncio.run(main())
