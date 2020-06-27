import { Component, ViewChild, OnInit } from '@angular/core';
import { StorageService, Item } from '../services/storage.service';
import { Platform, ToastController, NavController } from '@ionic/angular';

//import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  items: Item[] = [];

  newItem: Item = <Item>{};

  public howMany:number;

 // @ViewChild('myList')myList: IonList;

 public isSearchbarOpened = false;

  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController, public navCtrl: NavController) {
    this.plt.ready().then(() => {
      this.loadItems();
      this.showHowMany();
    });
  }

  // create
  addItem() {
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.showToast('Yummed joyfully');
      this.loadItems();
      console.log('newItem: ', this.newItem);
      console.log('items', this.items);

    });
  }

    // read
    loadItems() {
      this.storageService.getItems().then(items => {
        this.items = items;
        this.showHowMany();
      });
      //this.showHowMany();
    }




  // update
  updateItem(item: Item) {
    item.title = `YUMMM: ${item.title}`;
    item.modified = Date.now();

    this.storageService.updateItem(item).then(item => {
      this.showToast('YUMMMPDATED!');
      // this.myList.closeSlidingItems();
      this.loadItems();
      this.showHowMany();
    });
  }

  // delete
  deleteItem(item: Item) {
    this.storageService.deleteItem(item.id).then(item => {
      this.showToast('wish I ate that :(');
      // this.myList.closeSlidingItems();
      this.loadItems();
    });
  }


  onSearch(event) {
    console.log(event.target.value) 
    this.showToastLong('Sorry! \nI ate your ' + event.target.value);

  }

  // shows how many entries on storage
  showHowMany() {
      console.log('test', Storage.length);
      console.log('this.items.lenght', this.items.length);
      this.howMany = this.items.length;
  }


  // helper
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      // cssClass: 'toast-bg',
      buttons: [
       {
         icon:'star',
         
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
         icon:'body',
         
         
       }
      ],
      color: 'warning'
      
    });
    toast.present();
  }


}
