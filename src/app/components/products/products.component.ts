import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../../models/product.modele";
import {Observable, of} from "rxjs";
import {AppDataState, DataStateEnum} from "../../state/product.state";
import {catchError, map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>>|null = null;
  readonly DataStateEnum = DataStateEnum;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  // onGetAllProducts() {
  //  this.productService.getAllProducts().subscribe(data => {
  //    this.products = data;
  //  }, error => {
  //    console.log(error);
  //  });
  // }

  onGetAllProducts() {
    this.products$ = this.productService.getAllProducts().pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR,errorMessage: err.message}))
    );
  }

  onGetSelectedProducts() {
    this.products$ = this.productService.getSelectedProducts().pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR,errorMessage: err.message}))
    );
  }

  onGetAvailableProducts() {
    this.products$ = this.productService.getAvailableProducts().pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR,errorMessage: err.message}))
    );
  }

  onSearch(dataForm: any) {
    this.products$ = this.productService.SearchProduct(dataForm.keyword).pipe(
      map(data => ({ dataState: DataStateEnum.LOADED, data: data})),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({dataState: DataStateEnum.ERROR,errorMessage: err.message}))
    );
  }

  onDelete(p: Product) {
    const v = confirm('vous etes sur de vouloir supprimer cette produits ?');
    if (v === true){
      this.productService.DeleteProduct(p).subscribe(data => {
        this.onGetAllProducts();
      });
    }
  }

  onSelect(p: Product) {
   this.productService.SelectProduct(p).subscribe(data => {
     p.selected = data.selected;
   });
  }
}
