import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'Eventivity',
    component: TabsPage,
    children: [
      {
        path: 'Activity',
        loadChildren: () => import('../Activity/activity.module').then(m => m.ActivityPageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'Login',
        loadChildren: () => import('../Login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: '',
        redirectTo: '/Login/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/Login/login.page.html',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
