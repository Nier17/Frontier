const { response } = require('express');
const {MongoClient} = require('mongodb');
const url = "mongodb://localhost/frontier";
const client = new MongoClient(url);

async function main() {
    try{
        await client.connect();
        console.log('MONGODB CONNECTED');
    } catch(e) {
        console.error(e);
    } 
}

main().catch(console.err);

const mapController = {};

mapController.createMap = async (req, res) => {
    var a = {x1: 'hola', x2:'chau'};
    const obj = req.body;
    console.log(obj);
    const result = await client.db("frontier").collection("maps").insertOne(obj, function(err, result) {
        if(err){
            res.status(500).json({
                error: err
            })
        } else {
            res.status(200).json({
                message: 'map inserted!',
                map: result
            })
        }
    });
}

mapController.getMaps = async (req, res) => {
    const maps = await client.db("frontier").collection("maps").find({}).toArray(function(err, result){
        if(err){
            throw err;

        } 
        else {
            console.log(result);
            res.status(200).json({
                message: 'Records listed!',
                maps: result
            });
        }
     
    });
}

mapController.getLastMap = async (req, res) => {
    const map = await client.db("frontier").collection("maps").find({}).toArray(function(err, result){
        if(err){
            throw err;

        } 
        else {
            lastItem = result.length -1;
            console.log(result[lastItem]);
            res.status(200).json({
                message: 'Records listed!',
                lastMap: result[lastItem]
            });
        }
    });
}

module.exports = mapController;