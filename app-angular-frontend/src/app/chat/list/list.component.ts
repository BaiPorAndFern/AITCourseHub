import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  chats: any[] = []

  constructor(public chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getAll().subscribe({
      next: (response) => {
        this.chats = response.chats
      }
    })
  }

}
