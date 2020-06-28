import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {


  data: any;
  ingArray: [] = [];

  constructor(private route: ActivatedRoute, private router: Router, public storage: Storage) {
    route.queryParams.subscribe(params => {
      console.log('params', params);
        if(params && params.special) {
            //this.data = JSON.parse(params.special);
        }
    });
   }

  ngOnInit() {
   this.storage.get('details').then(val => {
    console.log('val===================================> ', val);
    console.log('val===================================> ', val.title);
    console.log('val===================================> ', val.ingredients);
    console.log('val===================================> ', val.instructions);
    console.log('val===================================> ', val.modified);
    console.log('val===================================> ', val.nutFacts);

    this.data = val;
    console.log('data***********************************> ', this.data);
    console.log('data.title ***********************************> ', this.data.title);
    

    
    let str = this.data.ingredients;
    this.ingArray = str.split(" ");

        



   });
  }




  

}
