import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {QrScannerPage} from './qr-scanner';
import {QRScanner} from "@ionic-native/qr-scanner";

@NgModule({
  declarations: [
    QrScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(QrScannerPage),
  ],
  providers: [
    QRScanner
  ],
})
export class QrScannerPageModule {
}
