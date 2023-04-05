

const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});
const ReactStoryDataSchema = new mongoose.Schema({
        prompt : {
            type: String,
            required: false
        },
        response : 
        {
            type: String,
            required: false
        },
        style : {
            type: String,
            required: false
        },
        audience: {
            type: String,
            required: false
        },
        word_count : {
            type: Number,
            required: false
        },
        ontological_relations : {
            type: Boolean,
            required: false
        }
    });



const User = mongoose.model('User', ReactFormDataSchema);

const SolderStory = mongoose.model('solderingstories', ReactStoryDataSchema);

module.exports = User;
module.exports = SolderStory;