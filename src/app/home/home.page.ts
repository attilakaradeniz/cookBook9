import { Component, ViewChild, OnInit } from '@angular/core';
import { StorageService, Item } from '../services/storage.service';
import { Platform, ToastController, NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';

//import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items: Item[] = [];

  newItem: Item = <Item>{};

  detailItem: Item = <Item>{};
  detailObject: {} = {};

  storageArray: [] = [];
  detailArray: [] = [];



  public howMany: number;

  //@ViewChild('myList')myList: IonList;

  public isSearchbarOpened = false;

  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController, public navCtrl: NavController, private router: Router, public storage: Storage) {
    this.plt.ready().then(() => {
      this.loadItems();

      this.showHowMany();

    });
  }
  //-------------------------------------------- TEST FUNCTIONS --------------------------------//
  // getStorageLength() {
  //   console.log('this.storageService.storage.get.name------> ', this.storageService.storage.get.name);
  // }

  //-------------------------------------------- TEST FUNCTIONS --------------------------------//

  ionViewWillEnter() {
    this.loadItems();

    this.showHowMany();
  }

  // create
  addItem() {
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.showToast('Yummed joyfully');
      this.loadItems();
    });

  }

  // read
  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
      this.showHowMany();
    });

  }

  // update
  updateItem(item: Item) {


    // item.title = `YUMMED: ${item.title}`;
    item.title = `YUMMED: ${Date.now()}`;


    item.modified = Date.now();

    this.storageService.updateItem(item).then(item => {
      this.showToast('YUMMMPDATED!');
      // this.myList.closeSlidingItems();
      this.loadItems();

    });
  }

  // delete
  deleteItem(item: Item) {
    this.storageService.deleteItem(item.id).then(item => {
      this.showToast('wish I ate that :(');
      //this.myList.closeSlidingItems();
      this.loadItems();
    });

    this.showHowMany();

  }


  onSearch(event) {
    console.log(event.target.value)
    this.showToastLong('Sorry! \nI ate your ' + event.target.value);

  }

  // shows how many entries on storage
  showHowMany() {
    // console.log('Storage.length: ', Storage.length);
    // console.log('this.items.lenght: ', this.items.length);
    this.howMany = this.items.length;
  }

  // navigates to datails page
  openDetails(item: Item) {
    //debugger
    // console.log('item---------------------------------------------------------------------------->', item); // TEST

    this.detailItem = item;
    this.storage.set('details', this.detailItem);

    this.router.navigate(['details']);


  }


  // helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      // cssClass: 'toast-bg',
      buttons: [
        {
          icon: 'star',

        }
      ],
      color: 'warning'

    });
    toast.present();
  }


  async showToastLong(msg) {
    const toast = await this.toastController.create({
      position: 'top',
      message: msg,
      duration: 4000,
      // cssClass: 'toast-bg',
      buttons: [
        {
          icon: 'body',


        }
      ],
      color: 'warning'

    });
    toast.present();
  }


}
