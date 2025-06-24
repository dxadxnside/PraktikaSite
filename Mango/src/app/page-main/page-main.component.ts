import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-main',
  imports: [FooterComponent, HeaderComponent, RouterModule],
  templateUrl: './page-main.component.html',
  styleUrl: './page-main.component.css'
})
export class PageMainComponent {
  
}
