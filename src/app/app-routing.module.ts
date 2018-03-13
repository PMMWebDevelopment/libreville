import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LibraryComponent } from "./library/library.component";
import { CatalogueComponent } from "./library/catalogue/catalogue.component";
// import { ReadingPaneComponent } from "./library/reading-pane/reading-pane.component";
import { BookshelfComponent } from "./library/bookshelf/bookshelf.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "library", component: LibraryComponent },
  { path: "library/catalogue", component: CatalogueComponent },
  // { path: "library/reading-pane", component: ReadingPaneComponent },
  { path: "library/bookshelf", component: BookshelfComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
