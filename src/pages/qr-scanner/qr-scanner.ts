import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {QRScanner} from "@ionic-native/qr-scanner";
import * as util from "util";
import {Subscription} from "rxjs/Subscription";
// no-cordova
// cordova_not_available
@IonicPage()
@Component({
  selector: 'page-qr-scanner',
  templateUrl: 'qr-scanner.html',
})
export class QrScannerPage implements OnInit, OnDestroy {

  status: any = "";
  data = "";
  sub: Subscription;

  private _no_cordova = false;

  param: QrScannerPage.Param = {
    title: 'QR Code Scanner',
    hideStatus: false,
    autoConfirm: false,
  };

  constructor(public navCtrl: NavController,
              private qrScanner: QRScanner,
              private view: ViewController,
              private ngZone: NgZone,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrScannerPage');
  }

  get no_cordova() {
    return this._no_cordova
  }

  set no_cordova(value: boolean) {
    this._no_cordova = value;
    let e = window.document.querySelector('ion-app');
    if (value) {
      e.classList.add('no-cordova')
    } else {
      e.classList.remove('no-cordova')
    }
  }

  ngOnInit(): void {
    Object.assign(this.param, this.navParams.data);
    this.scan();
    this.sub = this.qrScanner.scan().subscribe(
      data => {
        console.log("QR code data:", data);
        this.ngZone.run(() => this.data = data);
        if (this.param.autoConfirm) {
          this.confirm();
        }
      }
      , err => {
        console.error('failed to scan qr code:', err);
        this.status = err;
        if (err === 'cordova_not_available') {
          this.no_cordova = true;
        }
      }
    );
    window.document.querySelector('ion-app').classList.add('transparentBody');
  }

  ngOnDestroy(): void {
    this.qrScanner.disableLight();
    this.qrScanner.pausePreview();
    this.sub && this.sub.unsubscribe();
    const e = window.document.querySelector('ion-app');
    e.classList.remove('transparentBody');
    if (this.no_cordova) {
      e.classList.remove('no-cordova');
    }
  }


  scan() {
    console.log("try to scan QR code");
    this.qrScanner.show()
      .then(status => {
        this.status = util.inspect(status);
        console.log("qr scanner status:", util.inspect(status));
        this.qrScanner.enableLight();
      })
      .catch(err => {
        console.error('failed to show qr scanner:', err);
        this.status = err;
        if (err === 'cordova_not_available') {
          this.no_cordova = true;
        }
      })
    ;
  }

  cancel() {
    this.view.dismiss(false);
  }

  confirm() {
    this.view.dismiss(this.data);
  }
}

export namespace QrScannerPage {
  export interface Param {
    title?: string | false;
    hideStatus?: boolean;
    autoConfirm?: boolean;
  }
}
