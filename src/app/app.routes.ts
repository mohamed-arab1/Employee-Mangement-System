import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/details/:id', component: EmployeeDetailComponent },
  { path: 'employees/form', component: EmployeeFormComponent },
  { path: 'employees/form/:id', component: EmployeeFormComponent }
];
