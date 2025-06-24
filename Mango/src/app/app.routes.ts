import { Routes } from '@angular/router';
import { PageMainComponent } from './page-main/page-main.component';
import { PageMenuComponent } from './page-menu/page-menu.component';
import { PageAboutComponent } from './page-about/page-about.component';

export const routes: Routes = [
    {path: "", pathMatch: "full", redirectTo: "main"},
    {path: "main", component: PageMainComponent},
    {path: "menu", component: PageMenuComponent},
    {path: "about", component: PageAboutComponent}
];
