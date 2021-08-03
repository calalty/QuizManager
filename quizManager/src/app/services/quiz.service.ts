import { Observable } from 'rxjs';
import { Quiz } from './../models/Quiz';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient, private router: Router) { 
  }

  getQuizzes(id: string) {
    return this.http.get<Quiz[]>(`/api/findquizzes/${id}`, {
    })
  }

  getQuiz(id:string) {
   return this.http.get<any>(`/api/findquiz/${id}`, {
  })
}

  createQuiz(description: string, answers: object, id: string) {
    return this.http.post<any>(`/api/createquiz/${id}`, {
      description,
      answers
    })
  }

  deleteQuiz(id: any) {
    return this.http.delete<any>(`api/deletequiz/${id}`, {

    })
  }

  patchQuiz(id: string, description: string, answers:object) {
    return this.http.patch<any>(`api/patchquiz/${id}`, {
      description,
      answers
    })
  }
}
