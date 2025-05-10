import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent {
  producId: string | undefined;
  constructor(private aRoute: ActivatedRoute) {
    aRoute.params.subscribe((route) => {
      this.producId = route['productId'];
      // console.log(this.producId);
    });
  }
}
