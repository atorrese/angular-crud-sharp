import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/client.models';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {

  clientes: Cliente[];

  constructor(
    private _clientService:ClientService
    ) {
    this.clientes = [];
  }

  ngOnInit():void{
    this._clientService.all().subscribe((response)=>{
      this.clientes = response;
      console.log(this.clientes);
    });
  }

  eliminar(cliente: Cliente){
    Swal.fire({
      title: 'Eliminar registro',
      html: `¿Esta seguro que desea eliminar el registro?<br><span class="badge rounded-pill bg-warning text-dark">${cliente.nombres} ${cliente.apellido_paterno} ${cliente.apellido_materno}</span>`,
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result)=>{
      if(result.isConfirmed){
        this._clientService.delete(cliente.id).subscribe((response:any) =>{
          //console.log(response);

          if(response.estado){
            Swal.fire({
              title:'Notificación!',
              html:response.mensaje,
              icon:'success',
              showCancelButton: false,
              allowOutsideClick:false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'}
            ).then((result)=>{
              if (result.isConfirmed) {
                this.clientes = this.clientes.filter(x => x.id !== cliente.id);
              }
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.mensaje
            });
          }

        });
      }
    });
  }

}
