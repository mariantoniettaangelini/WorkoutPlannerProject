import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../Models/i-product';
import { IUser } from '../../Models/i-user';
import { IOrder } from '../../Models/i-order';
import { UserService } from '../../Services/user-service.service';
import { OrderService } from './../../Services/order-service.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  user?: IUser;
  selectedQuantities: { [productId: number]: number } = {};
  isLoggedIn = false;

  constructor(private orderSvc: OrderService, private userSvc: UserService) {
    this.userSvc.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.orderSvc.getProducts().subscribe(
      (products) => {
        this.products = products;
        products.forEach((product) => {
          this.selectedQuantities[product.id] =
            this.selectedQuantities[product.id] || 1;
        });
      },
      (error) => {
        console.error('Errore caricamento prodotti', error);
      }
    );
  }

  addToCart(product: IProduct): void {
    console.log('User logged in:', this.isLoggedIn);
    if (!this.isLoggedIn) {
      alert('Accedi per aggiungere al carrello');
      return;
    }

    const quantity = this.selectedQuantities[product.id];
    const order: IOrder = {
      id: 0,
      product: product,
      quantity: quantity,
      isCompleted: false,
      user: this.user,
    };

    this.orderSvc.addToCart(order).subscribe(
      () => {
        console.log('Aggiunto al carrello con successo');
        alert(`Prodotto ${product.name} aggiunto al carrello`);
      },
      (error) => {
        console.error('Non aggiunto al carrello', error);
      }
    );
  }

  updateQuantity(productId: number, change: number): void {
    const currentQuantity = this.selectedQuantities[productId];
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      this.selectedQuantities[productId] = newQuantity;
    }
  }
}
