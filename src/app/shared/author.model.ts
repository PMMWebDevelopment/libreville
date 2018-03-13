export class Author {
         public author_id: number;
         public author_displayname: string;
         public author_givenname: string;
         public author_language: string;
         public author_surname: string;

         constructor
          (
           author_id: number,
           author_displayname: string,
           author_givenname: string,
           author_language: string,
           author_surname: string
          ) {
           this.author_id = author_id;
           this.author_displayname = author_displayname;
           this.author_givenname = author_givenname;
           this.author_language = author_language;
           this.author_surname = author_surname;
         }
       }
