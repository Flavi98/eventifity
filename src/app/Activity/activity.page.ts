import { Activity } from './../services/data.service';
import { getAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from './../services/auth.service';
import { Router} from '@angular/router';

interface Activity_ {
  id?: string,
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
  public activities: Activity_[] = [];
  public activitiesUser: Activity_[] = [];
  public modalStatus = false;
  public newEventmodalStatus = false;
  private email: string; 
  public eventId: String;

  public newEventTitle: string;
  public newEventCategory: string;
  public newEventAdress: string;
  public newEventDate: string;
  public newEventDescription: string;
  public newEventLat: string;
  public newEventLng: string;

  constructor(
     private authService: AuthService,
     private router: Router,
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
    this.eventId = id;
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

  public openNewEventModal() {
    this.newEventmodalStatus = true;
  }

  public closeModal() {
    this.modalStatus = false;
  }

  public closeNewEventModal() {
    this.newEventmodalStatus = false;
  }

  public createNewActivity() {
    let newActivity: Activity = {
      title: this.newEventTitle,
      adress: this.newEventAdress,
      date: this.newEventDate,
      category: this.newEventCategory,
      description: this.newEventDescription,
      lat: Number(this.newEventLat),
      lng: Number(this.newEventLng),
      participators: []
    };

    this.dataService.addActivity(newActivity);

    this.newEventmodalStatus = false;

    window.location.reload();
  }

  public addActivityToYours() {
    let modalActivity = this.activities.find(activity => activity.id == this.eventId);
    let userArray: string[] = modalActivity.participators;
    if(userArray.includes(this.email))
    {
      alert("This User is already in this activity");
      this.modalStatus = false;
      return;
    }
    userArray.push(this.email);
    this.dataService.updateActivity(modalActivity, userArray);
    this.modalStatus = false;
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/');
    console.log("async in activity page");
  }

}
