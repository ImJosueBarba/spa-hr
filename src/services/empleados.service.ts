// empleado.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token'); 
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders(); 
  }

  getEmpleados(): Observable<any> {
    const headers = this.getAuthHeaders(); 
    return this.http.get(this.apiUrl, { headers }); 
  }

  getJobs(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get('http://localhost:3000/api/jobs', { headers });
  }

  getManagers(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get('http://localhost:3000/api/managers', { headers });
  }

  getDepartments(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get('http://localhost:3000/api/departments', { headers });
  }

  addEmpleado(empleado: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(this.apiUrl, empleado, { headers });
  }

  updateEmpleado(empleado: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${empleado.employee_id}`, empleado, { headers });
  }

  deleteEmpleado(employeeId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${employeeId}`, { headers });
  }
}