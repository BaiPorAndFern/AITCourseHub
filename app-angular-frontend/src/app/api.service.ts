import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }
    // makes a GET request to the Express server’s ‘/api/message’ route
    getMessage(): Observable<any> {
        return this.http.get(
            'http://localhost:3500/api/message');
    }
}