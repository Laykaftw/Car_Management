import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Car } from '../model/car.model';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './Search-by-name.component.html',
  styleUrls: [],
})
export class SearchByNameComponent implements OnInit {
  cars: Car[] = [];  // Cars to be displayed
  allCars: Car[] = [];  // Full list of cars
  searchTerm: string = '';  // Search term for filtering

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    // Load all cars on component initialization
    this.loadAllCars();
  }

  // Method to load all cars from the service
  private loadAllCars(): void {
    this.carService.listeCars().subscribe((cars) => {
      this.allCars = cars;  // Store the full list
      this.cars = [...this.allCars];  // Initialize the displayed list
    });
  }

  // Method to handle search input changes
  onKeyUp(filterText: string) {
    // Filter the cars based on the search term (car model)
    this.cars = this.allCars.filter((car) =>
      car.carModel?.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}
