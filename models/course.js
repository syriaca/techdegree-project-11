'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CourseSchema = new Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
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
            ref: 'Review'
        }
    ]
});

let Course = mongoose.model('Course', CourseSchema);

module.exports = Course;