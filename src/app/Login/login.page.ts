import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule,  FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router} from '@angular/router';
import { AlertController, LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
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
    private router: Router
  ) {}

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
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
      this.router.navigateByUrl('/tabs', {replaceUrl: true});
    } else {
      //this.showAlert('Registrierung fehlgeschlagen', 'Bitte erneut versuchen');
    }
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if(user)
    {
      this.router.navigateByUrl('/tabs', {replaceUrl: true});
    } else {
      //this.showAlert('Login fehlgeschlagen', 'Bitte erneut versuchen');
    }
  }
}
