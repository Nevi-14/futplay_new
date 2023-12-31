import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  AlertController,
  ModalController,
  PickerController,
  PopoverController,
} from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { HorarioCanchas } from 'src/app/models/horarioCanchas';
import { HorarioCanchasService } from 'src/app/services/horario-canchas.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { ReservacionesService } from '../../services/reservaciones.service';
import { ListaEquiposPage } from '../lista-equipos/lista-equipos.page';
import { PerfilCancha } from '../../models/perfilCancha';
import { PerfilEquipos } from 'src/app/models/perfilEquipos';
import { DetalleReservaciones } from 'src/app/models/detalleReservaciones';
import { CanchasService } from '../../services/canchas.service';
import { EmailService } from 'src/app/services/email.service';
import { EquiposService } from '../../services/equipos.service';
import { format } from 'date-fns';
import { FinalizarReservacionPage } from '../finalizar-reservacion/finalizar-reservacion.page';
import { CanchaDetallePage } from '../cancha-detalle/cancha-detalle.page';
import { CalendarioPopoverPage } from '../calendario-popover/calendario-popover.page';
import { Reservaciones } from 'src/app/models/reservaciones';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
interface objetoFecha {
  id: number;
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  time12: number;
  meridiem: string;
  date: Date;
}
@Component({
  selector: 'app-generar-reservacion',
  templateUrl: './generar-reservacion.page.html',
  styleUrls: ['./generar-reservacion.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerarReservacionPage {
  @Input() cancha: PerfilCancha;
  rival: PerfilEquipos;
  retador: PerfilEquipos;
  validarReservacion: boolean = false;
  nuevaReservacion: Reservaciones = {
    Cod_Reservacion: null,
    Cod_Cancha: null,
    Cod_Tipo: 3,
    Cod_Usuario: this.usuariosService.usuarioActual.Cod_Usuario,
    Reservacion_Externa: false,
    Titulo: '',
    Detalle: '',
    Cod_Estado: 2,
    Fecha: new Date(format(new Date(), 'yyy/MM/dd')).toISOString(),
    Hora_Inicio: null,
    Hora_Fin: null,
    Dia_Completo: false,
  };
  selectedDate: string;
  selectedTime: string;
  continuar = false;
  startTime: string;
  endTime: string;
  url = environment.archivosURL;
  detalleReservacion: DetalleReservaciones = {
    Cod_Detalle: null,
    Cod_Reservacion: null,
    Moneda: 'CRC',
    Cod_Estado: 3,
    Cod_Retador: null,
    Cod_Rival: null,
    Confirmacion_Rival: null,
    Luz: null,
    Monto_Luz: 0,
    Total_Horas: 0,
    Precio_Hora: 0,
    Cod_Descuento: null,
    Porcentaje_Descuento: 0,
    Monto_Descuento: 0,
    Porcentaje_Impuesto: 0,
    Monto_Impuesto: 0,
    Porcentaje_FP: 10,
    Monto_FP: 0,
    Monto_Equipo: 0,
    Monto_Sub_Total: 0,
    Monto_Total: 0,
    Pendiente: 0,
    Notas_Estado: this.translateService.instant('PENDING_CONFIRMATION'),
  };
  isModalOpen: boolean = false;
  fecha: string = new Date(format(new Date(), 'yyy/MM/dd')).toISOString();
  fechaMinima = new Date(format(new Date(), 'yyy/MM/dd')).toISOString();
  showPicker = false;
  constructor(
    public modalCtrl: ModalController,
    public usuariosService: UsuariosService,
    public popOverCtrl: PopoverController,
    public horarioCanchasService: HorarioCanchasService,
    private cd: ChangeDetectorRef,
    public gestionReservacionesService: ReservacionesService,
    private translateService: TranslateService,
    public alertasService: AlertasService,
    public canchasService: CanchasService,
    public emailService: EmailService,
    public equiposService: EquiposService,
    public alertCtrl: AlertController,
    private pickerCtrl: PickerController
  ) {}

  resetearHoras() {
    this.nuevaReservacion.Hora_Inicio = null;
    this.nuevaReservacion.Hora_Fin = null;
    this.gestionReservacionesService.horaInicioArray = [];
    this.gestionReservacionesService.horaFinArray = [];
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  ionViewWillEnter() {
    this.nuevaReservacion = {
      Cod_Reservacion: null,
      Cod_Cancha: null,
      Cod_Tipo: 3,
      Cod_Usuario: this.usuariosService.usuarioActual.Cod_Usuario,
      Reservacion_Externa: false,
      Titulo: '',
      Detalle: '',
      Cod_Estado: 2,
      Fecha: new Date(format(new Date(), 'yyy/MM/dd')).toISOString(),
      Hora_Inicio: null,
      Hora_Fin: null,
      Dia_Completo: false,
    };
    this.detalleReservacion = {
      Cod_Detalle: null,
      Cod_Reservacion: null,
      Moneda: 'CRC',
      Cod_Estado: 3,
      Cod_Retador: null,
      Cod_Rival: null,
      Confirmacion_Rival: null,
      Luz: null,
      Monto_Luz: 0,
      Total_Horas: 0,
      Precio_Hora: 0,
      Cod_Descuento: null,
      Porcentaje_Descuento: 0,
      Monto_Descuento: 0,
      Porcentaje_Impuesto: 0,
      Monto_Impuesto: 0,
      Porcentaje_FP: 10,
      Monto_FP: 0,
      Monto_Equipo: 0,
      Monto_Sub_Total: 0,
      Monto_Total: 0,
      Pendiente: 0,
      Notas_Estado: this.translateService.instant('PENDING_CONFIRMATION'),
    };
    if (this.cancha) {
      this.resetearHoras();
      this.nuevaReservacion.Cod_Cancha = this.cancha.cancha.Cod_Cancha;
      this.horarioCanchasService.horarioCancha = [];
      this.consultarHoras();
    }
  }

  async agregarRival() {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      this.equiposService.equipos = [];
      const modal = await this.modalCtrl.create({
        component: ListaEquiposPage,
        cssClass: 'my-custom-modal',
        mode: 'md',
        componentProps: {
          rival: true,
        },
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;

      if (data !== undefined) {
        this.rival = data.equipo;
        this.validarReservacion = true;
        this.cd.detectChanges();
      }
    }
  }

  async tipoReto() {
    const alert = await this.alertCtrl.create({
      header: 'FUTPLAY',
      buttons: [
        {
          text: this.translateService.instant('CANCEL'),
          role: 'cancel',
          handler: () => {},
        },
        {
          text: this.translateService.instant('CONFIRM'),
          role: 'confirm',
          handler: (data) => {
            this.nuevaReservacion.Cod_Tipo = data;
            if (data == 1 || data == 2) {
              this.rival = null;
            }
            this.cd.detectChanges();
          },
        },
      ],
      mode: 'ios',
      inputs: [
        {
          label: this.translateService.instant('INDIVIDUAL_RESERVATION'),
          type: 'radio',
          value: 1,
        },
        {
          label: this.translateService.instant('GROUP_RESERVATION'),
          type: 'radio',
          value: 3,
        },
        {
          label: this.translateService.instant('OPEN_RESERVATION'),
          type: 'radio',
          value: 2,
        },
      ],
    });

    await alert.present();
  }

  async canchaDetalle() {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component: CanchaDetallePage,
        mode: 'md',
        componentProps: {
          cancha: this.cancha,
          reservar: false,
        },
      });
      modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;
    }
  }

  async agregarRetador() {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component: ListaEquiposPage,
        mode: 'md',
        componentProps: {
          rival: false,
        },
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;
      if (data !== undefined) {
        this.retador = data.equipo;

        this.cd.detectChanges();
      }
    }
  }

  agregarHoras(h, m) {
    let date = new Date(this.nuevaReservacion.Fecha);
    date.setHours(h);
    date.setMinutes(m);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }

  async openPicker(index: number) {
    if (
      this.nuevaReservacion.Fecha ==
        new Date(format(new Date(), 'yyy/MM/dd')).toISOString() &&
      new Date().getHours() >= 22
    ) {
      return this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant('RESERVATION_NOT_AVAILABLE')
      );
    }

    let data: objetoFecha[] = [];

    if (index == 1) {
      await this.gestionReservacionesService.calHoraInicio(
        this.cancha.cancha.Cod_Cancha,
        new Date(format(new Date(this.nuevaReservacion.Fecha), 'yyy/MM/dd'))
      );

      data = this.gestionReservacionesService.horaInicioArray;
    }
    if (index == 2) {
      let fecha = new Date(
        format(new Date(this.nuevaReservacion.Hora_Inicio), 'yyy/MM/dd')
      );
      await this.gestionReservacionesService.calHoraFin(
        this.cancha.cancha.Cod_Cancha,
        fecha
      );

      data = this.gestionReservacionesService.horaFinArray;
    }

    let options = [];

    let inicio =
      index == 2
        ? new Date(this.nuevaReservacion.Hora_Inicio).getHours() + 1
        : data[0].id;
    let fin = data[data.length - 1].id + 1;

    for (let i = inicio; i < fin; i++) {
      let AmOrPm = i >= 12 ? 'PM' : 'AM';
      let indexH = data.findIndex((e) => e.id == i);
      if (indexH >= 0) {
        let option1 = {
          text: `${String(data[indexH].id % 12 || 12).padStart(
            2,
            '0'
          )} : 00 :  ${AmOrPm}`,
          value: `${this.agregarHoras(i, 0)}`,
        };

        options.push(option1);
      }

      if (i == fin - 1) {
        const picker = await this.pickerCtrl.create({
          mode: 'md',
          columns: [
            {
              name: this.translateService.instant('HOUR'),
              options: options,
            },
          ],
          buttons: [
            {
              text: this.translateService.instant('CANCEL'),
              role: 'cancel',
            },
            {
              text: this.translateService.instant('CONFIRM'),
              handler: (value) => {
                if (index == 1) {
                  this.nuevaReservacion.Hora_Fin = null;
                  this.nuevaReservacion.Hora_Inicio = value.Hour.value;
                  this.continuar = false;
                }
                if (index == 2) {
                  this.nuevaReservacion.Hora_Fin = value.Hour.value;
                  let inicio = new Date(this.nuevaReservacion.Hora_Inicio);
                  let fin = new Date(this.nuevaReservacion.Hora_Fin);

                  let totalHoras = (fin.getTime() - inicio.getTime()) / 1000;

                  this.detalleReservacion.Total_Horas = totalHoras / 60 / 60;
                  this.continuar = true;
                }

                this.cd.detectChanges();
              },
            },
          ],
        });
        if (!this.showPicker) {
          this.showPicker = true;
          await picker.present();
          const { data } = await picker.onDidDismiss();
          this.showPicker = false;
        }
      }
    }
  }

  async finalizarReservacion() {
    this.regresar();
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component: FinalizarReservacionPage,
        cssClass: 'my-custom-modal',
        mode: 'md',
        componentProps: {
          cancha: this.cancha,
          nuevaReservacion: this.nuevaReservacion,
          detalleReservacion: this.detalleReservacion,
          rival: this.rival,
          retador: this.retador,
          actualizar: false,
        },
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;
      if (data !== undefined) {
      }
    }
  }

  async calendario() {
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      const modal = await this.modalCtrl.create({
        component: CalendarioPopoverPage,
        cssClass: 'my-custom-modal',
        mode: 'ios',
        componentProps: {
          fecha: this.nuevaReservacion.Fecha,
        },
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      this.isModalOpen = false;
      if (data !== undefined) {
        this.nuevaReservacion.Fecha = data.fecha;
        this.nuevaReservacion.Hora_Inicio = null;
        this.nuevaReservacion.Hora_Fin = null;
        this.cd.detectChanges();
      }
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  consultarHoras() {
    this.horarioCanchasService
      .syncGetHorarioCanchaToPromise(this.cancha.cancha.Cod_Cancha)
      .then((resp) => {
        let horario: HorarioCanchas[] = resp;
        this.gestionReservacionesService.horario = horario;
        let { continuar } = this.gestionReservacionesService.consultarHoras(
          horario,
          new Date(format(new Date(this.nuevaReservacion.Fecha), 'yyy/MM/dd'))
        );

        if (continuar) {
          this.gestionReservacionesService.calHoraInicio(
            this.cancha.cancha.Cod_Cancha,
            new Date(format(new Date(this.nuevaReservacion.Fecha), 'yyy/MM/dd'))
          );
        }

        this.cd.detectChanges();
      });
  }

  cambiarFecha($event) {
    let inputDate = $event.detail.value;
    var today = new Date();
    var newDate = new Date(inputDate);
    newDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (newDate.getTime() < today.getTime()) {
      this.alertasService.message(
        'FUTPLAY',
        this.translateService.instant('DATE_ERROR')
      );
      return;
    }
    this.resetearHoras();
    this.nuevaReservacion.Fecha = newDate.toISOString();

    this.consultarHoras();
    this.cd.detectChanges();
  }

  formatoAmPM(date: Date) {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
}
