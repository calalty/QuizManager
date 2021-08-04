
import { Title } from './../models/Title';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  
  constructor(private http: HttpClient, private router: Router) { 
  }

  getTitles() {
    return this.http.get<Title[]>('/api/findtitles', {

    })
  }

  getTitle(id: string) {
    return this.http.get<Title>(`/api/findtitle/${id}`, {

    })
  }

  createTitle(title: string) {
    return this.http.post<Title[]>('/api/createtitle', {
      title
    })
  }

  deleteTitle(id: string)  {
    return this.http.delete<any>(`/api/deletetitle/${id}`)
  }

  updateTitle(id: string, title: string)  {
    return this.http.patch<any>(`/api/patchtitle/${id}`,{
    title
    })
  }
}
