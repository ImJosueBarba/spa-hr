import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onLogin(): void {
    // Hacemos la solicitud de login al backend
    this.http.post<{ token: string }>('http://localhost:3000/login', { email: this.email, password: this.password })
      .subscribe(
        (response) => {
          const token = response.token;
          localStorage.setItem('token', token); // Guardamos el token en localStorage
          this.router.navigate(['/empleadoss']); // Redirigimos a la ruta de empleados
        },
        (error) => {
          Swal.fire({
            title: 'Credenciales incorrectas',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
  }
}