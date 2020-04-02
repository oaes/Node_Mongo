const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
//mongodb
const user = process.env.DB_user;
const pass = process.env.DB_pass;
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${user}:${pass}@cluster0-j5ffy.mongodb.net/test?retryWrites=true&w=majority`;




const app = express();


app.use(cors());
app.use(bodyParser.json());


// app.get('/', (req, res)=> {
//     res.send('chance'); 
// })

app.get('/door/janala', (req, res) => {
    res.send('amader 5 ta janala');
})


let client = new MongoClient(uri, {useNewUrlParser: true },{useUnifiedTopology: true});

app.get('/products', (req, res) => {
    client = new MongoClient(uri, { useNewUrlParser: true },{useUnifiedTopology: true}) 
    client.connect(err => {  
    const collection = client.db("onlineStore").collection("products")
    collection.find().limit(10).toArray((err, documents) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err});
        }
        else
        {
            res.send(documents);
        }
    });
    client.close();
    });
})



const name = ['akash','oaes','mila','susmita','tepi','tala','turjo']
app.get('/user/:id', (req, res) => {
    const usersId = req.params.id;
    const userName = name[usersId];
    res.send({usersId, userName})
})



// let client = new MongoClient(uri, { useNewUrlParser: true },{useUnifiedTopology: true});
//post
app.post('/addProduct', (req, res) => {
  
    //server
        const products = req.body;
        client = new MongoClient(uri, { useNewUrlParser: true },{useUnifiedTopology: true});
        client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        collection.insertOne(products, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({message:err});
            }
            else
            {
                res.send(result.ops[0]);
            }
        });
        client.close();
        });

})


app.listen(3000, () => console.log('listing a music on port 3000'))