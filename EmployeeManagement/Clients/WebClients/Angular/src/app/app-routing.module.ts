import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './employee/list/list.component';
import { AddeditComponent } from './employee/addedit/addedit.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'employee/add', component: AddeditComponent },
  { path: 'employee/edit/:id', component: AddeditComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }