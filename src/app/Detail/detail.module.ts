import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailPage } from './detail.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { DetailPageRoutingModule } from './detail-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    DetailPageRoutingModule,
    ScrollingModule
  ],
  declarations: [DetailPage]
})
export class DetailPageModule {}
