import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppGlobalService {
  private token: string;
  private loggedOn: boolean;

  constructor() { }

  setToken(accessToken: string) {
    this.token = accessToken;
  }

  getToken() {
    return this.token;
  }

  getLoggedOn() {
    return this.loggedOn;
  }

  setLoggedOn() {
    this.loggedOn = true;
  }

  setLoggedOff() {
    this.loggedOn = false;
  }

}
