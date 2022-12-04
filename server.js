const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const MySchema = require('./src/models/mySchema');
require('./src/db/conn');
const mongoose = require('mongoose');
const attSchema = require('./src/models/AttCheck');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('hello world');
})


//* incert Many *successfully
app.post('/att', async (req, res) => {
    const data = attSchema({
        RegID: req.body.red,
        Name: req.body.Name,
        Email: req.body.Email,
        Total: req.body.Total,
        Warnings: req.body.Warnings
    })


    attSchema.insertMany(req.body).then((data) => {
        res.status(200).send(data).catch((err) => {
            res.status(500).send(err);
        })

    })

});


// get all *successfully
app.get('/att', async (req, res) => {

    try {
        const rollNo = req.params.RegID;

        const users = await attSchema.find();
        res.send(users);
    } catch (err) { throw err }
});

// get sepecific *successfully
app.get('/att/:RegID', async (req, res) => {

    try {
        const rollNo = req.params.RegID;
        const users = await attSchema.findOne({RegID:rollNo}).exec()
            .then((data) => {
                res.send(data)
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    } catch (err) { throw err }

});




// * delete by enrollment no */successfully
app.delete('/att/:RegID', async (req, res) => {

    try {
        const RegID = req.params.RegID;
        const updatedResult = await attSchema.findOneAndDelete({ RegID:RegID }).exec();
        res.send(updatedResult);
    } catch (err) { throw err }
});



// * update by enrollment no */Successfull
app.patch('/att/:RegID', async (req, res) => {
    try{
        const rollNo= req.params.RegID;
        const updateData = await attSchema.findOneAndUpdate({RegID:rollNo},{$set:{
            Name:req.body.Name
        }}).exec()
        res.json(updateData);
    }catch(err){
        console.log(err);
    }

});


/*
// for create a new user data in the database *Success
app.post('/users', async (req, res) => {
    const data = MySchema({
        rollNo: req.body.rollNo,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })

    try {
        const user = await data.save();
        res.status(200).send(user);

    } catch (err) {
        throw err
    }
});


// * get all the data from the database *Success
app.get('/users', async (req, res) => {

    try {
        const users = await MySchema.find();
        res.json(users);
    } catch (err) { throw err }
});


// * get  the specific data  from the database based on the id *Success
app.get('/users/:id', async (req, res) => {

    try {
        const _id = req.params.id;
        const users = await MySchema.findById({ _id: _id });
        res.json(users);
    } catch (err) { throw err }
});


// * update the sepecific data form the database by ID *success
app.patch('/users/:id', async (req, res) => {
    try{
        const id= req.params.id;
        const updateData = await MySchema.findByIdAndUpdate(id,req.body);
        res.json(updateData);
    }catch(err){
        console.log(err);
    }

});



// * delete the data from the database *Success
app.delete('/users/:id', async (req, res) => {

    try {
        const _id = req.params.id;
        const updatedResult = await MySchema.findByIdAndRemove(_id,req.body);
        res.send(updatedResult);
    } catch (err) { throw err }
});

*/


// lisenting the PORT 
app.listen(PORT, (req, res) => {
    console.log('listing on port ' + PORT)
});