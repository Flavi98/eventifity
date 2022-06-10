import { getAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

interface Activities {
  id: string,
  title: string,
  adress: string,
  date: string,
  category: string,
  description: string,
  lat: number,
  lng: number,
  participators: string[],
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'activity.page.html',
  styleUrls: ['activity.page.scss']
})

export class ActivityPage {
  public activities: Activities[] = [];
  public activitiesUser: Activities[] = [];
  public modalStatus = false;
  private email: string;

  constructor(
      private dataService: DataService,
    ) {
    this.email = getAuth().currentUser.email;
    this.dataService.getActivities().subscribe( res => {
      this.activities = res;
      this.activitiesUser = res.filter(activity => activity.participators.includes(this.email));
    })
  }

  public titleActivity = "";
  public categoryActivity = "";
  public adressActivity = "";
  public dateActivity = "";
  public descriptionActivity = "";
  public latActivity = 0;
  public lngActivity = 0;

  
  public openModal(id: String) {
    this.modalStatus = true;
    const modalActivity = this.activities.find(activity => activity.id == id);
    this.titleActivity = modalActivity.title;
    this.categoryActivity = modalActivity.category;
    this.adressActivity = modalActivity.adress;
    this.dateActivity = modalActivity.date;
    this.descriptionActivity = modalActivity.description;
    this.latActivity = modalActivity.lat;
    this.lngActivity = modalActivity.lng;
  }

  public closeModal() {
    this.modalStatus = false;
  }

}
