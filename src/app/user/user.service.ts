import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private usersUrl: string = 'http://localhost:5000/api/user';

    constructor(private http: HttpClient) { }

    getUser(): Observable<IUser> {
        return this.http.get<IUser>(`${this.usersUrl}`)
    }
}
