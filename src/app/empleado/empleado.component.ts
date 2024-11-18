import { Component } from '@angular/core';
import { EmpleadoService } from '../../services/empleados.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {
  empleados: any[] = [];
  trabajos: any[] = [];
  managers: any[] = [];
  departamentos: any[] = [];
  
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

  username: string = '';
  password: string = '';
  showLogin: boolean = true;  // Controla si se debe mostrar el formulario de login
  error: string | null = null; // Para mostrar el error si las credenciales son incorrectas
  loading: boolean = false;  // Para controlar el estado de carga durante el login

  constructor(
    private employeeService: EmpleadoService,
    private http: HttpClient,
    private router: Router  // Inyecta Router para la redirección
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      return;
    } else {
      this.cargarEmpleados();
      this.cargarTrabajos();
      this.cargarManagers();
      this.cargarDepartamentos();
    }
  }
  cargarEmpleados(): void {
    this.employeeService.getEmpleados().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.empleados = data;
      },
      (error) => {
        console.error('Error al cargar empleados:', error);
        if (error.status === 401 || error.status === 403) {
          Swal.fire('Error', 'No autorizado, por favor inicia sesión nuevamente.', 'error');
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      }
    );
  }
  
  cargarTrabajos(): void {
    this.employeeService.getJobs().subscribe(
      (data) => {
        this.trabajos = data;
      },
      (error) => {
        console.error('Error al cargar trabajos', error);
      }
    );
  }

  cargarManagers(): void {
    this.employeeService.getManagers().subscribe(
      (data) => {
        this.managers = data;
      },
      (error) => {
        console.error('Error al cargar managers', error);
      }
    );
  }

  // Cargar departamentos
  cargarDepartamentos(): void {
    this.employeeService.getDepartments().subscribe(
      (data) => {
        this.departamentos = data;
      },
      (error) => {
        console.error('Error al cargar departamentos', error);
      }
    );
  }

  // Guardar un nuevo empleado
  onSubmit(): void {
    this.employeeService.addEmpleado(this.empleado).subscribe(
      (data) => {
        this.empleados.push(data);
        this.resetForm();
        Swal.fire({
          title: 'Empleado Guardado',
          text: 'El empleado se ha guardado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      (error) => {
        console.error('Error al agregar empleado', error);
      }
    );
  }

  // Actualizar un empleado
  onUpdate(): void {
    this.employeeService.updateEmpleado(this.empleado).subscribe(
      (data) => {
        this.cargarEmpleados();
        Swal.fire({
          title: 'Empleado Actualizado',
          text: 'El empleado ha sido actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      (error) => {
        console.error('Error al actualizar empleado', error);
      }
    );
  }

  // Eliminar un empleado
  onDelete(): void {
    this.employeeService.deleteEmpleado(this.empleado.employee_id).subscribe(
      (data) => {
        this.cargarEmpleados();
        Swal.fire({
          title: 'Empleado Eliminado',
          text: 'El empleado ha sido eliminado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      (error) => {
        console.error('Error al eliminar empleado', error);
      }
    );
  }

  // Confirmar actualización
  confirmUpdate() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción actualizará los datos del empleado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onUpdate();
      }
    });
  }

  // Confirmar eliminación
  confirmDelete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción eliminará al empleado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDelete();
      }
    });
  }

  // Resetear el formulario
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