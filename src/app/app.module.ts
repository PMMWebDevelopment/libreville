// Prerequisites for displaying app on screen
import {
  NgModule,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatExpansionModule } from "@angular/material/expansion";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SafeUrlPipe } from "./shared/safeurl.pipe";

// App's outer structure
import { AppComponent } from "./app.component";

// Main app modules and wrapping components
import { HomeModule } from "./home/home.module";
import { SharedModule, FooterComponent, HeaderComponent } from "./shared";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";

// Http provision
import { HttpClientModule, HttpClient } from "@angular/common/http";

// Auth-related
import * as firebase from "firebase/app";
import { environment } from "./../environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AuthService } from "./auth/auth.service";

// Inner app services
import { LibraryService } from "./library/library.service";

// Inner app components
import { LibraryComponent } from "./library/library.component";
import { CatalogueComponent } from "./library/catalogue/catalogue.component";
import { ReadingPaneComponent } from "./library/reading-pane/reading-pane.component";
import { BookshelfComponent } from "./library/bookshelf/bookshelf.component";

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], {
  useHash: true
});

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LibraryComponent,
    CatalogueComponent,
    ReadingPaneComponent,
    SafeUrlPipe,
    BookshelfComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HomeModule,
    rootRouting,
    AppRoutingModule,
    HttpClientModule,
    MatExpansionModule
  ],
  exports: [FormsModule, ReactiveFormsModule],
  providers: [LibraryService, AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
