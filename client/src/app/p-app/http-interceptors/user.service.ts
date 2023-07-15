import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/app/environments/environments';
import { DTOUser } from '../_models/DTOUser';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<DTOUser[]>(`${environment.apiUrl}/user`);
    }
}