import cv2
import depthai as dai
import asyncio
import base64
import socketio
import socket
from concurrent.futures import ThreadPoolExecutor

# Define a unique robot ID
robot_id = "robot123"

recv_buffer = b""
end_char = b"\0"

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

executor = ThreadPoolExecutor(max_workers=1)
capture_event = asyncio.Event()

# Define event handlers for the client
@sio.event
async def connect():
    print("Connected to the server.")
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
    command = data.get('command')
    print(f"Executing command: {command}")
    if command == 'start_robot':
        write_to_client(clientsocket, "start_robot")

    result = f"Command '{command}' executed"
    print(result)

async def video_stream():
    pipeline = dai.Pipeline()
    cam_rgb = pipeline.createColorCamera()
    cam_rgb.setPreviewSize(1920, 1080)
    cam_rgb.setInterleaved(False)
    cam_rgb.setColorOrder(dai.ColorCameraProperties.ColorOrder.RGB)
    cam_rgb.initialControl.setAutoFocusMode(dai.CameraControl.AutoFocusMode.AUTO)

    cam_rgb.initialControl.setSharpness(0)     # range: 0..4, default: 1
    cam_rgb.initialControl.setLumaDenoise(0)   # range: 0..4, default: 1
    cam_rgb.initialControl.setChromaDenoise(4) # range: 0..4, default: 1
    xout_rgb = pipeline.createXLinkOut()
    xout_rgb.setStreamName("rgb")

    cam_rgb.preview.link(xout_rgb.input)

    with dai.Device(pipeline) as device:
        print('Connected cameras:', device.getConnectedCameraFeatures())
        print('Device name:', device.getDeviceName(), ' Product name:', device.getProductName())
        q_rgb = device.getOutputQueue("rgb", maxSize=1, blocking=False)

        while True:
            # Non-blocking attempt to get a frame
            in_rgb = q_rgb.tryGet()
            if in_rgb is not None:
                frame = in_rgb.getCvFrame()
                if capture_event.is_set():
                    capture_event.clear()
                    await capture_image(frame)

            await asyncio.sleep(0.01)  # Yield control to event loop

async def capture_image(frame):
    global img_num
    img_num += 1
    encoded_image = get_image_data(frame)
    await sio.emit('robot_send_image', {'index': img_num, 'image_data': encoded_image})

async def handle_ev3_client(clientsocket):
    print('Started handle_ev3_client function')
    while True:
        try:
            loop = asyncio.get_event_loop()
            message = await loop.run_in_executor(executor, read_from_client, clientsocket)
            if not message:
                continue
            print("Received from EV3 client:", message)
            if message == 'Take a picture':
                capture_event.set()
                write_to_client(clientsocket, "Picture taken")
            elif message == 'Robot Stopped':
                await sio.emit('robot_stopped', 'Robot Stopped')
        except Exception as e:
            print("Error handling EV3 client:", e)

def get_image_data(frame):
    _, buffer = cv2.imencode('.jpeg', frame)
    encoded_image = base64.b64encode(buffer).decode('utf-8')
    return encoded_image

def write_to_client(client_socket, message):
    try:
        total = 0
        msg = message.encode() + end_char
        while total < len(msg):
            sent = client_socket.send(msg[total:])
            if sent == 0:
                raise RuntimeError("Socket connection broken")
            total += sent
        print("Message sent to server - " + message)     
    except ConnectionError as e:
        print("Unable to connect to the server:", str(e))
    except Exception as e:
        print("An error occurred:", str(e))

def read_from_client(client_socket):
    try:
        global recv_buffer
        while end_char not in recv_buffer:
            chunk = client_socket.recv(1024)
            if chunk == b"":
                raise RuntimeError("Socket connection broken")
            recv_buffer += chunk
        end_char_loc = recv_buffer.index(end_char)
        msg = recv_buffer[:end_char_loc]
        recv_buffer = recv_buffer[end_char_loc + 1:]
        return msg.decode()
    except ConnectionError as e:
        print("Unable to connect to the server:", str(e))
    except Exception as e:
        print("An error occurred:", str(e))

async def main():
    try:
        # Connect the client to the server
        await sio.connect('http://100.66.219.234:5000')
        print("Socket.IO client connected")

        # Create tasks for handling the Socket.IO client, EV3 client, and video stream
        tasks = [
            asyncio.create_task(sio.wait()),  # Handle Socket.IO events
            asyncio.create_task(handle_ev3_client(clientsocket)),  # Handle EV3 client
            asyncio.create_task(video_stream())  # Run video stream
        ]
        
        # Wait for all tasks to complete
        await asyncio.gather(*tasks)
    except Exception as e:
        print(f"Error in main: {e}")

asyncio.run(main())
