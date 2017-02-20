import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { LoadingController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public loadingCtrl: LoadingController) {
    this.initializeApp();
    this.presentLoading();
  
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inventory', component: Page1 },
      { title: 'Charts', component: Page2 },
      { title: 'Control', component: Page2 }
    ];
    console.log(this.pages[0])
  }
    presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.openPage(this.pages[0]);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
