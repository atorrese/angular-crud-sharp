import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})

export class ProductAddComponent {
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
    private _productService: ProductService) {}

  ngOnInit(): void{

  }

  guardar(){
    if(this.productoForm.valid){
      console.log('Valido');
      console.log(this.productoForm.value)
      this._productService.add({
        pro_codigo: `${this.productoForm.value.codigo}`,
        pro_nombre: `${this.productoForm.value.nombre}`,
        pro_descripcion: `${this.productoForm.value.descripcion}`,
        pro_precio: parseFloat(`${this.productoForm.value.precio}`)
      }).subscribe(response => {
        console.log(response);
        this.router.navigate(['/productos']);
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Complete los campos'
      })
    }
  }

  get f() { return this.productoForm.controls; }

  regresar(){
    this.router.navigate(['/productos']);
  }

}
