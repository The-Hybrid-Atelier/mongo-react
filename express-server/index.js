
// NEED TO EXPORT PSWD IN BASH
// export mongopswd=XXXXXXXX
// RUN
// npm run devStart
// FORWARD PORT
//gh codespace ports visibility 4000:public -c $CODESPACE_NAME


const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    organization: "org-3tPFpUkMfDemZcMgQfskdnXC",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const cors = require('cors');
const app = express();
const User= require('./models/ReactDataSchema')
const SolderStory= require('./models/ReactDataSchema')

app.use(express.json());
app.use(cors());


const pswd = process.env.mongopswd;
mongoose.connect(`mongodb://hybridatelier:${pswd}@138.68.230.2:27017/stories?authSource=admin`, { useNewUrlParser: true});
var db = mongoose.connection;
app.get('/', (req, res) => {
    // res.header("Access-Control-Allow-Origin", "https://shreyosiendow-obscure-broccoli-9q95j75r67v3pjvp-3000.preview.app.github.dev/");
    SolderStory.SolderPrompt.find({}, (err, docs)=>{
        if(err){console.log(err)}
        else{
            console.log(docs)
            res.json({ documents: docs })
        }
    })

})

app.post('/insert', async(req, res) => {
    const data = req.body.data
    const result = req.body.formatprompt
    try{
        // await formData.save();
        // res.send("inserted data..")
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: result,
            max_tokens: 500,
            temperature: 0,
        });
        res.json({text:response.data.choices[0].text})
        console.log(data)
        data["response"] = response.data.choices[0].text
        console.log("data", data)
        //try loop
        const formData  =  new SolderStory.SolderPrompt(data)
        console.log(formData)
        await formData.save();

    } catch(err){
        console.log(err)
    }
 


  });
//move to /insert in future
// app.post('/openai', async(req, res) => {
//     const data = req.body.data
//     console.log("OPENAI", data)
//     const response = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: data,
//         max_tokens: 200,
//         temperature: 0,
//     });

//     console.log(response.data.choices[0].text)

//   });



const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});