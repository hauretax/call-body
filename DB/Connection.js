const mongoose = require('mongoose');

const URI = "mongodb+srv://hauretax:Yuihjk7890@cluster0.czliw.mongodb.net/call?retryWrites=true&w=majority"
const connectDB = async()=>{
    await mongoose.connect(URI, { useUnifiedTopology: true,  useNewUrlParser: true});
    console.log('logeddd');
}

module.exports = connectDB