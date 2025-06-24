import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  @Output() employeeAdded = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  formData = {
    name: '',
    phone: '',
    email: '',
    birth_date: ''
  };

  constructor(private employeeService: EmployeeService) {}

  onSubmit() {
    this.employeeService.addEmployee(this.formData).subscribe({
      next: () => {
        this.employeeAdded.emit();
        this.closeModal.emit();
        this.resetForm();
      },
      error: (err) => console.error('Error adding employee:', err)
    });
  }

  resetForm() {
    this.formData = {
      name: '',
      phone: '',
      email: '',
      birth_date: ''
    };
  }
}