import { Component, OnDestroy } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import * as firebase from "firebase/app";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnDestroy {
  email: string;
  password: string;
  routerEventSubscription: Subscription;
  userSubscription: Subscription;
  user: Observable<any>;
  userDisplayName: string;

  constructor(private router: Router, public authService: AuthService) {
    this.routerEventSubscription = router.events.subscribe(
      event => event instanceof NavigationEnd && this.handleRouteChange()
    );
    this.getUserDisplayName();
  }

  handleRouteChange() {
    if (this.router.url.includes("library")) {
      return true;
    }
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = "";
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = "";
  }

  logout() {
    this.authService.logout();
  }

  getUserDisplayName() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userDisplayName = user.email;
      }
    });
  }

  ngOnDestroy() {
    this.routerEventSubscription.unsubscribe();
  }
}
