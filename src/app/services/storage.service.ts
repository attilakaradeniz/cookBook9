import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonList } from '@ionic/angular';

export interface Item {
  id: number,
  title: string,
  ingredients: string,
  instructions: string,
  modified: number,
  nutFacts: string
  }

  const ITEMS_KEY = 'food-items';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public storage: Storage) { }

  // TEST to get storage length
  getStorageLength(){
    return this.storage.length;
  }

  // create
  addItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if(items) {
        items.push(item); 
        return this.storage.set(ITEMS_KEY, items);
      }else {
        return this.storage.set(ITEMS_KEY, [item]);
      }
    });

  }

  // read
  getItems(): Promise<Item[]> {
      return this.storage.get(ITEMS_KEY);
  }


  // update
  updateItem(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if(!items || items.length === 0) {
        return null;
      }
     let newItems: Item[] = [];
      for(let i of items) {
        if(i.id === item.id) {
          newItems.push(item); 
        } else {
          newItems.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, newItems);
    });
  }
  // delete
  deleteItem(id: number): Promise<Item> {
      return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
          if(!items || items.length === 0) {
            return null;
          }
          let toKeep: Item[] = [];
          for(let i of items) {
            if(i.id !== id) {
              toKeep.push(i);
            }
          }
          return this.storage.set(ITEMS_KEY, toKeep);
      });
  }
  detail(item: Item): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
      if(!items || items.length === 0) {
        return null;
      }
      //let toSend: Item[] = [];
      let newItems: Item[] = [];
      for(let i of items) {
        if(i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }
      //debugger
      //return this.storage.set('datail', toSend);
      return this.storage.set(ITEMS_KEY, newItems);
    });
  }




}
