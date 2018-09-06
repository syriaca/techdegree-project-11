'use strict';

let mongoose = require('mongoose');
let user = require('./user.js');
let review = require('./review.js');

let Schema = mongoose.Schema;

let courseSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    estimatedTime: String,
    materialsNeeded: String,
    steps: 
        [
            {
                stepNumber: Number,
                title: {
                    type: String,
                    required: true
                },
                description: {
                    type: String,
                    required: true
                }
            }
        ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'review'
        }
    ]
});

let Course = mongoose.model('course', courseSchema);
module.exports = Course;