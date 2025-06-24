import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Food } from '../interface/food.model';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(item: Food) {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image_url: item.image_url
      });
    }
    
    this.cartItems.next([...currentItems]);
  }

  removeFromCart(itemId: number) {
    const filteredItems = this.cartItems.value.filter(item => item.id !== itemId);
    this.cartItems.next(filteredItems);
  }

  updateQuantity(itemId: number, quantity: number) {
    const items = this.cartItems.value;
    const item = items.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      this.cartItems.next([...items]);
    }
  }

  getTotal() {
    return this.cartItems.value.reduce(
      (sum, item) => sum + (item.price * item.quantity), 0
    );
  }

  clearCart() {
    this.cartItems.next([]);
  }
}