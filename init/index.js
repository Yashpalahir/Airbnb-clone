const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_Url = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(Mongo_Url);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data =initData.data.map((obj)=>({...obj,owner:"66764b0854307173825ab22e"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
}

initDB(); 