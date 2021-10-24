import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../../models/product.modele";
import {Observable, of} from "rxjs";
import {ActionEvent, AppDataState, DataStateEnum, ProductActionsType} from "../../state/product.state";
import {catchError, map, startWith} from "rxjs/operators";
import {Router} from "@angular/router";
import {EventDriverService} from "../../services/event.driver.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>>|null = null;
  readonly DataStateEnum = DataStateEnum;
  constructor(private productService: ProductService , private eventDriverService: EventDriverService, private router: Router) { }

  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe((actionEvent: ActionEvent) => {
      this.onActionEvent(actionEvent);
    });
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

  onAddProduct() {
    this.router.navigateByUrl("/addProduct");
  }

  onEdit(p: Product) {
     this.router.navigateByUrl('/editProduct/' + p.id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type){
      case ProductActionsType.GET_ALL_PRODUCTS : this.onGetAllProducts() ; break;
      case ProductActionsType.GET_SELECTED_PRODUCTS : this.onGetSelectedProducts() ; break;
      case ProductActionsType.GET_AVAILABLE_PRODUCTS : this.onGetAvailableProducts() ; break;
      case ProductActionsType.SEARCH_PRODUCTS : this.onSearch($event.payload) ; break;
      case ProductActionsType.NEW_PRODUCT : this.onAddProduct() ; break;
      case ProductActionsType.SELECT_PRODUCT : this.onSelect($event.payload) ; console.log("ici") ; break ;
      case ProductActionsType.EDIT_PRODUCT : this.onEdit($event.payload) ; break ;
      case ProductActionsType.DELETE_PRODUCT : this.onDelete($event.payload); break ;
    }
  }
}
