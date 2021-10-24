import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../../../models/product.modele';
import {ActionEvent, ProductActionsType} from '../../../../state/product.state';
import {EventDriverService} from '../../../../services/event.driver.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | null = null ;
  // @Output() productEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor(private eventDriverService: EventDriverService) { }

  ngOnInit(): void {
  }

  onSelect(product: Product) {
    // this.productEventEmitter.emit({type: ProductActionsType.SELECT_PRODUCT , payload : product});
    this.eventDriverService.publishEvent({type: ProductActionsType.SELECT_PRODUCT , payload : product});
  }


  onDelete(product: Product) {
    // this.productEventEmitter.emit({type: ProductActionsType.DELETE_PRODUCT , payload : product});
    this.eventDriverService.publishEvent({type: ProductActionsType.DELETE_PRODUCT , payload : product});

  }

  onEdit(product: Product) {
    // this.productEventEmitter.emit({type: ProductActionsType.EDIT_PRODUCT , payload : product});
    this.eventDriverService.publishEvent({type: ProductActionsType.EDIT_PRODUCT , payload : product});
  }
}
