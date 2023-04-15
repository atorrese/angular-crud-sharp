import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent, } from './components/product/product.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ClientComponent } from './components/client/client.component';
import { ClientAddEditComponent } from './components/client-add-edit/client-add-edit.component';

const routes: Routes = [
  {path: 'productos', component:ProductComponent},
  { path: 'productos/add', component: ProductAddComponent },
  { path: 'productos/edit/:codigo', component: ProductEditComponent },
  { path: '', redirectTo: 'productos', pathMatch: 'full'},
  //{ path: '**', component: ProductComponent },
  {path: 'clientes', component:ClientComponent},
  { path: 'clientes/add', component: ClientAddEditComponent },
  { path: 'clientes/edit/:id', component: ClientAddEditComponent },
  { path: '**', component: ClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
