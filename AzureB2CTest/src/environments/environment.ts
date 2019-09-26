// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:5000/',
  applicationId: '2fcb32c4-5104-4837-a2ca-a093fcc8633a', // B2C app id
  tenant: 'asingalatenant2.onmicrosoft.com',             // Azure Tenant Id
  signUpSignInpolicy: 'B2C_1_signupsignin1',             // Name of User flow
  // Name of scope, taken from portal.
  appConfig: {
    b2cScopes: ['https://asingalatenant2.onmicrosoft.com/api/Hello.Read']
  },
  // The creation of this was taken from the ref above.
  authority: 'https://asingalatenant2.b2clogin.com/asingalatenant2.onmicrosoft.com/B2C_1_signupsignin1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
