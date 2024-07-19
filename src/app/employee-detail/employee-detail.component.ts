import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../model/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent {

  employee: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe(data => {
        this.employee = data;
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

}
