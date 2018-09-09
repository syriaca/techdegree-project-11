'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let reviewSchema = new Schema({
   user: {
       type: mongoose.Schema.Types.ObjectId, 
       ref: 'user' 
    },
   postedOn: { type: Date, default: Date.now },
   rating: {
       type: Number,
       min: 1,
       max: 5
   },
   review: String
});

let Review = mongoose.model('review', reviewSchema);
module.exports = Review;