import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivityPage } from './activity.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ActivityPageRoutingModule } from './activity-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ActivityPageRoutingModule,
    ScrollingModule
  ],
  declarations: [ActivityPage]
})
export class ActivityPageModule {}
