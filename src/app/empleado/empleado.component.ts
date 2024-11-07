import { Component } from '@angular/core';
import { EmpleadoService } from '../../services/empleados.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {
  empleados: any[] = [];
    empleado = {
    employee_id: '',
    first_name: '',
    second_name: '',
    salary: '',
    commission_pct: '',
    last_name: '',
    email: '',
    phone_number: '',
    hire_date: '',
    manager_id: '',
    department_id: '',
    job_id: ''
  };

  constructor(private employeeService: EmpleadoService) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.employeeService.getEmpleados().subscribe(
      (data) => {
        this.empleados = data;
      },
      (error) => {
        console.error('Error al cargar empleados', error);
      }
    );
  }

  onSubmit(): void {
    // Lógica para guardar un nuevo empleado
    this.employeeService.addEmpleado(this.empleado).subscribe(
      (data) => {
        this.empleados.push(data); // Agregar el nuevo empleado a la lista
        this.resetForm();
      },
      (error) => {
        console.error('Error al agregar empleado', error);
      }
    );
  }

  onUpdate(): void {
    // Lógica para actualizar un empleado existente
    this.employeeService.updateEmpleado(this.empleado).subscribe(
      (data) => {
        this.cargarEmpleados(); // Recargar la lista de empleados
      },
      (error) => {
        console.error('Error al actualizar empleado', error);
      }
    );
  }

  onDelete(): void {
    //Eliminar un empleado existente
    this.employeeService.deleteEmpleado(this.empleado.employee_id).subscribe(
      (data) => {
        this.cargarEmpleados(); // Recargar la lista de empleados
      },
      (error) => {
        console.error('Error al eliminar empleado', error);
      }
    );
  }

  resetForm(): void {
    this.empleado = {
    employee_id: '',
    first_name: '',
    second_name: '',
    salary: '',
    commission_pct: '',
    last_name: '',
    email: '',
    phone_number: '',
    hire_date: '',
    manager_id: '',
    department_id: '',
    job_id: ''
    };
  }


}
