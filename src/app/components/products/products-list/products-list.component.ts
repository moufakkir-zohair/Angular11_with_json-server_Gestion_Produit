import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsType} from '../../../state/product.state';
import {Product} from '../../../../models/product.modele';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() productsInput$: Observable<AppDataState<Product[]>>|null = null;

  readonly DataStateEnum = DataStateEnum;
  constructor() { }

  ngOnInit(): void {
  }

}
