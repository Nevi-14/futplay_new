import {  LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';

 
import localeDe from '@angular/common/locales/es';

import { MapaComponent } from './mapa/mapa.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { ButtonComponent } from './button/button.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { InputComponent } from './input/input.component';
import { SelectComponent } from './select/select.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { PaymentComponent } from './payment/payment.component';
import { TranslateModule } from '@ngx-translate/core';

registerLocaleData(localeDe);
@NgModule({
  declarations: [
    HeaderComponent,
    MapaComponent,
    ButtonComponent,
    IconButtonComponent,
    SelectComponent,
    InputComponent,
    DeleteButtonComponent,
    PaymentComponent


 
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule

  ],
  exports:[
  HeaderComponent,
  MapaComponent,
  ButtonComponent,
  IconButtonComponent,
  SelectComponent,
  InputComponent,
  DeleteButtonComponent,
  PaymentComponent


  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}]
  
})


export class ComponentsModule { }