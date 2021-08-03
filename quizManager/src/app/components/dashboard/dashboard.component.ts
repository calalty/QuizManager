import { AuthService } from './../../services/auth.service';
import { User } from './../../models/User';
import { Quiz } from './../../models/Quiz';
import { QuizService } from './../../services/quiz.service';
import { TopicService } from './../../services/topic.service';
import { Topic } from './../../models/Topic';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private topicService: TopicService,
    private quizService: QuizService,
    private authService: AuthService
  ) {}

  allTopics!: Topic[];
  allQuizzes!: Quiz[];
  result: any = {};
  titleId!: string;
  show: Array<boolean> = [false, false];
  str: any;
  editor!: any;
  viewer!: any;
  selected: any = false;
  clickedUpdate: any = false;

  newTopic: Topic = {
    _id: '',
    topic: '',
  };

  updatedTopic: Topic = {
    _id: '',
    topic: '',
  };

  ngOnInit(): void {
    this.topicService.getTopics().subscribe((allTopics) => {
      this.allTopics = allTopics;
      console.log(this.allTopics);
    });
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.titleId = params.id
        this.quizService.getQuizzes(params.id).subscribe((allQuizzes) => {
          this.allQuizzes = allQuizzes;
        });
      }
    });
    this.authService.loggedInUser().subscribe((user: any) => {
      this.editor = user.role === 'editor';
      this.viewer = user.role === 'viewer';
    });
    this.str = new String('ABCDE');
  }

  showAnswers(index: number): void {
    this.show[index] = !this.show[index];
    let quizzes = this.allQuizzes[index];
    console.log(quizzes);
  }


  createTopic() {
    this.topicService.createTopic(this.newTopic.topic).subscribe((res) => {
      console.log(res);
      location.reload();
    });
  }

  deleteTopic(id: string) {
    this.topicService.deleteTopic(id).subscribe((res) => {
      console.log(res);
      location.reload();
    });
  }

  updateTopic() {
    this.topicService.updateTopic(this.titleId, this.updatedTopic.topic ).subscribe((res) => {
      console.log(res);
      location.reload();
    })
  }

  deleteQuiz(id: string) {
    this.quizService.deleteQuiz(id).subscribe((res) => {
      console.log(res);
      location.reload();
    });
  }
  deleteOption(i: any) {
    for (let all of this.allQuizzes) {
        if (all.answers.length > 3) {
          let result = all.answers.splice(i, 1)
          console.log(result);
        }
    }
  }

}
