const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  topic: String,
})

module.exports = mongoose.model("Topic", TopicSchema); 