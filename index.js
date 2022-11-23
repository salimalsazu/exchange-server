const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000;

//cors
app.use(cors());
//middleware
app.use(express.json());


//homepage
app.get('/', (req, res) => {
    res.send('Welcome to webhost Server')
})


//mongoDB 
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gfar9jj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log(client);

async function run() {

    try {
        const productCollection = client.db('exchange').collection('products');
        const usersCollection = client.db('exchange').collection('users');


        app.get('/users', async (req, res) => {
            const query = {}
            const cursor = await usersCollection.find(query).toArray();
            res.send(cursor);
        })

        app.get('/products', async (req, res) => {
            const query = {}
            const cursor = productCollection.find(query);
            const service = await cursor.toArray();
            // if (service.length === 0) {
            //     res.send('No service were added')
            // }
            res.send(service);

        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            res.send(result);
        })


    }
    finally {

    }

}
run().catch((err) => console.error(err))














app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})