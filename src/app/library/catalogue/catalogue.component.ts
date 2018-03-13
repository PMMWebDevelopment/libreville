import { Component, OnInit, OnDestroy } from "@angular/core";
import { LibraryService } from "../library.service";
import { Language } from "../../shared/language.model";
import { Author } from "../../shared/author.model";
import { Book } from "../../shared/book.model";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-catalogue",
  templateUrl: "./catalogue.component.html",
  styleUrls: ["./catalogue.component.css"]
})
export class CatalogueComponent implements OnInit, OnDestroy {
  languages: Language[];
  authors = [];
  books = [];
  languagesSubscription: Subscription;
  authorsSubscription: Subscription;
  booksSubscription: Subscription;

  constructor(public libraryService: LibraryService) {}

  ngOnInit() {
    this.languagesSubscription = this.libraryService
      .getLanguages()
      .subscribe((languages: Language[]) => (this.languages = languages));
  }

  getAuthorsThisLanguage(event: any) {
    this.authors = [];
    if (this.languages.length > 0) {
      this.authorsSubscription = this.libraryService
        .getAuthors(event.target.value)
        .subscribe((authors: Author[]) => {
          Object.keys(authors).forEach(row => {
            this.authors.push(authors[row]);
          });
        });
    }
  }

  getBooksByThisAuthor(event: any) {
    this.books = [];
    this.booksSubscription = this.libraryService
      .getBooks(event.target.innerText)
      .subscribe((books: Book[]) => {
        Object.keys(books).forEach(row => {
          this.books.push(books[row]);
        });
      });
  }

  getThisBook(event: any) {
    for (let book = 0; book < this.books.length; book++) {
      if (this.books[book].book_title === event.target.innerText) {
        this.libraryService.getBook(this.books[book].book_pgid);
        this.libraryService.changeBook(this.books[book]);
      } else {
        continue;
      }
    }
  }

  ngOnDestroy() {
    this.languagesSubscription.unsubscribe();
    if (this.authorsSubscription) {
      this.authorsSubscription.unsubscribe();
    }
    if (this.booksSubscription) {
      this.booksSubscription.unsubscribe();
    }
  }
}
