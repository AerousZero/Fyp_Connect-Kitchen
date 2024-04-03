import json
import uuid
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message

# Dictionary to store WebSocket instances mapped to device IDs
websocket_clients = {}

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Generate a unique ID for the device/user
        self.device_id = str(uuid.uuid4())

        # Accept the connection
        await self.accept()

        # Add the WebSocket instance to the dictionary with the device ID as the key
        websocket_clients[self.device_id] = self

        # Send a welcome message along with the device ID when the client connects
        await self.send(text_data=json.dumps({
            'message': 'Welcome! You are now connected to the WebSocket server.',
            'device_id': self.device_id
        }))

    async def disconnect(self, close_code):
        # Remove the WebSocket instance from the dictionary upon disconnection
        if self.device_id in websocket_clients:
            del websocket_clients[self.device_id]

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_content = text_data_json['message']
        target_device_id = text_data_json['target_device_id']
        
        if target_device_id in websocket_clients:
            # If the target device ID is found, send the message
            await websocket_clients[target_device_id].send_message(message_content)
        else:
            # If the target device ID is not found, send an error message
            await self.send(text_data=json.dumps({
                'error': f'Device with ID {target_device_id} is not connected.'
            }))

    async def send_message(self, message_content):
        await self.send(text_data=json.dumps({
            'message': message_content
        }))

    @classmethod
    async def send_message_to_device(cls, device_id, message_content):
        if device_id in websocket_clients:
            await websocket_clients[device_id].send_message(message_content)
