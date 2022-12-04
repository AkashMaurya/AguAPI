const mongoose= require('mongoose');


const myConnection = new mongoose.connect('mongodb://0.0.0.0:27017/admin',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
})