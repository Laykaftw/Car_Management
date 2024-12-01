import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { Car } from '../model/car.model';
import { Maker } from '../model/maker.model';
import { Image } from '../model/Image.model';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
})
export class UpdateCarComponent implements OnInit {
  currentCar = new Car();
  makers: Maker[] = [];
  updatedMakerId!: number;
  myImage: string = '';
  uploadedImage!: File;
  isImageUpdated: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch all makers
    this.carService.listemakers().subscribe((makersList) => {
      this.makers = makersList;
      console.log('Makers:', makersList);
    });

    // Fetch the current car details based on the ID from the URL
    const carId = this.activatedRoute.snapshot.params['id'];
    this.carService.consulterCar(carId).subscribe((car) => {
      this.currentCar = car;
      this.updatedMakerId = this.currentCar.maker.id;

      // Load the primary image if available
      if (this.currentCar.images?.length > 0) {
        const firstImage = this.currentCar.images[0];
        this.myImage = `data:${firstImage.type};base64,${firstImage.image}`;
      }

      console.log('Car loaded:', this.currentCar);
    });
  }

  onImageUpload(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;

      // Preview the uploaded image
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }

  onAddImageCar(): void {
    if (this.uploadedImage) {
      this.carService
        .uploadImageCar(this.uploadedImage, this.uploadedImage.name, this.currentCar.idCar)
        .subscribe((img: Image) => {
          this.currentCar.images.push(img);
          console.log('Image added:', img);
        });
    }
  }

  supprimerImage(img: Image): void {
    const confirmation = confirm('Are you sure you want to delete this image?');
    if (confirmation) {
      this.carService.supprimerImage(img.idImage).subscribe(() => {
        const index = this.currentCar.images.indexOf(img);
        if (index > -1) {
          this.currentCar.images.splice(index, 1);
        }
        console.log('Image removed:', img);
      });
    }
  }

  updateCar(): void {
    // Set the selected maker
    const selectedMaker = this.makers.find((maker) => maker.id === this.updatedMakerId);
    if (selectedMaker) {
      this.currentCar.maker = selectedMaker;
    }

    // Handle image updates
    if (this.isImageUpdated && this.uploadedImage) {
      this.carService.uploadImage(this.uploadedImage, this.uploadedImage.name).subscribe((img: Image) => {
        this.currentCar.image = img; // Set the updated image
        this.saveCar();
      });
    } else {
      this.saveCar();
    }
  }

  private saveCar(): void {
    this.carService.updateCar(this.currentCar).subscribe(() => {
      console.log('Car updated successfully');
      this.router.navigate(['/cars']);
    });
  }
}
