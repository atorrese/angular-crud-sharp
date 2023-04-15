import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  productos: any[];

  constructor(private _productService:ProductService) {
    this.productos = [];
  }

  ngOnInit(): void{

    this._productService.all().subscribe((response) => {
      this.productos = response;
      console.log(this.productos);
    });
  }

  eliminar(codigo: string){
    Swal.fire({
      title: 'Eliminar registro',
      text: '¿Esta seguro que desea eliminar el registro?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result)=>{
      if(result.isConfirmed){
        this._productService.delete(codigo).subscribe(response =>{
          //console.log(response);
          this.productos = this.productos.filter(x => x.pro_codigo !== codigo);
        });
      }
    });
  }
}
