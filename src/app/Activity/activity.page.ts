import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})
export class ActivityPage {

  constructor() {}

  items:string[] = ['a','b','c'];

}
