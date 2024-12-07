import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = 'http://localhost:3500/chats';
  public socket$: WebSocketSubject<any> | null = null; //help estabish connnection with server
  private messagesSubject: Subject<any> = new Subject();
  public messages$: Observable<any> = this.messagesSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  create(chat: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, chat, {
      headers: this.getHeaders(),
    });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { headers: this.getHeaders() });
  }

  getById(id: String): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  connectToChat(): void {
    if (this.socket$) {
      console.log('Closing previous WebSocket connection');
      this.socket$.complete(); // Close the existing connection
    }
  
    console.log('Establishing new WebSocket connection');
    this.socket$ = webSocket("ws://localhost:3500");
  
    this.socket$.subscribe(
      (message) => this.messagesSubject.next(message),
      (err) => console.error('WebSocket error:', err),
      () => console.warn('WebSocket connection closed')
    );
  }

  disconnectFromChat(): void {
    if (this.socket$) {
      console.log('Disconnecting WebSocket connection');
      this.socket$.complete(); // Close the WebSocket connection
      this.socket$ = null; // Reset the WebSocket object
    }
  }

  sendMessage(chatId: string, content: string): void {
    const userId = this.authService.getUser().id;

    const message = {
      chatId: chatId,
      senderId: userId,
      content: content,
    };
    if (this.socket$) {
      this.socket$.next(message);
    } else {
      console.error('WebSocket connection is not established');
    }
  }
}
