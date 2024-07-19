import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'https://task-dot-fe-task-428108.uc.r.appspot.com/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('https://task-dot-fe-task-428108.uc.r.appspot.com/employees');
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Employee>(this.apiUrl, employee, { headers });
  }

  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee, { headers });
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
