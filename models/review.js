'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reviewSchema = new Schema({
   user: [{ type: Schema.Types.ObjectId, ref: 'users' }],
   postedOn: { type: Date, default: Date.now },
   rating: {
       type: Number,
       min: 1,
       max: 5
   },
   review: String
});

let Review = mongoose.model('Review', reviewSchema);
module.exports = Review;