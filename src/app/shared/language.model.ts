export class Language {
         public language_id: number;
         public language_name: string;
         public language_flagurl: string;
         public language_iso: string;

         constructor(language_id: number, language_name: string, language_flagurl: string, language_iso: string) {
           this.language_id = language_id;
           this.language_name = language_name;
           this.language_flagurl = language_flagurl;
           this.language_iso = language_iso;
         }
       }
