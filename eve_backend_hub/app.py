import base64
from os import path

from flask import Flask, request
from flask_socketio import SocketIO, emit, join_room, leave_room

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Dictionary to track robot connections
connected_robots = {}
browsers_to_robots = {}
robots_to_browsers = {}

@app.route('/')
def index():
    return "WebSocket server is running..."


# Event handler for when a browser connects and sends a robot ID
@socketio.on('connect_browser')
def handle_browser_connection(data):
    robot_id = data.get('robot_id')
    browser_sid = request.sid
    print(f"Browser connected with SID {browser_sid} requesting Robot ID: {robot_id}")

    # Check if the requested robot is connected
    if robot_id in connected_robots:
        room = f"robot_{robot_id}"
        browsers_to_robots[browser_sid] = connected_robots[robot_id]
        robots_to_browsers[connected_robots[robot_id]] = browser_sid
        join_room(room)
        emit('browser_connected', {'message': f'Browser with sid {browser_sid} Connected to robot {robot_id}'}, room=room)
    else:
        emit('error', {'message': 'Robot not connected'})


# Event handler for when a robot connects
@socketio.on('connect_robot')
def handle_robot_connection(data):
    robot_id = data.get('robot_id')
    robot_sid = request.sid
    print(f"Robot connected with ID: {robot_id}, SID: {robot_sid}")

    # Store the robot connection
    connected_robots[robot_id] = robot_sid
    room = f"robot_{robot_id}"
    join_room(room)

    emit('robot_registered', {'message': f'Robot {robot_id} registered successfully'}, room=room)


# Event handler to forward messages from browser to robot
@socketio.on('send_command')
def handle_send_command(data):
    command = data.get('command')
    browser_sid = request.sid
    robot_sid = browsers_to_robots[browser_sid]
    print(f"Command received from Browser SID {browser_sid} for Robot ID {robot_sid}: {command}")

    # Send different messages to the browser and robot
    emit('execute_command', {'command': command}, to=robot_sid)
    emit('acknowledge_command', {'message': f'Command "{command}" sent to robot'}, to=browser_sid)


@socketio.on('robot_send_image')
def handle_send_image(data):
    robot_sid = request.sid
    browser_sid = robots_to_browsers[robot_sid]
    file_name = f'static/{data.get("index")}.jpeg'
    file_name = path.join(path.dirname(path.realpath(__file__)), file_name)
    with open(file_name, 'wb+') as f:
        f.write(base64.b64decode(data.get('image_data')))
    print(f'sending to browser sid: {browser_sid}')
    emit('send_browser_image', data, to=browser_sid)


# Event handler for when a robot disconnects
@socketio.on('disconnect_robot')
def handle_robot_disconnection(data):
    robot_id = data.get('robot_id')
    print(f"Robot with ID {robot_id} disconnected")

    # Remove the robot from the connected list
    if robot_id in connected_robots:
        del connected_robots[robot_id]

    room = f"robot_{robot_id}"
    leave_room(room)
    emit('robot_disconnected', {'message': f'Robot {robot_id} disconnected'}, room=room)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
