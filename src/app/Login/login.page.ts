import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule,  FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router} from '@angular/router';
import { AlertController, LoadingController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit{
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    public navCtrl: NavController
  ) {}

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.authService.logout();
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if(user)
    {
      const cre = user.user.email;
      let navigationExtras: NavigationExtras = {
        queryParams: {
            cre: cre
        }
    };
      this.router.navigateByUrl('/activity', navigationExtras);
    } else {
      this.showAlert('Registrierung fehlgeschlagen', 'Bitte erneut versuchen');
    }
  }
  async showAlert(header, message) {
    const alert = await this.alertController.create(
      {
        header,
        message,
        buttons: ['OK'],
      });
      await alert.present();
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if(user)
    {
      const cre = user.user.email;
      let navigationExtras: NavigationExtras = {
        queryParams: {
            cre: cre
        }
    };
      this.router.navigateByUrl('/activity', navigationExtras);
    } else {
      this.showAlert('Login fehlgeschlagen', 'Bitte erneut versuchen');
    }
  }
}
