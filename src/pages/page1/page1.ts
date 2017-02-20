import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { ModalContentPage } from '../page1/modals/ProductsModal';

export class Product {
  name: string;
  constructor(
  ) {
  }
}

let API_PATH: string = 'https://dev-api.bubblmee.com/'

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  products: Observable<Product[]>
  constructor(public http: Http, public navCtrl: NavController, public modalCtrl: ModalController) {
    this.authenticate();
    this.makeRequest();
  }
  authenticate(): void {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json;charset=UTF-8');
    headers.append("Accept", "application/json, text/plain, */*");
    var creds = "";
    let options = new RequestOptions({ headers: headers });

    this.http.post('https://dev-api.bubblmee.com/merchant/login', creds, options)
      //.map(res => res.json())
      .subscribe(
      () => console.log('Authentication Complete')
      );
  }
  makeRequest(): void {
    this.http.get(API_PATH + 'merchant/pos/6d99a82e-d89d-4535-a3e2-07bd243053e5/products', { withCredentials: true })
      .subscribe((res: any) => { console.log(res.json()), this.products = res.json() })
  }
  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalContentPage, characterNum);
    modal.present();
  }

}