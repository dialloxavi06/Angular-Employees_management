import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'https://127.0.0.1:8000/api/v1/employee';

  constructor() { }

  // The getEmployeesList() method sends a GET request to the API to fetch the list of employees.
  getEmployeesList(): Observable<Employee[]> {
    return new Observable<Employee[]>((observer) => {
      fetch(this.baseUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // The createEmployee() method sends a POST request to the API to create a new employee.

  createEmployee(employee: Employee): Observable<Employee> {
    return new Observable<Employee>((observer) => {
      fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // The getEmployeeById() method sends a GET request to the API to fetch an employee by ID.
  getEmployeeById(id: number): Observable<Employee> {
    return new Observable<Employee>((observer) => {
      fetch(`${this.baseUrl}/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // The updateEmployee() method sends a PUT request to the API to update an employee.

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return new Observable<Employee>((observer) => {
      fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });

  }

  // The deleteEmployee() method sends a DELETE request to the API to delete an employee.

  deleteEmployee(id: number): Observable<any> {
    return new Observable<any>((observer) => {
      fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  uploadPhoto(imageData: string): Observable<{ url: string }> {
    return new Observable<{ url: string }>((observer) => {
      fetch(`${this.baseUrl}/upload-photo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageData })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

  // Méthode pour récupérer les photos existantes
  getPhotos(): Observable<Array<{ url: string }>> {
    return new Observable<Array<{ url: string }>>((observer) => {
      fetch(`${this.baseUrl}/uploads/photos`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
  
}

