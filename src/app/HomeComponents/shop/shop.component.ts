import { OrderService } from './../../Services/order-service.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../Models/i-product';
import { IUser } from '../../Models/i-user';
import { IOrder } from '../../Models/i-order';
import { UserService } from '../../Services/user-service.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  products: IProduct[] = [];
  user?: IUser;
  selectedQuantities: { [productId: number]: number } = {};

  constructor(private orderSvc: OrderService, private userSvc: UserService) {}
  ngOnInit(): void {
    this.userSvc.user$.subscribe((user) => {
      this.user = user ?? undefined;

      if (this.user) {
        this.loadProducts();
            } else {
        alert('Non sei loggato');
      }
    });

  }

  loadProducts(): void {
    this.orderSvc.getProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Errore caricamento prodotti', error);
      }
    );
  }

  addToCart(product: IProduct): void {
    if(!this.user) {
      alert("Accedi per aggiungere al carrello");
      return;
    }

    const quantity = this.selectedQuantities[product.id] || 1;

    const order: IOrder = {
      id: 0,
      product: product,
      quantity: quantity,
      isCompleted: false,
      user: this.user,
    };

    this.orderSvc.addToCart(order).subscribe(
      () => {
        alert(`Prodotto ${product.name} aggiunto al carrello`);
      },
      (error) => {
        console.error('Non aggiunto al carrello', error);
      }
    );
  }
}
