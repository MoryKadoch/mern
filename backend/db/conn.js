const mongoose = require('mongoose');
/*const db = process.env.ATLAS_URL*/
const db = process.env.Mongo_URL;
//const db = 'mongodb+srv://mazinetellat:3VEZIbF49mOnKfvN@cluster0.qm762p1.mongodb.net/tp?retryWrites=true&w=majority';



const connectDB = async () => {
    try{
        mongoose.set('strictQuery', true);
        await mongoose.connect(db);

        console.log("MongoDB à l'écoute");
    }
catch(err){
    console.error(err.message);
    process.exit(1);
}
};
module.exports = connectDB;