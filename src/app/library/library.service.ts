import { Injectable, Component, Input } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Language } from "../shared/language.model";
import { Author } from "../shared/author.model";
import { Book } from "../shared/book.model";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs/observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AuthService } from "../auth/auth.service";
import * as firebase from "firebase";

@Injectable()
export class LibraryService {
  private clickedBookSource = new ReplaySubject<any[]>();
  clickedBook$ = this.clickedBookSource.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getLanguages() {
    return this.http.get<Language[]>(
      "https://libreville-2018.firebaseio.com/languages.json"
    );
  }

  getAuthors(language) {
    return this.http.get<Author[]>(
      // tslint:disable-next-line:max-line-length
      'https://libreville-2018.firebaseio.com/authors.json?orderBy="author_language"&startAt="' +
        language +
        '"&endAt="' +
        language +
        '"&print=pretty'
    );
  }

  getBooks(author) {
    return this.http.get<Book[]>(
      'https://libreville-2018.firebaseio.com/books.json?orderBy="book_author"&startAt="' +
        author +
        '"&endAt="' +
        author +
        '"&print=pretty'
    );
  }

  getBook(pgid) {
    // console.log("http://www.gutenberg.org/ebooks/" + pgid);
    window.open("http://www.gutenberg.org/ebooks/" + pgid);
  }

  changeBook(bookArray) {
    this.clickedBookSource.next(bookArray);
  }

  updateBookshelf(bookshelfNumber, bookshelf) {
    firebase
      .database()
      .ref("bookshelves/" + bookshelfNumber)
      .child("saved_books")
      .set(bookshelf);
  }

  saveBookshelf(bookshelf) {
    firebase
      .database()
      .ref("bookshelves/")
      .push({
        saved_books: bookshelf,
        user: firebase.auth().currentUser.email
      });
  }

  loadSavedBookshelf() {
    // tslint:disable-next-line:max-line-length
    return this.http.get<any[]>(
      // tslint:disable-next-line:max-line-length
      'https://libreville-2018.firebaseio.com/bookshelves.json?orderBy="user"&startAt="' +
        firebase.auth().currentUser.email +
        '"&endAt="' +
        firebase.auth().currentUser.email +
        '"&print=pretty'
    );
  }
}
