import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { MyReservationsPage } from 'src/app/pages/my-reservations/my-reservations.page';
import { SettingInfoComponent } from '../setting-info/setting-info.component';
import { MyClubsPage } from '../../pages/my-clubs/my-clubs.page';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo = '';
  @Input() menu1 = false;
  @Input() menu2 = false;
  @Input() searchbar = false;
  @Input() menu4 = false;
  url: string;
  invalidURL = ['/home/clubs','/test '];
  valid = false;

  constructor(private popoverCtrl: PopoverController, private route: Router, private modalCtrl: ModalController) { }


  ngOnInit() {
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: SettingInfoComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      backdropDismiss: true
    });
    await popover.present();

    const { data } = await popover.onWillDismiss();
    console.log(data);
  }
 async clubsMenu(ev: any){
  const popover = await this.popoverCtrl.create({
    component: MyClubsPage,
    cssClass: 'my-custom-class',
    event: ev,
    translucent: true,
    backdropDismiss: true
  });
  await popover.present();

  const { data } = await popover.onWillDismiss();
  console.log(data);
 }

  async presentModal() {
  
    const modal = await this.modalCtrl.create({
      component: MyReservationsPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  logOut(){
    this.route.navigate([ '/inicio/login']);
  }}
