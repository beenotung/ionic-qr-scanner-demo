import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {ScanItemPage} from "../scan-item/scan-item";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ScanItemPage;
  tab2Root = AboutPage;

  constructor() {

  }
}
