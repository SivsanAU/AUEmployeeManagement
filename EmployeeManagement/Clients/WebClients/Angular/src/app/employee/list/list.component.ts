import { Component, OnInit } from '@angular/core';

import { EmpService } from '../../_services/emp.service';
import { Emp } from '../../_models/Emp';
import { first } from 'rxjs';
import {SlicePipe} from '../../slice.pipe'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone:true,
  imports:[CommonModule,SlicePipe,RouterModule]
})
export class ListComponent implements OnInit {

  employees!: Emp[];
  totalrow: number = 0;

  constructor(private empService: EmpService,) { }

  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee() {
    this.empService.getAll().pipe(first())
      .subscribe(d => {
        this.employees = d;
        this.totalrow = d.length;
      });
  }


  delete(emp: Emp) {
    this.empService.delete(emp.empId).pipe(first())
      .subscribe(() => {
        this.loadEmployee();
      })
  }
}