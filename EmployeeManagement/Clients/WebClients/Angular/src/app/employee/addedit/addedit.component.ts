import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpService } from '../../_services/emp.service';

@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css'],
  standalone:false

})
export class AddeditComponent implements OnInit {

  formadd!: FormGroup;
  id!: string;
  loading = false;
  submitted = false;
  btnText: string = "Save";
  title: string = "New Employee";

  constructor(private formBuilder: FormBuilder,private empService: EmpService,private router: Router,private route: ActivatedRoute) 
  {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id !=null) {
      this.loadData();
      this.btnText = "Update";
      this.title = "Edit Employee";
    }

    this.formadd = this.formBuilder.group({
      empId: 0,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formadd.controls; }

  loadData() {
    this.empService.getById(this.id).subscribe(x => this.formadd.patchValue(x))
  }

  onSubmit() {
debugger;
    this.submitted = true;

    // stop here if form is invalid
    if (this.formadd.invalid) {
      debugger;
      return;
    }

    this.loading = true;

    if (this.id!==undefined && (this.id !=="3fa85f64-5717-4562-b3fc-2c963f66afa6")) {
      debugger;
      this.empService.update(this.formadd.value)
        .subscribe(
          d => {
            debugger;
            this.btnCancel();
          })
    }
    else {
      debugger;

      this.empService.create(this.formadd.value)
        .subscribe(
          d => {
            debugger;
            this.btnCancel();
          });
    }
  }

  btnCancel() {
    this.router.navigate([''])
  }
}