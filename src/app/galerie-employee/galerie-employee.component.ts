import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-galerie-employee',
  standalone: true,
  imports: [NgFor],
  templateUrl: './galerie-employee.component.html',
  styleUrl: './galerie-employee.component.css'
})
export class GalerieEmployeeComponent implements OnInit {

  @ViewChild('video') videoElement!: ElementRef;
  @ViewChild('canvas') canvasElement!: ElementRef;
  photos: Array<{ url: string }> = [];

  constructor(private employeeService : EmployeeService) { }

 ngOnInit() {
    this.startCamera();
    this.loadPhotos(); // Charger les photos à l'initialisation
  }

   startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        const video = this.videoElement.nativeElement;
        video.srcObject = stream;
      })
      .catch(error => {
        console.error('Erreur lors de l\'accès à la caméra', error);
      });
  }

  capture() {
    const canvas = this.canvasElement.nativeElement;
    const video = this.videoElement.nativeElement;
    const context = canvas.getContext('2d');

    // Dessiner l'image vidéo sur le canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convertir l'image du canvas en Base64
    const imageData = canvas.toDataURL('image/png');

    // Appeler la méthode du service pour télécharger la photo
    this.employeeService.uploadPhoto(imageData).subscribe({
      next: (response) => {
        this.photos.push(response); // Ajouter la photo à la galerie après upload
      },
      error: (error) => {
        console.error('Erreur lors du téléchargement de la photo', error);
      }
    });
  }

  loadPhotos() {
    // Appeler la méthode du service pour récupérer les photos
    this.employeeService.getPhotos().subscribe({
      next: (photos) => {
        this.photos = photos; // Charger les photos dans la galerie
      },
      error: (error) => {
        console.error('Erreur lors du chargement des photos', error);
      }
    });
  }

}
 