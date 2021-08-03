import { Observable } from 'rxjs';
import { Topic } from './../models/Topic';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  
  constructor(private http: HttpClient, private router: Router) { 
  }

  getTopics() {
    return this.http.get<Topic[]>('/api/findtopics', {

    })
  }

  getTopic(id: string) {
    return this.http.get<Topic>(`/api/findtopic/${id}`, {

    })
  }

  createTopic(topic: string) {
    return this.http.post<Topic[]>('/api/createtopic', {
      topic
    })
  }

  deleteTopic(id: string)  {
    return this.http.delete<any>(`/api/deletetopic/${id}`)
  }

  updateTopic(id: string, topic: string)  {
    return this.http.patch<any>(`/api/patchtopic/${id}`,{
    topic
    })
  }
}
