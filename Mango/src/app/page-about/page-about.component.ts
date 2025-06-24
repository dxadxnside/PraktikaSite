import { Component } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../interface/employee.model';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { NgbModalModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-page-about',
  templateUrl: './page-about.component.html',
  styleUrls: ['./page-about.component.css'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, EmployeeFormComponent, NgbModalModule]
})
export class PageAboutComponent {
  employees: Employee[] = [];
  showModal = false;

  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  openRegistrationModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        // Обработка закрытия модального окна
      },
      (reason) => {
        // Обработка отклонения модального окна
      }
    );
  }

  onEmployeeAdded() {
    this.loadEmployees(); // Обновляем список после добавления
  }
}