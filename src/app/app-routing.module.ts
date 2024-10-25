import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { MencionComponent } from './mencion/mencion.component';

const routes: Routes = [
  {path:  'home',component:  HomeComponent},
  {path:  'empleadoss',component:  EmpleadoComponent},
  {path:  'mencion',component:  MencionComponent}];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
