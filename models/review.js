'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let ReviewSchema = new Schema({
   user: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'User' 
    },
   postedOn: { type: Date, default: Date.now },
   rating: {
       type: Number,
       min: 1,
       max: 5
   },
   review: String
});

let Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;