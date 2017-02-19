import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

export class Product {
    name: string;
    constructor(
    ){
    }
}

let API_PATH: string = 'https://api.bubblmee.com/'
// let APP_SETTINGS: any = `
//         {
//         "withCredentials": true,
//         "async": true,
//         "crossDomain": true,
//         "url": "https://api.bubblmee.com/merchant/login",
//         "method": "POST",
//         "data": "{\"email\":\"dev@bubblygroup.com\",\"password\":\"XxXpFTHz\"}"
//         `;

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
 products : Observable<Product[]>
  constructor(public http: Http, public navCtrl: NavController, public modalCtrl: ModalController) {
    this.authenticate();
    this.makeRequest();
    
  }
  authenticate(): void {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers.append("Accept", "application/json, text/plain, */*");
    var creds = "{\"email\":\"dev@bubblygroup.com\",\"password\":\"XxXpFTHz\"}";
    let options = new RequestOptions({ headers: headers });

    this.http.post('https://api.bubblmee.com/merchant/login', creds, options)
      //.map(res => res.json())
      .subscribe(
      () => console.log('Authentication Complete')
      );
  }
  makeRequest() : void {
      this.http.get(API_PATH + 'merchant/pos/3c0fa90a-21a5-4d53-be12-7185cf4dd291/products', {withCredentials: true })
      .subscribe((res: any) => {console.log(res.json()), this.products = res.json()})

  }
  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
  }

}

@Component({
  template: `
<ion-header>
  <ion-toolbar>
    <ion-title>
      Description
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
  <ion-list>
      <ion-item>
        <ion-avatar item-left>
          <img src="{{character.image}}">
        </ion-avatar>
        <h2>{{character.name}}</h2>
        <p>{{character.quote}}</p>
      </ion-item>
      <ion-item *ngFor="let item of character['items']">
        {{item.title}}
        <ion-note item-right>
          {{item.note}}
        </ion-note>
      </ion-item>
  </ion-list>
</ion-content>
<ion-footer>
    <button ion-button outline icon-left round>
      <ion-icon name="ios-add-circle-outline"></ion-icon>
      Add Products
    </button>
</ion-footer>
`
})
export class ModalContentPage {
  character;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    var characters = [
      {
        name: 'Gollum',
        quote: 'Sneaky little hobbitses!',
        image: 'assets/img/avatar-gollum.jpg',
        items: [
          { title: 'Race', note: 'Hobbit' },
          { title: 'Culture', note: 'River Folk' },
          { title: 'Alter Ego', note: 'Smeagol' }
        ]
      },
    ];
    this.character = characters[this.params.get('charNum')];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}