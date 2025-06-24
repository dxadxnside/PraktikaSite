import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartFormComponent } from '../cart-form/cart-form.component';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  links = [
    { path: '/main', label: 'Головна', active: 'nav-link active' },
    { path: '/menu', label: 'Меню', active: 'nav-link active' },
    { path: '/about', label: 'Про нас', active: 'nav-link active' },
  ];
  constructor(
    private modalService: NgbModal,
    public cartService: CartService
  ) {}

  openCart() {
    this.modalService.open(CartFormComponent, { size: 'lg' });
  }
}
