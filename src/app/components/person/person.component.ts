import { Component } from '@angular/core';
import { Person } from 'src/app/models/person.models';
import { PersonService } from 'src/app/services/person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  personas: Person[];

  /**
   *
   */
  constructor(private _personaService:PersonService) {
    this.personas = [];
  }

  ngOnInit():void{
    this._personaService.all().subscribe((response)=>{
      this.personas = response;
      console.log(this.personas);
    })
  }
  eliminar(person:Person){
    Swal.fire({
      title: 'Eliminar registro',
      html: `¿Esta seguro que desea eliminar el registro?<br><span class="badge rounded-pill bg-warning text-dark">${person.nombre}</span>`,
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result)=>{
      if(result.isConfirmed){
        this._personaService.delete(person).subscribe((response:any) =>{
          console.log(response);

          if(!response){
            Swal.fire({
              title:'Notificación!',
              html:`El registro <b>${person.nombre}</b> fue eliminado con exito`,
              icon:'success',
              showCancelButton: false,
              allowOutsideClick:false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'}
            ).then((result)=>{
              if (result.isConfirmed) {
                this.personas = this.personas.filter(x => x.id !== person.id);
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
