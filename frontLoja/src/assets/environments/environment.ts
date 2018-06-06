// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // Initialize Firebase
  config : {
  apiKey: "AIzaSyC0q4PKWnoQcRTBdv7_8x5Ji_tENjJzfhY",
  authDomain: "auth-angular-7b91c.firebaseapp.com",
  databaseURL: "https://auth-angular-7b91c.firebaseio.com",
  projectId: "auth-angular-7b91c",
  storageBucket: "auth-angular-7b91c.appspot.com",
  messagingSenderId: "63258536448"
  }
};
