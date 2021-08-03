
import { UpdateQuizComponent } from './components/update-quiz/update-quiz.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard/:id', component: DashboardComponent},
  {path: 'dashboard/:id/createquiz', component: CreateQuizComponent},
  {path: 'dashboard/:id/patchquiz', component: UpdateQuizComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
