import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent {
  chat: any = {}

  message: string = ""

  constructor(public chatService: ChatService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.chatService.getById(id).subscribe({
        next: (response) => {
          this.chat = response.chat

          this.chatService.connectToChat();
        } 
      })

      this.chatService.messages$.subscribe((message) => {
        this.chat.messages.push(message)
      });
    });
  }

  sendMessage() {
    this.chatService.sendMessage(this.chat._id, this.message)

    this.message = ''
  }
}