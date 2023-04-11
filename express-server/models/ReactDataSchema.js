

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

const PromptDataSchema = new mongoose.Schema({
        story_label : {
            type: String,
            required: false
        }, 

        interpretations : {
            type: String,
            required: false
        },
        ontological_relations : 
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
        character: {
            type: String,
            required: false
        },
        word_count : {
            type: Number,
            required: false
        },
        response : 
        {
            type: String,
            required: false
        }
    });


const User = mongoose.model('User', ReactFormDataSchema);
const SolderStory = mongoose.model('solderingstories', ReactStoryDataSchema);
const SolderPrompt = mongoose.model('solderingprompts', PromptDataSchema);
module.exports = {
    SolderPrompt,
    SolderStory
}
// module.exports = User;
// module.exports = SolderPrompt;
// module.exports = SolderStory;