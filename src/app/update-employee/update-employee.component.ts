import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {
  employee: Employee = new Employee('','','', '');
  id : number = 1;

  constructor(private employeeService: EmployeeService, 
    private route: ActivatedRoute,
    private router: Router) { 
      this.id = this.route.snapshot.params['id'];
    
   }

  ngOnInit() {
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    });
  }

  onSubmit() {
    console.log('submit');
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(data => {
      this.employee = data;
      this.returnToEmployeeList();
    });
  }

  returnToEmployeeList() {
  this.router.navigate(['/employees']);
}


}
