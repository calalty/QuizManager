const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
    questionId: {
        type: Number, 
        unique: true, 
        min: 1
      },
    description: String,
    answers: [{ option: String, correct: Boolean }],
    _titleId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
})

QuizSchema.plugin(AutoIncrement, {inc_field: 'questionId'});
module.exports = mongoose.model("Quiz", QuizSchema);