import { Component } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { IonRouterOutlet, ActionSheetController } from '@ionic/angular';
import { collection } from 'firebase/firestore';
import { DataService } from '../services/data.service'

interface Activities {
  title: string;
  adress: string;
  date: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})

export class ActivityPage {
  public activities: Activities[] = [];
  
  public testActivities: Array<{title: string, adress: string, date: string}> = [
    {title: 'Fußball', adress: 'Linz, 4020', date: '01.05.2022 14:00'},
    {title: 'Tennis', adress: 'Gmunden, 4810', date: '04.05.2022 08:00'},
    {title: 'Wandern', adress: 'Traun, 4050', date: '07.05.2022 11:00'},
    {title: 'Rappen mit Nehat', adress: 'Ried im Innkreis, 4910', date: '08.05.2022 16:00'}
  ]
  public lat = 51.678418;
  public lng = 7.809007;

  public modalStatus = false;

  constructor(private dataService: DataService) {
    this.dataService.getActivities().subscribe( res => {
      console.log(res);
      this.activities = res;
    })
  }
  
  public openModal() {
    this.modalStatus = true;
  }

  public closeModal() {
    this.modalStatus = false;
  }

}
