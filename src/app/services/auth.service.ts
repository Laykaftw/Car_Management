import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL: string = 'http://localhost:8089/users';
  // apiURL: string = 'http://localhost:8082/users';
  token!: string;
  private helper = new JwtHelperService();

  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  public regitredUser: User = new User();

  constructor(private router: Router, private http: HttpClient) {}

  setRegistredUser(user: User) {
    this.regitredUser = user;
  }
  getRegistredUser() {
    return this.regitredUser;
  }

  login(user: User) {
    return this.http.post<User>(this.apiURL + '/login', user, {
      observe: 'response',
    });
  }

  saveToken(jwt: string) {
    console.log('Saving token:', jwt); // Log the token being saved
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  decodeJWT() {
    if (!this.token) {
      console.error('No token found.');
      return;
    }
    try {
      const decodedToken = this.helper.decodeToken(this.token);
      if (decodedToken) {
        this.roles = decodedToken.roles;
        this.loggedUser = decodedToken.sub;
      } else {
        console.error('Failed to decode token');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  loadToken() {
    const storedToken = localStorage.getItem('jwt');
    if (storedToken) {
      console.log('Loaded token:', storedToken); // Log token loading
      this.token = storedToken;
      this.decodeJWT();
    } else {
      console.error('No token in localStorage');
    }
  }

  isTokenExpired(): Boolean {
    if (!this.token) return true; // Token is considered expired if not available
    return this.helper.isTokenExpired(this.token);
  }

  getToken(): string {
    return localStorage.getItem('jwt') || ''; // Make sure it's stored correctly
  }

  isAdmin(): Boolean {
    if (!this.roles) return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
  }
  registerUser(user: User) {
    return this.http.post<User>(this.apiURL + '/register', user, {
      observe: 'response',
    });
  }
  validateEmail(code : string){
    return this.http.get<User>(this.apiURL+'/verifyEmail/'+code);
    }
}
