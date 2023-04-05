
// NEED TO EXPORT PSWD IN BASH
// export mongopswd=XXXXXXXX
// START SERVER WITH
// env node index.js
// FORWARD PORT AS PUBLIC
// gh codespace ports visibility 4000:public -c $CODESPACE_NAME


const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const cors = require('cors');
const app = express();
const User= require('./models/ReactDataSchema')

app.use(express.json());
app.use(cors());

const pswd = process.env.mongopswd;
mongoose.connect(`mongodb://hybridatelier:${pswd}@138.68.230.2:27017/reactdata?authSource=admin`, { useNewUrlParser: true});
var db = mongoose.connection;
app.get('/', (req, res) => {
    res.send('Hello World!')
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