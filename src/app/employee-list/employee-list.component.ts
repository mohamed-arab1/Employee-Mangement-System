import { Component, inject, OnInit  } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../model/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit  {
  employees : Employee[] = []
  employeeService = inject(EmployeeService);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
      console.log(this.employees)
    })
  }



  viewEmployee(id: string): void {
    this.router.navigate(['/employees/details', id]);
  }

  editEmployee(id: string): void {
    this.router.navigate(['/employees/form', id]);
  }

  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter(emp => emp._id !== id);
    });
  }

  goToForm(): void {
    this.router.navigate(['/employees/form']);
  }
}
