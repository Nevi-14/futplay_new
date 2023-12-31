import { Component, OnInit } from '@angular/core';
import { PerfilCancha } from 'src/app/models/perfilCancha';

import { CanchasService } from '../../services/canchas.service';
import {
  ActionSheetButton,
  ActionSheetController,
  ModalController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { CanchaDetallePage } from '../cancha-detalle/cancha-detalle.page';
import { GenerarReservacionPage } from '../generar-reservacion/generar-reservacion.page';
import { FiltroCanchaPage } from '../filtro-cancha/filtro-cancha.page';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { AlertasService } from 'src/app/services/alertas.service';

@Component({
  selector: 'app-canchas',
  templateUrl: './canchas.page.html',
  styleUrls: ['./canchas.page.scss'],
})
export class CanchasPage implements OnInit {
  filtro = {
    Codigo_Pais: null,
    Codigo_Estado: null,
    Codigo_Ciudad: null,
    Cod_Categoria: null,
  };
  textoBuscar = '';
  url = environment.archivosURL;
  constructor(
    public canchasService: CanchasService,
    public actionSheetCtrl: ActionSheetController,
    public router: Router,
    public modalCtrl: ModalController,
    private translateService: TranslateService,
    public alertasService: AlertasService
  ) {}

  ngOnInit() {
    this.canchasService.syncListaCanchasToPromise().then(
      (resp) => {
        this.canchasService.canchas = resp;
        this.canchasService.dia = this.diaSemana(new Date().getDay());
      },
      (error) => {
        this.alertasService.message(
          'FUTPLAY',
          this.translateService.instant('ALL_FIELDS_REQUIRED')
        );
      }
    );
  }

  diaSemana(index) {
    return this.canchasService.diaSemana(index);
  }
  disponibilidadCancha(cancha: PerfilCancha) {
    return this.canchasService.disponibilidadCancha(cancha);
  }
  regresar() {
    this.modalCtrl.dismiss();
  }
  horarioCancha(cancha: PerfilCancha) {
    return this.canchasService.horarioCancha(cancha);
  }

  async onOpenMenu(cancha: PerfilCancha) {
    const normalBtns: ActionSheetButton[] = [
      {
        text: this.translateService.instant('VIEW_COURT'),
        icon: 'eye-outline',
        handler: () => {
          this.canchaDetalle(cancha);
        },
      },
      {
        text: this.translateService.instant('RESERVE_COURT'),
        icon: 'calendar-outline',
        handler: () => {
          this.canchaReservacion(cancha);
        },
      },
      {
        text: this.translateService.instant('CANCEL'),
        icon: 'close-outline',
        role: 'cancel',
      },
    ];

    const actionSheet = await this.actionSheetCtrl.create({
      header: this.translateService.instant('OPTIONS'),
      cssClass: 'left-align-buttons',
      buttons: normalBtns,
      mode: 'ios',
    });

    await actionSheet.present();
  }
  async canchaReservacion(cancha) {
    this.regresar();

    const modal = await this.modalCtrl.create({
      component: GenerarReservacionPage,
      cssClass: 'my-custom-class',
      mode: 'md',
      componentProps: {
        rival: null,
        retador: null,
        cancha: cancha,
      },
    });
    await modal.present();
  }

  async canchaDetalle(cancha: PerfilCancha) {
    const modal = await this.modalCtrl.create({
      component: CanchaDetallePage,
      cssClass: 'my-custom-class',
      mode: 'md',
      componentProps: {
        cancha: cancha,
      },
    });

    await modal.present();
  }

  async reservarCancha(cancha) {
    this.canchasService.cancha = cancha;
    this.router.navigate(['/reservar-cancha']);
  }

  async filtroUbicacion() {
    const modal = await this.modalCtrl.create({
      component: FiltroCanchaPage,
      cssClass: 'my-custom-class',
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
      id: 'my-modal-id',
      componentProps: {
        Codigo_Pais: this.filtro.Codigo_Pais,
        Codigo_Estado: this.filtro.Codigo_Estado,
        Codigo_Ciudad: this.filtro.Codigo_Ciudad,
        Cod_Categoria: this.filtro.Cod_Categoria,
      },
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data !== undefined) {
      this.filtro.Codigo_Pais = data.Codigo_Pais;
      this.filtro.Codigo_Estado = data.Codigo_Estado;
      this.filtro.Codigo_Ciudad = data.Codigo_Ciudad;
      this.filtro.Cod_Categoria = data.Cod_Categoria;
    }
  }

  onSearchChange(event) {
    this.textoBuscar = event.detail.value;
  }
}
