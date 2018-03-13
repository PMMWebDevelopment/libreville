import { Component, OnInit, OnDestroy } from "@angular/core";
import { LibraryService } from "../library.service";
import { Language } from "../../shared/language.model";
import { Author } from "../../shared/author.model";
import { Book } from "../../shared/book.model";
import { Observable } from "rxjs/observable";
import { SafeUrlPipe } from "../../shared/safeurl.pipe";
import { AuthService } from "../../auth/auth.service";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Subscription } from "rxjs/Subscription";
import * as _ from "lodash";

@Component({
  selector: "app-bookshelf",
  templateUrl: "./bookshelf.component.html",
  styleUrls: ["./bookshelf.component.css"]
})
export class BookshelfComponent implements OnInit, OnDestroy {
  book = [];
  clickedBookSubscription: Subscription;
  clickedBooksLog = [];
  bookToRemoveFromShelf: number;
  bookshelfToSave = [];
  userDisplayName: string;
  loginStatus: boolean;
  loginStatusSubscription: Subscription;
  savedBookshelfSubscription: Subscription;
  hasExistingBookshelf: boolean = false;
  bookshelfNumber: any;

  constructor(
    private libraryService: LibraryService,
    public authService: AuthService,
    public af: AngularFireAuth
  ) {
    this.clickedBookSubscription = this.libraryService.clickedBook$.subscribe(
      (book: Book[]) => {
        this.book = [];
        Object.keys(book).forEach(key => {
          this.book.push(book[key]);
        });
        this.addBookToLog(this.book);
      }
    );
    console.log(this.clickedBooksLog);
  }

  ngOnInit() {
    this.checkloginStatus();
  }

  checkloginStatus() {
    this.loginStatusSubscription = this.af.authState.subscribe(res => {
      if (res && res.uid) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
      }
      console.log(this.loginStatus);
    });
  }

  loadBookshelf(event: any) {
    this.savedBookshelfSubscription = this.libraryService.loadSavedBookshelf().subscribe((book: any[]) => {
      this.book = [];
      if(book) {
        this.hasExistingBookshelf = true;
      }
      this.bookshelfNumber = Object.keys(book);
        Object.keys(book).forEach(key => {
        for (let row = 0; row < book[key].saved_books.length; row++) {
          this.addBookToLog(book[key].saved_books[row]);
        }
      });  
    });
  }
 
  addBookToLog(book) {
    this.clickedBooksLog.push(book);
    this.clickedBooksLog = _.uniqWith(this.clickedBooksLog, _.isEqual);
  }

  removeBookFromShelf(event: any) {
    this.bookToRemoveFromShelf = +event.currentTarget.parentNode.parentNode
      .parentNode.id;
    console.log(this.bookToRemoveFromShelf);
    for (let row = 0; row < this.clickedBooksLog.length; row++) {
      if (this.clickedBooksLog[row][2] === this.bookToRemoveFromShelf) {
        this.clickedBooksLog.splice(row, 1);
      } else {
        continue;
      }
    }
  }

  getBookFromShelf(event: any) {
    // window.open(
    //   "http://www.gutenberg.org/ebooks/" +
    //     +event.currentTarget.attributes.class.ownerElement.children[0].id
    // );
    console.log(
      "http://www.gutenberg.org/ebooks/" +
        +event.currentTarget.attributes.class.ownerElement.children[0].id
    );
  }

  getBookshelfToSave(event: any) {
    this.bookshelfToSave = [];
    for (let row = 0; row < this.clickedBooksLog.length; row++) {
      this.bookshelfToSave.push(this.clickedBooksLog[row]);
    }
    if(this.hasExistingBookshelf === true) {
      this.libraryService.updateBookshelf(this.bookshelfNumber, this.bookshelfToSave);
    } else {
      this.libraryService.saveBookshelf(this.bookshelfToSave);
    }
  }

  ngOnDestroy() {
    this.clickedBookSubscription.unsubscribe();
    this.loginStatusSubscription.unsubscribe();
    this.savedBookshelfSubscription.unsubscribe();
  }
}
