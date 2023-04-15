import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/product.models';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  tieneErrores: boolean = false;

  productoForm = this.fb.group({
    codigo:['', Validators.required],
    nombre:['', Validators.required],
    descripcion:['', Validators.required],
    precio:[0, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private _productService: ProductService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void{
    this._productService.get(this.route.snapshot.params['codigo']).subscribe((response: Producto)=>{
      this.productoForm = this.fb.group({
        codigo:[response.pro_codigo, Validators.required],
        nombre:[response.pro_nombre, Validators.required],
        descripcion:[response.pro_descripcion, Validators.required],
        precio:[response.pro_precio, Validators.required],
      });
    });
  }

  guardar(){
    if (this.productoForm.valid){
      console.log('Valido');
      this._productService.update({
        pro_codigo: `${this.productoForm.value.codigo}`,
        pro_nombre: `${this.productoForm.value.nombre}`,
        pro_descripcion: `${this.productoForm.value.descripcion}`,
        pro_precio: parseFloat(`${this.productoForm.value.precio}`)
      }).subscribe((response)=>{
        this.router.navigate(['/productos']);
      });
    }
    else{

    }

  }

  get f() { return this.productoForm.controls; }

  regresar(){
    this.router.navigate(['/productos']);
  }

}
