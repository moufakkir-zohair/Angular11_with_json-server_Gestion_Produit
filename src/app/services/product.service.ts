import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../../models/product.modele';

@Injectable({
  providedIn: 'root'
})

export class ProductService{
  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<Product[]>{
    let host = environment.host;
    return this.http.get<Product[]>(host + '/products');
  }

  getSelectedProducts(): Observable<Product[]>{
    let host = environment.host;
    return this.http.get<Product[]>(host + '/products?selected=true');
  }

  getAvailableProducts(): Observable<Product[]>{
    let host = environment.host;
    return this.http.get<Product[]>(host + '/products?available=true');
  }

  SearchProduct(keyword: string): Observable<Product[]>{
    let host = environment.host;
    return this.http.get<Product[]>(host + '/products?name_like=' + keyword);
  }

  DeleteProduct(p: Product): Observable<void>{
    let host = environment.host;
    return this.http.delete<void>(host + '/products/' + p.id);
  }

  SelectProduct(p: Product):Observable<Product> {
    let host = environment.host;
    p.selected = !p.selected;
    return this.http.put<Product>(host + '/products/' + p.id, p);
  }
}
