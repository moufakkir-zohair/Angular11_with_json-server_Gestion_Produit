import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../../models/product.modele';
import {ActionEvent, ProductActionsType} from '../../../../state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | null = null ;
  @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    this.productEventEmitter.emit({type: ProductActionsType.SELECT_PRODUCT , payload : product});
  }

  onDelete(product: Product) {
    this.productEventEmitter.emit({type: ProductActionsType.DELETE_PRODUCT , payload : product});
  }

  onEdit(product: Product) {
    this.productEventEmitter.emit({type: ProductActionsType.EDIT_PRODUCT , payload : product});
  }
}
