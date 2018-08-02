import {Component} from '@angular/core';
import {ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import {QRScanner} from "@ionic-native/qr-scanner";
import {showModal} from "../../utils";
import {QrScannerPage} from "../qr-scanner/qr-scanner";

/**
 * Generated class for the ScanItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-scan-item',
  templateUrl: 'scan-item.html',
})
export class ScanItemPage {

  data: string;

  constructor(public navCtrl: NavController,
              public qrScanner: QRScanner,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanItemPage');
  }

  async scan() {
    delete this.data;
    let param: QrScannerPage.Param = {
      title: 'QR Code Scanner',
      hideStatus: false,
      autoConfirm: false,
    };
    let text = await showModal<string>(this.modalCtrl, QrScannerPage, param);
    console.log('scanned', {text});
    this.data = text;
  }
}
