import { Component, Input, OnInit } from '@angular/core';
import { CanchasService } from 'src/app/services/canchas.service';
import { PerfilCancha } from '../../models/perfilCancha';
import { ModalController } from '@ionic/angular';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cancha-detalle',
  templateUrl: './cancha-detalle.page.html',
  styleUrls: ['./cancha-detalle.page.scss'],
})
export class CanchaDetallePage implements OnInit {
@Input() cancha :PerfilCancha
@Input() reservar :boolean = true;
url = environment.archivosURL;
slideOpts = {
  initialSlide: 1,
  speed: 400,
};
  constructor(
public canchasService:CanchasService,
public modalCtrl: ModalController
  ) { }
  ngOnInit() {
 console.log(this.cancha, 'cancha')
 this.canchasService.cancha =  this.cancha ;
    this.canchasService.dia = this.diaSemana(new Date().getDay());
    
        
      }
    
      diaSemana(index) {
        return this.canchasService.diaSemana(index);
      }

      disponibilidadCancha(cancha:PerfilCancha) {
        return  this.canchasService.disponibilidadCancha(cancha);
        
      }

      horarioCancha(cancha:PerfilCancha){
      return  this.canchasService.horarioCancha(cancha);
      }


      disponibilidadReservacion(){
        return  this.canchasService.disponibidadReservacion(this.cancha);

      }
      navigate(){
        this.canchasService.navigate();
      }
      regresar(){
  this.modalCtrl.dismiss();
 }

async canchaReservacion(cancha){
  this.regresar()
  const modal  = await this.modalCtrl.create({
    component: GenerarReservacionPage,
mode:'md',
   componentProps:{
    rival:null,
    retador:null,
    cancha:cancha

   },
 });
 await modal .present();
 }

 
  
}
