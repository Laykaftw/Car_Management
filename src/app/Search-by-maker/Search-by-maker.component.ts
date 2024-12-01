import { Component, OnInit } from '@angular/core';
import { Maker } from '../model/maker.model';
import { Car } from '../model/car.model';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './search-by-maker.component.html',
})
export class SearchByMakerComponent implements OnInit {
  cars!: Car[];  // Initialize array to hold filtered cars
  makers!: Maker[];  // Initialize array to hold list of makers
  selectedMakerId!: number;  // Variable to store the selected maker ID

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    // Load makers
    this.carService.listemakers().subscribe((makersList) => {
      this.makers = makersList;
      console.log(makersList);
    });

    // Load all cars initially
    this.loadAllCars();
  }

  // Method to load all cars
  private loadAllCars(): void {
    this.carService.listeCars().subscribe((carsList) => {
      this.cars = carsList;
    });
  }

  // Method triggered when maker selection changes
  onChange(): void {
    if (this.selectedMakerId) {
      // Fetch cars by the selected maker ID
      this.carService.rechercherParMaker(this.selectedMakerId).subscribe((filteredCars) => {
        this.cars = filteredCars;
      });
    } else {
      // If no maker selected, load all cars again
      this.loadAllCars();
    }
  }
}
