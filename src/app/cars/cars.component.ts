import { Component, OnInit } from '@angular/core';
import { Car } from '../model/car.model';
import { CarService } from '../services/car.service';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
})
export class CarsComponent implements OnInit {
  cars!: Car[]; 
  apiurl:string='http://localhost:8089/Cars/api';
  // apiurl:string='http://localhost:8090/Cars/api';

  constructor(
    private carService: CarService,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.chargerCars(); // Initialize cars on component load
  }

  chargerCars() {
    this.carService.listeCars().subscribe((crs) => {
      this.cars = crs;
      this.cars.forEach((car) => {
        if (car.images && car.images.length > 0) {
          // Properly construct the base64 image URL
          car.imageStr = `data:${car.images[0].type};base64,${car.images[0].image}`;
        } else {
          car.imageStr = ''; // Fallback if no image is available
        }
      });
    });
  }
  
  
    


  supprimercars(car: Car) {
    const conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.carService.supprimerCar(car.idCar!).subscribe(
        () => {
          console.log('Car deleted successfully');
          this.chargerCars(); // Reload the list after deletion
        },
        (error: HttpErrorResponse) => {
          this.handleError(error, 'deleting car');
        }
      );
    }
  }

  private handleError(error: HttpErrorResponse, action: string) {
    if (error.status === 403) {
      console.error(`Access forbidden while ${action}:`, error);
      alert('You do not have permission to perform this action.');
    } else {
      console.error(`An error occurred while ${action}:`, error);
      alert(`An error occurred while ${action}. Please try again.`);
    }
  }
}
