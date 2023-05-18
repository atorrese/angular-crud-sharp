import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/models/person.models';
import { PersonService } from 'src/app/services/person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.scss']
})
export class PersonAddEditComponent {

  tieneErrores:boolean = false;

  personForm:FormGroup = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    edad: ['', Validators.required],
    sexo: ['', Validators.required],
    email: ['', Validators.required],
    clave: ['', Validators.required]
  });

  /**
   *
   */
  constructor(
    private fb :FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private _personService:PersonService

  ) {

  }

  ngOnInit():void{
    let id = this.route.snapshot.params['id'];
    id =parseInt(`${id ? id: 0}`);
    if(id>0){
      this._personService.get(id).subscribe((response:Person)=>{
        console.log(response)
        this.personForm = this.fb.group({
          id: [`${response.id}`, Validators.required],
          nombre: [response.nombre, Validators.required],
          edad: [`${response.edad}`, Validators.required],
          sexo: [response.sexo, Validators.required],
          email: [response.email, Validators.required],
          clave: [response.clave, Validators.required],
        });
      });
    }
  }
  get f() { return this.personForm.controls; }

  regresar(){
    this.router.navigate(['/personas']);
  }
  guardar(){
    if(this.personForm.valid){
      let person = this.personForm.value;
      console.log(person)
      if(!person.id){
        this._personService.add(person).subscribe((response:Person)=>{
          if(response?.id){
            Swal.fire({
              title:'Notificación!',
              html:`El registro <b>${response.nombre}</b> fue guardado con exito`,
              icon:'success',
              showCancelButton: false,
              allowOutsideClick:false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'}
            ).then((result:any)=>{
              if (result.isConfirmed) {
                this.router.navigate(['/personas']);
              }
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error al guardar los datos'
            });
            this.tieneErrores = true;
          }
        });
      }else{
        this._personService.update(person).subscribe((response:Person)=>{
          if(response?.id){
            Swal.fire({
              title:'Notificación!',
              html:`El registro <b>${response.nombre}</b> fue actualizado con exito`,
              icon:'success',
              showCancelButton: false,
              allowOutsideClick:false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok'}
            ).then((result:any)=>{
              if (result.isConfirmed) {
                this.router.navigate(['/personas']);
              }
            });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error al guardar los datos'
            });
            this.tieneErrores = true;
          }
        });
      }
    }
  }
}
