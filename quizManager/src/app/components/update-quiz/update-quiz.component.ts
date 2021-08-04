import {
  FormControl,
} from '@angular/forms';
import { Quiz } from './../../models/Quiz';
import { QuizService } from './../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss'],
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router,
  ) {}

  quizId!: string;
  msg!: string;
  isDisabled: boolean = false;
  oldQuiz!: Quiz[];
  question!: Quiz[];
  resetAll = new FormControl();

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.quizId = params.id;
    });
    this.getQuiz();
    this.msg = 'Update your Quiz!';
    this.isDisabled = true;
  }

  getQuiz() {
    this.quizService.getQuiz(this.quizId).subscribe((quiz) => {
      this.oldQuiz = quiz;
      console.log(quiz);
    });
  }

  updateQuiz() {
    for (let q of this.oldQuiz) {
      this.quizService
        .patchQuiz(this.quizId, q.description, q.answers)
        .subscribe((newQuiz: Quiz) => {
          this.router.navigate(['../'], { relativeTo: this.route });
        });
    }
  }

  addOption() {
    for (let answers of this.oldQuiz) {
      if (answers.answers.length < 5) {
        answers.answers.push(this.add());
      } else {
        this.msg = 'You cannot add more than 5 options!';
      }
    }
  }

  add() {
    return {
      option: '',
      correct: false,
    };
  }

  deleteOption(i: any) {
    for (let answers of this.oldQuiz) {
      if (answers.answers.length > 3) {
        answers.answers.splice(i, 1);
      } else {
        this.msg = 'You cannot delete more than 3 options!';
      }
    }
  }

  onChange(change: any) {
    this.isDisabled = true;
    this.msg = "Click 'Reset' to change the correct answer";
  }

  reset(event: any) {
    for (let answer of this.oldQuiz) {
      for (let a of answer.answers) {
        this.resetAll.setValue((a.correct = false));
      }
    }
    this.resetAll.setValue((this.isDisabled = false));
    this.resetAll.markAllAsTouched();
  }
}
