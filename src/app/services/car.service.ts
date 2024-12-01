import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Car } from '../model/car.model';
import { Maker } from '../model/maker.model';
import { Image } from '../model/Image.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CarService {
  // apiURL: string = 'http://localhost:8090/Cars/api';
  apiURL: string = 'http://localhost:8089/Cars/api';
  apiURLTyp : string =this.apiURL+'/mkr';
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper function to get JWT token and create headers
  private createAuthHeaders(): HttpHeaders {
    let jwt = this.authService.getToken();
    if (jwt) {
      return new HttpHeaders({
        Authorization: 'Bearer ' + jwt,
        'Content-Type': 'application/json',
      });
    } else {
      console.error('JWT token is undefined');
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
  }

  listeCars(): Observable<Car[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.get<Car[]>(this.apiURL + '/all', { headers: httpHeaders });
  }

  addCar(c: Car): Observable<Car> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.post<Car>(this.apiURL + '/add-car', c, {
      headers: httpHeaders,
    });
  }

  supprimerCar(id: number): Observable<void> {
    const url = `${this.apiURL}/delcar/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.delete<void>(url, { headers: httpHeaders });
  }

  consulterCar(id: number): Observable<Car> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.get<Car>(url, { headers: httpHeaders });
  }

  updateCar(c: Car): Observable<Car> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.put<Car>(this.apiURL + '/updatecar', c, {
      headers: httpHeaders,
    });
  }

  listemakers(): Observable<Maker[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.get<Maker[]>(this.apiURLTyp, { headers: httpHeaders });
  }

  rechercherParMaker(idmake: number): Observable<Car[]> {
    const url = `${this.apiURL}/CarsbyMaker/${idmake}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.get<Car[]>(url, { headers: httpHeaders });
  }

  rechercherParNom(nom: string): Observable<Car[]> {
    const url = `${this.apiURL}/carByNodel/${nom}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.get<Car[]>(url, { headers: httpHeaders });
  }

  ajouterType(mak: Maker): Observable<Maker> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.post<Maker>(this.apiURLTyp, mak, { headers: httpHeaders });
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }
  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  supprimerImage(id: number): Observable<void> {
    const url = `${this.apiURL + '/image/delete'}/${id}`;
    return this.http.delete<void>(url);
  }

  uploadImageCar(file: File, filename: string, idCar: number): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename); // Add the file with the specified filename
    const url = `${this.apiURL}/image/uploadImageCar/${idCar}`; // Construct the endpoint URL
    return this.http.post<Image>(url, imageFormData); // Return the HTTP POST Observable
  }  
  

}
