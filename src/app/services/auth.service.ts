import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  register(user){
    return this.http.post('http://localhost:8000/api/signin',user);
  }
  login(user){
    return this.http.post('http://localhost:8000/api/signup',user);
  }
}
