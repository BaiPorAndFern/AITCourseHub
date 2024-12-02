import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'front-end';
  message: any;
    constructor(private apiService: ApiService) { };
    ngOnInit() {
        this.apiService.getMessage().subscribe(data => {
            this.message = data;
        });
    }
}
