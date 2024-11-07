// empleado.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los empleados
  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para agregar un nuevo empleado
  addEmpleado(empleado: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, empleado);
  }

  // Método para actualizar un empleado
  updateEmpleado(empleado: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${empleado.employee_id}`, empleado);
  }

  // Método para eliminar un empleado
  deleteEmpleado(employeeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${employeeId}`);
  }
}
