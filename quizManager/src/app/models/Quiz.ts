

export class Quiz {
    questionId!: number;
    _id!: string;
    _titleId!: string;
    description!: string;
    answers!: [{option: string, correct: true | false}, {option: string, correct: true | false},  {option: string, correct: true | false} ]
  } 
  