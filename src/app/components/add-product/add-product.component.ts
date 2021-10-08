import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productFormGroup: FormGroup | null = null;
  submitted: boolean = false;
  constructor(private fb: FormBuilder , private productService: ProductService) { }

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      name: ['' , Validators.required],
      price: [0 , Validators.required],
      quantity: [0 , Validators.required],
      selected: [true , Validators.required],
      available: [true , Validators.required],
    });
  }

  onAddProduct() {
    this.submitted = true;
    if (this.productFormGroup?.invalid) { return; }
    this.productService.SaveProduct(this.productFormGroup?.value).subscribe(data => {
      alert("vous avez ajoute un nouveau produit");
    });
  }
}
