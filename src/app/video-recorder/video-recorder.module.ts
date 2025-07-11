import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoRecorderComponent } from './video-recorder.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: "",
        component: VideoRecorderComponent,
    },
];

@NgModule({
    declarations: [VideoRecorderComponent],
    imports: [
        RouterModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    exports: [VideoRecorderComponent]
})
export class VideoRecorderModule { }