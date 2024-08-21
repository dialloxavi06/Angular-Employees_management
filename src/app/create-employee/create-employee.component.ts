import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Employee } from '../employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = new Employee('','','','');

  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.employee);
    this.createEmployee(this.employee);
  }

  createEmployee(employee: Employee) {

    this.employeeService.createEmployee(employee).subscribe(data => {
      console.log(data);
      this.returnToEmployeeList();
    }, error => console.log(error));
}

updateEmployee() {
}

returnToEmployeeList() {
  this.router.navigate(['/employees']);
}

  
  }
