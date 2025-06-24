import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService, CartItem } from '../service/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-form.component.html',
  styleUrl: './cart-form.component.css',
})
export class CartFormComponent {
  cardNumber = '';
  expiryDate = '';
  cvv = '';

  constructor(
    public activeModal: NgbActiveModal,
    public cartService: CartService
  ) {}

  onQuantityChange(item: CartItem, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value);
    this.cartService.updateQuantity(item.id, quantity);
  }

  processPayment() {
    console.log('Оплата проведена', this.cardNumber);
    this.cartService.clearCart();
    this.activeModal.close();
  }
}
