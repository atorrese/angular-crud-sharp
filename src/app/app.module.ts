import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductComponent } from './components/product/product.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductService } from './services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientComponent } from './components/client/client.component';
import { ClientService } from './services/client.service';
import { ClientAddEditComponent } from './components/client-add-edit/client-add-edit.component';
import { PersonComponent } from './components/person/person.component';
import { PersonAddEditComponent } from './components/person-add-edit/person-add-edit.component';
import { PersonService } from './services/person.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductAddComponent,
    ProductEditComponent,
    ClientComponent,
    ClientAddEditComponent,
    PersonComponent,
    PersonAddEditComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [ProductService, ClientService, PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
