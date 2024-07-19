import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../model/employee.model';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm: FormGroup;
  employee: Employee = new Employee();
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]]
    });
  }

  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeService.getEmployeeById(id).subscribe(data => {
        this.employee = data;
      });
    }
  }


  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }

    const employee: Employee = this.employeeForm.value;
    if (this.isEditMode && this.employee._id) {
      this.employeeService.updateEmployee(this.employee._id, employee).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    } else {
      this.employeeService.createEmployee(employee).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
