import { Cliente } from 'src/app/models/client.models';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-add-edit',
  templateUrl: './client-add-edit.component.html',
  styleUrls: ['./client-add-edit.component.scss']
})
export class ClientAddEditComponent {

  tieneErrores: boolean = false;

  clienteForm = this.fb.group({
    id: [''],
    nombres: ['', Validators.required],
    apellido_paterno: ['', Validators.required],
    apellido_materno: ['', Validators.required],
    sexo: ['', Validators.required],
    cedula: ['', Validators.required],
    email: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _clientService: ClientService,
    private route:ActivatedRoute
  ) {

  }
  ngOnInit():void{
    let id  = this.route.snapshot.params['id'];
    id =parseInt(`${id ? id: 0}`);
    if(id>0){
      this._clientService.get(id).subscribe((response: Cliente)=>{
        console.log(response);
        this.clienteForm = this.fb.group({
          id: [`${response.id}`, Validators.required],
          nombres: [response.nombres, Validators.required],
          apellido_paterno: [response.apellido_paterno, Validators.required],
          apellido_materno: [response.apellido_materno, Validators.required],
          sexo: [response.sexo, Validators.required],
          cedula: [response.cedula, [Validators.required, Validators.maxLength(10)]],
          email: [response.email, Validators.required],
        });
      });
    }
  }

  get f() { return this.clienteForm.controls; }

  regresar(){
    this.router.navigate(['/clientes']);
  }

  guardar(){
    if(this.clienteForm.valid){
      const client = this.clienteForm.value;
      if(!client.id){
        this._clientService.add({
          id: parseInt(`${client.id ? client.id: 0}`),
          nombres: `${client.nombres}`,
          apellido_paterno: `${client.apellido_paterno}`,
          apellido_materno: `${client.apellido_materno}`,
          sexo: `${client.sexo}`,
          cedula: `${client.cedula}`,
          email: `${client.email}`
        }).subscribe((response:any) => {
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
                this.router.navigate(['/clientes']);
              }
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.mensaje
            });
            this.tieneErrores = true;
          }
        });
      }else{
        this._clientService.update({
          id: parseInt(`${client.id ? client.id: 0}`),
          nombres: `${client.nombres}`,
          apellido_paterno: `${client.apellido_paterno}`,
          apellido_materno: `${client.apellido_materno}`,
          sexo: `${client.sexo}`,
          cedula: `${client.cedula}`,
          email: `${client.email}`
        }).subscribe((response:any)  => {
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
                this.router.navigate(['/clientes']);
              }
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.mensaje
            });
            this.tieneErrores = true;
          }
        })
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Complete los campos'
      });
      this.tieneErrores = true;
    }
  }
}
