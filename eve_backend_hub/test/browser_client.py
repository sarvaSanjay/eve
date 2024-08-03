import socketio

# Define a unique robot ID
robot_id = "robot123"

# Create a Socket.IO client instance
sio = socketio.Client()

# Define event handlers for the client

@sio.event
def connect():
    print("Connected to the server.")
    # Register the robot with the server after connecting
    sio.emit('connect_browser', {'robot_id': robot_id})

@sio.event
def disconnect():
    print("Disconnected from the server.")

@sio.on("browser_connected")
def browser_connected(data):
    print(f"message: {data.get('message')}")

@sio.on('execute_command')
def on_execute_command(data):
    # Handle the 'execute_command' event sent from the server
    command = data.get('command')
    print(f"Executing command: {command}")
    # Execute the command (replace with actual command handling logic)
    result = f"Command '{command}' executed"

    # Optionally, send the result back to the server
    sio.emit('command_result', {'robot_id': robot_id, 'result': result})
    print(f"Result sent: {result}")


# Connect the client to the server
sio.connect('http://localhost:5000')

# Wait for events indefinitely
sio.wait()
