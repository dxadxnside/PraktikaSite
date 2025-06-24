import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FoodService } from '../service/food.service';
import { Food } from '../interface/food.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-page-menu',
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './page-menu.component.html',
  styleUrl: './page-menu.component.css',
})
export class PageMenuComponent implements OnInit {
  foods: Food[] = [];
  searchTerm: string = '';
  selectedTypes: string[] = [];
  selectedTypesMap: { [key: string]: boolean } = {};
  minPrice: number = 0;
  maxPrice: number = 10000;
  allFoods: Food[] = [];

  categories = ['Супи', "М'ясні", 'Рибні', 'Салати', 'Десерти', 'Напої'];

  constructor(
    private foodService: FoodService,
    private cartService: CartService
  ) {}

  originalMinPrice: number = 0;
  originalMaxPrice: number = 10000;

  ngOnInit(): void {
    this.originalMinPrice = this.minPrice;
    this.originalMaxPrice = this.maxPrice;
    this.categories.forEach((cat) => {
      this.selectedTypesMap[cat] = false;
    });
    this.loadAllFoods();
  }

  applyFilters(): void {
    const min = this.minPrice || this.originalMinPrice;
    const max = this.maxPrice || this.originalMaxPrice;

    this.selectedTypes = this.categories
      .filter((cat) => this.selectedTypesMap[cat])
      .map((cat) => cat);

    this.foods = this.allFoods.filter((food) => {
      const matchesPrice = food.price >= min && food.price <= max;
      const matchesCategory =
        this.selectedTypes.length === 0 ||
        this.selectedTypes.includes(food.type);
      const matchesSearch = this.searchTerm
        ? food.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      return matchesPrice && matchesCategory && matchesSearch;
    });
  }

  resetFilters(): void {
    this.minPrice = this.originalMinPrice;
    this.maxPrice = this.originalMaxPrice;
    this.searchTerm = '';
    this.categories.forEach((cat) => {
      this.selectedTypesMap[cat] = false;
    });
    this.applyFilters();
  }

  loadAllFoods(): void {
    this.foodService.getAllFoods().subscribe((data) => {
      this.allFoods = data;
      this.applyFilters();
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  getDishesByCategory(category: string): Food[] {
    return this.foods.filter((dish) => dish.type === category);
  }

  hasDishesInCategory(category: string): boolean {
    return this.foods.some((dish) => dish.type === category);
  }

  addToCart(food: Food) {
    this.cartService.addToCart(food);
  }
}
