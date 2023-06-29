/* require('dotenv').config();
const { MongoClient } = require('mongodb');
console.log(process.env.Mongo_URL)
const client = new MongoClient(process.env.Mongo_URL)

async function main() {
await client.connect();
console.log('connection OK');
const db = client.db('myTask')
const collection = db.collection('documents');

//Create
/* try {
  const insertData = await collection.insertMany([
      {
         Nom: 'Kadoch',
         Prénom: 'Mory',
         Tel: '0644301556',
         Email:'mmmdin@gmail.com',
         Password: 'azeert33',
      },
      {
        Nom: 'hh',
        Prénom: 'mm',
        Tel: '0644301556',
        Email:'mmmdin@gmail.com',
        Password: 'azeert33',
        },
        {
        Nom: 'pp',
        Prénom: 'qq',
        Tel: '0644301556',
        Email:'mmmdin@gmail.com',
        Password: 'azeert33',
        },
        {
        Nom: 'aa',
        Prénom: 'qq',
        Tel: '0644301556',
        Email:'mmmdin@gmail.com',
        Password: 'azeert33',
        }
  ]);

  console.log('Documents insérés => ', insertData);
} catch(e) {throw e; } */

//Read
/* try {
    const findData = await collection.findOne({Nom:'Kadoch'});
    console.log('Document trouvé', findData);

}catch(e) {throw e; }
 */
//update
/* try {
   const updateaa = collection.updateOne({Nom : 'aa'},{
       $set:{Nom:'Ahmed', Prénom:'Moutii',}
   });
   console.log(await updateaa); 

}catch(e) {throw e; } 

//Delete
try {
   const Deletepp = await collection.deleteOne({Nom:'pp'});
   console.log(await Deletepp)

}catch(e) {throw e; }
 



return 'done' ;

}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close()); */

require('dotenv').config();
const express = require('express');
let cors = require('cors');

const User = require('./routes/api/user');

const app = express();

const connectDB = require('./db/conn');

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/user', User);

app.listen(5000, ()=>{
    console.log("Serveur à l'écoute")
})
