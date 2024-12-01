import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car.model';
import { CarService } from '../services/car.service';
import { Router } from '@angular/router';
import { Maker } from '../model/maker.model';
import { Image } from '../model/Image.model';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
})
export class AddCarComponent implements OnInit {
  newCar = new Car(); // Car object to be added
  makers!: Maker[]; // Array to hold available makers
  newIdMaker!: number; // ID of the selected maker
  uploadedImage!: File; // Uploaded image file
  imagePath: any; // Preview of the uploaded image

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    // Fetch list of makers on component initialization
    this.carService.listemakers().subscribe((makersList) => {
      this.makers = makersList;
      console.log(makersList);
    });
  }

  addCar() {
    // Assign the selected maker to the new car
    this.newCar.maker = this.makers.find((mak) => mak.id == this.newIdMaker)!;

    // Add the car and handle image upload if necessary
    this.carService.addCar(this.newCar).subscribe((car: Car) => {
      if (this.uploadedImage) {
        // Upload the image associated with the car
        this.carService
          .uploadImageCar(this.uploadedImage, this.uploadedImage.name, car.idCar)
          .subscribe(() => {
            // Navigate to the cars list after successful upload
            this.router.navigate(['cars']);
          });
      } else {
        // Navigate to the cars list if no image is uploaded
        this.router.navigate(['cars']);
      }
    });
  }

  onImageUpload(event: any) {
    // Handle file input change event for image upload
    this.uploadedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => {
      this.imagePath = reader.result; // Preview the uploaded image
    };
  }
}
