import { AuthService } from './../../services/auth.service';
import { Quiz } from './../../models/Quiz';
import { QuizService } from './../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router,
    private authService: AuthService
  ) {}

  titleId!: string;
  quizCreated!: any;
  msg!: string;
  isDisabled: boolean = false;
  resetAll = new FormControl();

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.titleId = params.id;
    });
    this.msg = 'Create your Quiz!';
    if (this.authService.loggedInUser()) {
      this.authService.loggedInUser().subscribe((user: any) => {
        if (user.role !== 'editor') {
          this.router.navigate(['dashboard']);
        }
      });
    }
  }
  

  newQuiz: Quiz = {
    questionId: 0,
    _id: '',
    _titleId: '',
    description: '',
    answers: [
      {
        option: '',
        correct: false,
      },
      {
        option: '',
        correct: false,
      },
      {
        option: '',
        correct: false,
      },
    ],
  };

  createQuiz() {
    this.quizService
      .createQuiz(this.newQuiz.description, this.newQuiz.answers, this.titleId)
      .subscribe((newQuiz: Quiz) => {
        this.router.navigate(['dashboard']);
      });
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  addOption() {
    if (this.newQuiz.answers.length < 5) {
      this.newQuiz.answers.push(this.add());
    } else {
      this.msg = 'You cannot add more than 5!';
    }
  }

  deleteOption(i: any) {
    if (this.newQuiz.answers.length > 3) {
      this.newQuiz.answers.splice(i, 1);
    } else {
      this.msg = 'You cannot delete more than 3!';
    }
  }
  add() {
    return {
      option: '',
      correct: false,
    };
  }

  onChange(change: any) {
    this.isDisabled = true;
    this.msg = "Click 'Reset' to change the correct answer";
  }

  reset(event: any) {
    for (let a of this.newQuiz.answers) {
      this.resetAll.setValue((a.correct = false));
      this.resetAll.setValue((this.isDisabled = false));
      this.resetAll.markAllAsTouched();
    }
  }
}
