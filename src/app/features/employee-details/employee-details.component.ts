import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnChanges {
  @Input() employee!: Employee; 
  @Output() employeeSaved = new EventEmitter<Employee>();
  @Output() employeeDeleted = new EventEmitter<number>();

  jobPositions = this.dataService.jobPositions; 
  states = this.dataService.allStates; 
  constructor(private dataService: DataService) {}

  ngOnChanges() {
    if (this.employee) {
      this.employee.positionId = this.employee.positionId ? String(this.employee.positionId): '0' ;
    }
  }

  saveEmployee() {
    this.employeeSaved.emit(this.employee); 
  }

  deleteEmployee() {
    this.employeeDeleted.emit(this.employee.employeeId); 
  }
}