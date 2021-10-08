import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {Product} from "../../../models/product.modele";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId: number;
  productFormGroup?: FormGroup;
  submitted: boolean = false;
  constructor(private router: ActivatedRoute , private productService: ProductService , private fb: FormBuilder) {
    this.productId = this.router.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.GetProduct(this.productId).subscribe(data => {
      this.productFormGroup = this.fb.group({
        id: [data.id],
        name: [data.name , Validators.required],
        price: [data.name , Validators.required],
        quantity: [data.quantity , Validators.required],
        selected: [data.selected , Validators.required],
        available: [data.available , Validators.required],
      });
    });
  }

  onUpdateProduct() {
     this.submitted = true ;
     if(this.productFormGroup?.invalid) return ;
     this.productService.UpdateProduct(this.productFormGroup?.value).subscribe(data => {
         alert("Produit updatable");
     });
  }
}
