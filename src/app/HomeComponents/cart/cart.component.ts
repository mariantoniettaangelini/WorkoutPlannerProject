import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../Models/i-order';
import { IUser } from '../../Models/i-user';
import { OrderService } from '../../Services/order-service.service';
import { UserService } from '../../Services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems: IOrder[] = [];
  user?: IUser;
  total: number = 0;

  constructor(private orderSvc: OrderService, private userSvc: UserService) {}
  ngOnInit(): void {
    this.userSvc.user$.subscribe((user) => {
      this.user = user ?? undefined;

      if (this.user) {
        this.loadCart();
      } else {
        alert('Non sei loggato');
      }
    });
  }

  loadCart(): void {
    if (!this.user) {
      alert('Accedi per visualizzare il carrello');
      return;
    }

    this.orderSvc.getCart(this.user.id).subscribe(
      (order: IOrder[]) => {
        this.cartItems = order;
        this.calculateTotal();
      },
      (err) => {
        console.error('Errore nel caricamento del carrello', err);
      }
    );
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  updateQuantity(order: IOrder, newQuantity: number): void {
    if (newQuantity <= 0) {
      alert('Inserisci almeno 1 prodotto');
      return;
    }

    order.quantity = newQuantity;
    this.orderSvc.updateCartOrder(order).subscribe(
      () => {
        this.calculateTotal();
        alert('Quantità aggiornata con successo');
      },
      (err) => {
        console.error('Errore durante aggiornamento quantita', err);
      }
    );
  }

  removeItem(itemId: number): void {
    this.orderSvc.removeFromCart(itemId).subscribe(
      () => {
        this.cartItems = this.cartItems.filter((item) => item.id != itemId);
        this.calculateTotal();
        alert('Prodotto rimosso');
      },
      (error) => {
        console.error('Errore durante la rimozione del prodotto', error);
      }
    );
  }

  checkout(): void {
    if (!this.user) {
      alert('Accedi per effettuare un acquisto');
      return;
    }

    this.orderSvc.checkout(this.user.id).subscribe(
      () => {
        this.cartItems = [];
        this.total = 0;
        Swal.fire({
          title: 'Acquisto completato con successo!',
          text: 'Grazie per il tuo acquisto.',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'my-custom-button',
          },
        });
      },
      (err) => {
        console.error("Errore durante l'acquisto", err);
        let errorMessage = 'Si è verificato un errore imprevisto.';
        if (err.status === 404) {
          errorMessage = 'Il servizio di checkout non è disponibile.';
        } else if (err.message) {
          errorMessage = err.message;
        }

        Swal.fire({
          title: 'Errore!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            confirmButton: 'my-custom-button',
          },
        });
      }
    );
  }
}
