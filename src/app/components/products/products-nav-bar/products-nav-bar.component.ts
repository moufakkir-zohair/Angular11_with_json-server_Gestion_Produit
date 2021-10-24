import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActionEvent, ProductActionsType} from "../../../state/product.state";
import {EventDriverService} from "../../../services/event.driver.service";

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {

  // @Output() productEventEmitter : EventEmitter<ActionEvent> = new EventEmitter();


  constructor( private eventDriverService: EventDriverService) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {
    // this.productEventEmitter.emit({type : ProductActionsType.GET_ALL_PRODUCTS});
    this.eventDriverService.publishEvent({type : ProductActionsType.GET_ALL_PRODUCTS});
  }

  onGetSelectedProducts() {
    // this.productEventEmitter.emit({type : ProductActionsType.GET_SELECTED_PRODUCTS});
    this.eventDriverService.publishEvent({type : ProductActionsType.GET_SELECTED_PRODUCTS});
  }

  onGetAvailableProducts() {
    // this.productEventEmitter.emit({type : ProductActionsType.GET_AVAILABLE_PRODUCTS});
    this.eventDriverService.publishEvent({type : ProductActionsType.GET_AVAILABLE_PRODUCTS});
  }

  onAddProduct() {
    // this.productEventEmitter.emit({type : ProductActionsType.NEW_PRODUCT});
    this.eventDriverService.publishEvent({type : ProductActionsType.NEW_PRODUCT});
  }

  onSearch(dataForm: any) {
    // this.productEventEmitter.emit({type : ProductActionsType.SEARCH_PRODUCTS,payload: dataForm});
    this.eventDriverService.publishEvent({type : ProductActionsType.SEARCH_PRODUCTS,payload: dataForm});
  }
}
