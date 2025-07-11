import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-video-recorder',
    templateUrl: './video-recorder.component.html',
    styleUrls: ['./video-recorder.component.scss']
})
export class VideoRecorderComponent implements OnInit {
    @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;

    mediaRecorder!: MediaRecorder;
    recordedChunks: Blob[] = [];
    isRecording = false;
    stream!: MediaStream;

    gyroData: any[] = [];
    gpsData: any[] = [];
    gyroIntervalId: any;

    async ngOnInit() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            this.videoRef.nativeElement.srcObject = this.stream;
        } catch (err) {
            console.error('Access denied or error:', err);
        }
    }

    startRecording() {
        this.recordedChunks = [];
        this.gyroData = [];
        this.gpsData = [];

        this.mediaRecorder = new MediaRecorder(this.stream);

        this.mediaRecorder.ondataavailable = (event: BlobEvent) => {
            if (event.data.size > 0) this.recordedChunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => this.saveVideo();

        this.mediaRecorder.start();
        this.isRecording = true;

        this.trackGyroscope();
        this.trackGPS();
    }

    stopRecording() {
        this.mediaRecorder.stop();
        this.isRecording = false;
    }

    saveVideo() {
        const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'recorded-video.webm';
        a.click();

        // save gyroData
        const gyroBlob = new Blob([JSON.stringify(this.gyroData, null, 2)], { type: 'application/json' });
        const gyroUrl = URL.createObjectURL(gyroBlob);
        const gyroLink = document.createElement('a');
        gyroLink.href = gyroUrl;
        gyroLink.download = 'gyro.json';
        gyroLink.click();

        // save gpsData
        const gpsBlob = new Blob([JSON.stringify(this.gpsData, null, 2)], { type: 'application/json' });
        const gpsUrl = URL.createObjectURL(gpsBlob);
        const gpsLink = document.createElement('a');
        gpsLink.href = gpsUrl;
        gpsLink.download = 'gps.json';
        gpsLink.click();

        URL.revokeObjectURL(url);
    }

    trackGPS() {
        navigator.geolocation.watchPosition(
            (position) => {
                this.gpsData.push({
                    time: new Date().toISOString(),
                    coords: {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    }
                });
            },
            (error) => console.error('GPS error:', error),
            { enableHighAccuracy: true, timeout: 5000 }
        );
    }

    trackGyroscope() {
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (event) => {
                this.gyroData.push({
                    time: new Date().toISOString(),
                    alpha: event.alpha,
                    beta: event.beta,
                    gamma: event.gamma
                });
            });
        }
    }
}