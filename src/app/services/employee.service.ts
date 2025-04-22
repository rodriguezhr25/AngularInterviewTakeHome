import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees = [
    {
      employeeId: 1,
      firstName: "Jerry",
      lastName: "Wright",
      email: "jw@dvnext.com",
      positionId: "1",
      phoneNumber: "770-543-2333",
      jobRequirements: "Design things",
      address1: "324 Wyles Rd.",
      city: 'Atlanta',
      state: 'GA',
      zip: '30314'
    },
    {
      employeeId: 2,
      firstName: "Amy",
      lastName: "Jones",
      email: "aj@dvnext.com",
      positionId: "4",
      phoneNumber: "770-983-1462",
      jobRequirements: "Manage things",
      address1: "6555 Lincoln Rd.",
      city: 'Atlanta',
      state: 'GA',
      zip: '30303'
    },
    {
      employeeId: 3,
      firstName: "James",
      lastName: "Smith",
      email: "js@dvnext.com",
      positionId: "2",
      phoneNumber: "404-524-1122",
      jobRequirements: "Talk about things",
      address1: "623 Washington Dr.",
      city: 'Atlanta',
      state: 'GA',
      zip: '30317'
    },
    {
      employeeId: 4,
      firstName: "Shannon",
      lastName: "Phillips",
      email: "sp@dvnext.com",
      positionId: "3",
      phoneNumber: "678-231-9924",
      jobRequirements: "Break things",
      address1: "1112 Wade Rd.",
      city: 'Atlanta',
      state: 'GA',
      zip: '30314'
    },
  ]

  constructor() { }

   // Get all employees
   getEmployees(): Employee[] {
    return [...this.employees]; // Return a copy to avoid mutation
  }
 
  // Add a new employee
  addEmployee(employee: Employee): void {
    const newEmployee = { ...employee, employeeId: this.getNextEmployeeId(), positionId: employee.positionId.toString()};
    this.employees.push(newEmployee);
  }

  // Update an existing employee
  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex((e) => e.employeeId === employee.employeeId);
    if (index !== -1) {
      this.employees[index] = employee;
    }
  }

  // Delete an employee by ID
  deleteEmployee(employeeId: number): void {
    this.employees = this.employees.filter(emp => emp.employeeId !== employeeId);
    console.log('Updated Employees:', this.employees); // Debugging log
  }

  
  private getNextEmployeeId(): number {
    return this.employees.length > 0
      ? Math.max(...this.employees.map(emp => emp.employeeId)) + 1
      : 1;
  }

}
