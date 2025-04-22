import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { DataService } from '../../services/data.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent {
  @Input() employees: Employee[] = []; 
  //employees = this.employeeService.getEmployees();
  jobPositions = this.dataService.jobPositions;

  @Output() employeeSelected = new EventEmitter<any>();
  @Output() newEmployee = new EventEmitter<any>();

  constructor(private employeeService: EmployeeService, private dataService: DataService) {}

  selectEmployee(employee: Employee) {
    this.employeeSelected.emit(employee);
  }

  addNewEmployee(){
    this.newEmployee.emit();
  }

  getJobTitle(positionId: string): string {
    const position = this.jobPositions.find(job => job.id.toString() === positionId);
    return position ? position.title : '';
  }
}