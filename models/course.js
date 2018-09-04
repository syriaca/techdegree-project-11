var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    user: {
        // _id from the users collection
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
    reviews:
        {
           // Array of ObjectId values, _id values from the reviews collection
        }  
});

var Course = mongoose.model('Course', courseSchema);
module.exports = Course;