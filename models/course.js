'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let courseSchema = new Schema({
    user: [{ type: Schema.Types.ObjectId, ref: 'users' }],
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
            _id: [
                    { 
                        type: Schema.Types.ObjectId, 
                        ref: 'reviews'
                    }
                ]
        }
    ]
});

let Course = mongoose.model('Course', courseSchema);
module.exports = Course;