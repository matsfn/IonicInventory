import { Component } from '@angular/core';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

@Component({
  template: `
<ion-header>
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
      Add to list
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

  dismiss() {
    this.viewCtrl.dismiss();
  }
}