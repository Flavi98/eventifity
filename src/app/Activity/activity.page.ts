import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

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
  profile = null;
  public activities: Activities[] = [];
  public testActivities: Array<{title: string, adress: string, date: string}> = [
    {title: 'Fußball', adress: 'Linz, 4020', date: '01.05.2022 14:00'},
    {title: 'Tennis', adress: 'Gmunden, 4810', date: '04.05.2022 08:00'},
    {title: 'Wandern', adress: 'Traun, 4050', date: '07.05.2022 11:00'},
    {title: 'Klettern mit Nehat', adress: 'Ried im Innkreis, 4910', date: '08.05.2022 16:00'}
  ]

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // this.activities = this.testActivities;
  
  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/login', {replaceUrl: true});
 
  }
  /* params holen Option 1
  https://forum.ionicframework.com/t/how-to-pass-data-from-1-page-to-another-using-navigation-in-ionic-4/151060/2
// Receive Parameter
import { ActivatedRoute } from "@angular/router";
//...
constructor(private route: ActivatedRoute) {}
//...
this.route.queryParams.subscribe(params => {
    this.cre = params["cre"]; --> is Mailadresse vom user
});*/


}
