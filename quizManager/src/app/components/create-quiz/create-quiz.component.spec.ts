import { QuizService } from './../../services/quiz.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuizComponent } from './create-quiz.component';

describe('CreateQuizComponent', () => {
  let component: CreateQuizComponent;
  let fixture: ComponentFixture<CreateQuizComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ CreateQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should create quiz', () => {
    const quizService: QuizService = TestBed.inject(QuizService)
    let decription = 'test'
    let answers = [
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
    ]
    let titleId = ''
    quizService.createQuiz(decription, answers, titleId).subscribe(data => {
      expect(data).toBeTruthy()
      expect(router.navigate(['dashboard']))
    })
  })
});
