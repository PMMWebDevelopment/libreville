View site [here](https://libreville-2018.firebaseapp.com/#/)

# Libreville

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Steps taken to build this app

1. Installed jQuery and Bootstrap.
2. Created database through Firebas. Began by populating languages table to feed the menu in the catalogue section of the library.
3. Created a library service in the library folder to take care of all calls on the backend database (and also the Gutenber API).
4. Set up Authors and Bookshelf Components
5. Followed instructions at https://itnext.io/step-by-step-complete-firebase-authentication-in-angular-2-97ca73b8eb32 to install user authentication with Firebase. Also Github repository at https://github.com/hellotunmbi/angular2-authentication-firebase
