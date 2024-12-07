import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';

interface Message {
  senderId: { firstname?: string } | string; // `firstname` is optional if senderId is populated
  content: string;
  senderName?: string; // This will hold the resolved name
}

interface Chat {
  _id: string;
  name: string;
  messages: Message[];
}

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss',
})
export class ShowComponent {
  chat: Chat = { _id: '', name: '', messages: [] };
  message: string = '';

  constructor(public chatService: ChatService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];

      this.chatService.getById(id).subscribe({
        next: (response) => {
          console.log('Fetched chat with messages:', response);
          this.chat = response.chat;

          // Add senderName to each message for display
          this.chat.messages.forEach((msg: Message) => {
            if (typeof msg.senderId === 'object' && msg.senderId.firstname) {
              msg.senderName = msg.senderId.firstname;
            } else {
              msg.senderName = 'Unknown Sender';
            }
          });

          // Connect to WebSocket after chat details are loaded
          console.log(
            `Connecting to chat WebSocket for chat ID: ${this.chat._id}`
          );
          this.chatService.connectToChat();
        },
        error: (err) => {
          console.error('Failed to load chat details:', err);
        },
      });

      // Subscribe to incoming messages
      this.chatService.messages$.subscribe((message) => {
        // Debug log to verify message structure
        console.log('Incoming message:', message);

        if (message.senderId && message.senderId.firstname) {
          message.senderName = message.senderId.firstname; // Assign readable name
        } else {
          message.senderName = 'Unknown Sender';
        }

        this.chat.messages.push(message);
      });
    });
  }

  ngOnDestroy(): void {
    console.log(`Leaving chat with ID: ${this.chat._id}`);
    if (this.chatService.socket$) {
      this.chatService.socket$.complete(); // Properly close the WebSocket connection
      this.chatService.socket$ = null; // Reset the WebSocket object
    }
  }

  sendMessage() {
    if (this.message.trim() === '') {
      console.warn('Message cannot be empty');
      return;
    }

    this.chatService.sendMessage(this.chat._id, this.message);
    this.message = '';
  }
}
