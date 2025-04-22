import { Component } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent {
  employees: Employee[] = [];
  selectedEmployee!: Employee;
  hasSelectedEmployee: boolean = false;

  constructor(private employeeService: EmployeeService,private dialog: MatDialog) {
    this.loadEmployees();
  }

  private loadEmployees(): void {
    this.employees = this.employeeService.getEmployees();
    console.log('Employees Loaded:', this.employees); // Debugging log
  }

  onEmployeeSaved(employee: Employee): void {
    if (employee.employeeId) {
      // Find the index of the original employee and update it
      const index = this.employees.findIndex((e) => e.employeeId === employee.employeeId);
      if (index !== -1) {
        this.employees[index] = { ...employee }; // Update with the new changes
      }
      this.employeeService.updateEmployee(employee); // Update in the service
    } else {
      // Add new employee if it doesn't exist
      this.employeeService.addEmployee(employee);

      this.loadEmployees(); // Refresh the list
    }

    
      this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: {
          title: 'Success',
          message: 'The employee record has been saved successfully.',
          actionButton: 'OK',
          showCancel: false, // No cancel button for "Save Successful"
        },
      });
  }

  onEmployeeDeleted(employeeId: number): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this employee record?',
        actionButton: 'Delete',
        showCancel: true,
      },
    });

   
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeService.deleteEmployee(employeeId);
        this.loadEmployees(); 
        this.selectedEmployee = {} as Employee; 
        this.hasSelectedEmployee = false;
      } 
    });
    
  }

  // Select an employee for editing
  onEmployeeSelected(employee: Employee): void {
    this.selectedEmployee = { ...employee }; 
    this.hasSelectedEmployee = true;
  }

  onNewEmployee(): void {
    this.selectedEmployee = {} as Employee; 
    this.hasSelectedEmployee = true;
  }
}