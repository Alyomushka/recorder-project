import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VideoRecorderModule } from './video-recorder/video-recorder.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    VideoRecorderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
