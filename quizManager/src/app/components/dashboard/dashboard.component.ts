import { AuthService } from './../../services/auth.service';
import { User } from './../../models/User';
import { Quiz } from './../../models/Quiz';
import { QuizService } from './../../services/quiz.service';
import { TitleService } from './../../services/title.service';
import { Title } from './../../models/Title';
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
    private titleService: TitleService,
    private quizService: QuizService,
    private authService: AuthService
  ) {}

  allTitles!: Title[];
  allQuizzes!: Quiz[];
  result: any = {};
  titleId!: string;
  show: Array<boolean> = [false, false];
  str: any;
  editor!: any;
  viewer!: any;
  selected: any = false;
  clickedUpdate: any = false;

  newTitle: Title = {
    _id: '',
    title: '',
  };

  updatedTitle: Title = {
    _id: '',
    title: '',
  };

  ngOnInit(): void {
    this.titleService.getTitles().subscribe((allTitles: any[]) => {
      this.allTitles = allTitles;
      console.log(this.allTitles);
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


  createTitle() {
    this.titleService.createTitle(this.newTitle.title).subscribe((res: any) => {
      console.log(res);
      location.reload();
    });
  }

  deleteTitle(id: string) {
    this.titleService.deleteTitle(id).subscribe((res: any) => {
      console.log(res);
      location.reload();
    }); 
  }

  updateTitle() {
    this.titleService.updateTitle(this.titleId, this.updatedTitle.title ).subscribe((res: any) => {
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
