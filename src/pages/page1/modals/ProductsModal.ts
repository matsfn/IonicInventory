import { Component } from '@angular/core';
import { Platform, NavParams, ViewController, Keyboard } from 'ionic-angular';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class Product {
  name: string;
  constructor(
  ) {
  }
}


let API_PATH: string = 'https://dev-api.bubblmee.com/'

@Component({
  template: `
<ion-header (click)="closeKeyboard()">
  <ion-toolbar>
    <ion-title>
      All products
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
<div>
    <ion-searchbar>
    </ion-searchbar>
</div>
<div (click)="closeKeyboard()" class="custom-modal-card">
    <ion-grid>
      <ion-row wrap>
        <ion-col width-90 *ngFor="let item of products">
          <ion-card class="custom-card">
          <ion-header>
          </ion-header>
            <img src={{item.imageUrl}} />
          </ion-card>

        </ion-col>
      </ion-row>
    </ion-grid>
    </div>
</ion-content>
<ion-footer>
   <ion-row>
     <ion-col width-100 style="text-align: center">
           <button (click)="dismiss()" ion-button outline icon-left round>Done</button>
     </ion-col>
    </ion-row>

</ion-footer>
`
})
export class ModalContentPage {
  character;
  products: Observable<Product[]>;
  constructor(
    public http: Http,
    public keyboard: Keyboard,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    this.makeRequest();
    var characters = [
      {
        name: 'Computer Mouse',
        quote: 'Description',
        image: 'assets/img/avatar-gollum.jpg',
        items: [
          { title: 'Price', note: '10$' },
          { title: 'Quantity', note: '100' },
          { title: 'Weight', note: '100g' }
        ]
      },
    ];
    this.character = characters[this.params.get('charNum')];
  }
  closeKeyboard(){
    if(this.keyboard.isOpen()){
      this.keyboard.close();
      console.log("trying to close keyboard");
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
    makeRequest(): void {
    this.http.get(API_PATH + 'merchant/pos/6d99a82e-d89d-4535-a3e2-07bd243053e5/products', { withCredentials: true })
      .subscribe((res: any) => { console.log(res.json()), this.products = res.json() })
  }
}