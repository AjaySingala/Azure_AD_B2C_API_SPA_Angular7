import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import * as Msal from 'msal';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from '../service/app-global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  username: string;
  token: string;

  // request to signin - returns an idToken
  loginRequest = {
    scopes: environment.appConfig.b2cScopes
  };

  // request to acquire a token for resource access
  tokenRequest = {
    scopes: environment.appConfig.b2cScopes
  };

  // configuration to initialize msal
  msalConfig = {
    auth: {
        clientId: environment.applicationId,   // This is your client ID
        authority: environment.authority,      // This is your tenant info
        validateAuthority: false
    }
  };

  constructor(private http: HttpClient, private globalSvc: AppGlobalService) {
  }

  ngOnInit() {
  }

  callAPIWithToken() {
    if(!this.globalSvc.getToken()) {
      alert('Please login first.');
      return;
    }
    
    this.token = this.globalSvc.getToken();
    console.log('Token...', this.token);

    console.log('3: ' + this.token);
    const hdrs = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    console.log(hdrs);

    this.http.get<any>(environment.baseUrl + 'api/values', {headers: hdrs})
      .subscribe(data => {
        console.log(data);
    });
  }
}
