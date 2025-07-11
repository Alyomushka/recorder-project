import { NgModule } from '@angular/core';
import { VideoRecorderComponent } from './video-recorder.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [VideoRecorderComponent],
    imports: [
        FormsModule,
    ],
    exports: [VideoRecorderComponent]
})
export class VideoRecorderModule { }