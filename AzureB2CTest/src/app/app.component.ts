import { Component } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import * as Msal from 'msal';
import { AppGlobalService } from './service/app-global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Azure B2C Test';
  baseUrl = 'http://localhost:5000/';

  username: string;
  token: string;

  applicationId = '2fcb32c4-5104-4837-a2ca-a093fcc8633a'; // B2C app id
  tenant = 'asingalatenant2.onmicrosoft.com';             // Azure Tenant Id
  signUpSignInpolicy = 'B2C_1_signupsignin1';             // Name of User flow

  // Name of scope, taken from portal.
  appConfig = {
    b2cScopes: ['https://asingalatenant2.onmicrosoft.com/api/Hello.Read']
  };

  // The creation of this was taken from the ref above.
  authority = 'https://asingalatenant2.b2clogin.com/asingalatenant2.onmicrosoft.com/B2C_1_signupsignin1';

  // configuration to initialize msal
  msalConfig = {
    auth: {
        clientId: this.applicationId,   // This is your client ID
        authority: this.authority,      // This is your tenant info
        validateAuthority: false
    }
  };

  clientApplication = new Msal.UserAgentApplication(this.msalConfig);

  // request to signin - returns an idToken
  loginRequest = {
    scopes: this.appConfig.b2cScopes
  };

  // request to acquire a token for resource access
  tokenRequest = {
    scopes: this.appConfig.b2cScopes
  };

  constructor(private http: HttpClient, private globalSvc: AppGlobalService) {
  }

  login() {
    var _this = this;   // JS this.

    _this.clientApplication.loginPopup(_this.loginRequest).then(function (idToken: any) {
      _this.clientApplication.acquireTokenSilent(_this.tokenRequest).then(
        function(accessToken: any) {
          console.log(accessToken);
          _this.token = accessToken.accessToken;
          _this.globalSvc.setToken(_this.token);
          _this.globalSvc.setLoggedOn();
          _this.username = _this.clientApplication.getAccount().name;
          console.log(_this.username);
          // _this.saveAccessTokenToCache(accessToken);
        }, function( error: any) {
          alert('Error Level #1: ' + error);
        }
      )
      }, function(error: any) {
        alert('Error Level #2: ' + error);
    });
  }

  logout() {
    this.clientApplication.logout();
    this.globalSvc.setLoggedOff();
  }

  callAPIWithToken() {
    if (!this.globalSvc.getToken()) {
      alert('Please login first.');
      return;
    }

    console.log(this.token);
    const hdrs = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    console.log(hdrs);

    this.http.get<any>(this.baseUrl + 'api/values', {headers: hdrs})
      .subscribe(data => {
        console.log(data);
      });

  }
}
