import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService : EmployeeService,
    private router: Router) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
    });
  }

  updateEmployee(id: number) {
  this.router.navigate(['update-employee', id]);
    console.log(`update employee with id: ${id}`);
  }

  deleteEmployee(id: number) {
    console.log(`delete employee with id: ${id}`);
    this.employeeService.deleteEmployee(id).subscribe(data => {
      this.getEmployees();
    });
  }
}
