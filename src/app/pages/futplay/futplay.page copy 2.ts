import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AlertasService } from 'src/app/services/alertas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { ReservacionesService } from 'src/app/services/reservaciones.service';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-futplay',
  templateUrl: './futplay.page.html',
  styleUrls: ['./futplay.page.scss'],
})
 
export class FutplayPage  {
  @ViewChild(IonSegment) segment: IonSegment;
 
  constructor(
    public router:Router,
    public usuariosService: UsuariosService,
    public alertasService: AlertasService,
    public reservacionesService: ReservacionesService,
    public cf:ChangeDetectorRef

  ) { }
 
ionViewWillEnter(){
  this.segment.value = 'reservaciones';
  this.cf.detectChanges();
 // this.segment = 'football';
}

segmentChanged($event){
  console.log($event, 'event')
  this.alertasService.pagina = $event.detail.value;
  this.router.navigateByUrl('/futplay/'+this.alertasService.pagina, {replaceUrl:true})


}
redirigir(url:string, pagina:string){
  this.alertasService.pagina = pagina;
this.router.navigateByUrl(url, {replaceUrl:true})
}
}