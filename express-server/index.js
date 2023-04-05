
// NEED TO EXPORT PSWD IN BASH
// export mongopswd=XXXXXXXX
// RUN
// npm run devStart
// FORWARD PORT
//gh codespace ports visibility 4000:public -c $CODESPACE_NAME


const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const cors = require('cors');
const app = express();
const User= require('./models/ReactDataSchema')
const SolderStory= require('./models/ReactDataSchema')

app.use(express.json());
app.use(cors());

const pswd = process.env.mongopswd;
console.log("ENV", pswd)
mongoose.connect(`mongodb://hybridatelier:${pswd}@138.68.230.2:27017/stories?authSource=admin`, { useNewUrlParser: true});
var db = mongoose.connection;

app.get('/', (req, res) => {
    SolderStory.find({}, (err, docs)=>{
        if(err){console.log(err)}
        else{
            console.log(docs)
            res.json({ documents: docs })
        }
    })
})

app.post('/insert', async(req, res) => {
    const FirstName = req.body.firstName
    const CompanyRole = req.body.companyRole
    console.log(FirstName, CompanyRole)

    const formData  =  new User(
        {
            name: FirstName,
            role: CompanyRole
        }
    )
    try{
     
        await formData.save();
        res.send("inserted data..")

    } catch(err){
        console.log(err)
    }
  });

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});