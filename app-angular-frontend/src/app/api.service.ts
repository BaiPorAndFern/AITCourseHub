import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }
    // makes a GET request to the Express server’s ‘/api/message’ route
    getMessage() {
        return this.http.get(
            'http://localhost:3000/api/message');
    }
}