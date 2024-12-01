import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { AddCarComponent } from './add-car/add-car.component';
import { UpdateCarComponent } from './update-car/update-car.component';
import { LoginComponent } from './login/login.component';
import { CarGuard } from './car.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SearchByMakerComponent } from './Search-by-maker/Search-by-maker.component';
import { SearchByNameComponent } from './Search-by-name/Search-by-name.component';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'cars', component: CarsComponent },
  { path: 'add-car', component: AddCarComponent, canActivate: [CarGuard] },
  { path: 'updatecar/:id', component: UpdateCarComponent, canActivate: [CarGuard] },
  { path: 'search-by-maker', component: SearchByMakerComponent },
  { path: 'search-by-name', component: SearchByNameComponent },
  { path: 'login', component: LoginComponent },
  { path: 'app-forbidden', component: ForbiddenComponent },
  {path:'register',component:RegisterComponent},
  { path: 'verifEmail', component: VerifEmailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
