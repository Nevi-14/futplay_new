import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { ClubInfoComponent } from './club-info/club-info.component';
import { ClubInfoPage } from '../pages/club-info/club-info.page';
import { UsuariosPipe } from '../pipes/usuarios.pipe';
import { ProvinciasPipe } from '../pipes/provincias.pipe';
import { CantonesPipe } from '../pipes/cantones.pipe';
import { DistritosPipe } from '../pipes/distritos.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    ClubInfoComponent,
    ClubInfoPage,
     UsuariosPipe,
     ProvinciasPipe,
    CantonesPipe, 
    DistritosPipe
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[
  HeaderComponent,
  ClubInfoComponent
  ]
})
export class ComponentsModule { }
