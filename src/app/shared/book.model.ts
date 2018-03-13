export class Book {
  public book_id: number;
  public book_author: string;
  public book_language: string;
  public book_pgid: number;
  public book_title: string;

  constructor(
    book_id: number,
    book_author: string,
    book_language: string,
    book_pgid: number,
    book_title: string
  ) {
    this.book_id = book_id;
    this.book_author = book_author;
    this.book_language = book_language;
    this.book_pgid = book_pgid;
    this.book_title = book_title;
  }
}
