const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = 3001

// USE
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false, useNewUrlParser : true, useUnifiedTopology : true}))


// CONNECTION TO DB
//ADD YOUR OWN CONNECTION TO MONGODB ATLAS
mongoose.connect()
.then(()=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log(`error : ${err}`)
})

// DATA SCHEMA

const ItemSchema = mongoose.Schema({
    title : String,
    description : String,
})

// DATA MODEL

const Item = mongoose.model("Item",ItemSchema)

// CREATE IN DB 

app.post("/newitem",(req,res)=>{
    const newItem = new Item({
        title : req.body.title,
        description : req.body.description,
    })

    newItem.save()
    .then((item)=> console.log(item))
    .catch((err) => res.status(400).json(err))
})

// READ FROM DB
app.get("/items",(req,res)=>{
    Item.find()
    .then((items)=> res.json(items))
    .catch((err)=> res.send(`ERROR : ${err}`))
})

// UPDATE FROM DB 

app.put('/put/:id',(req,res)=>{
    const updatedItem = {
        title : req.body.title,
        description : req.body.description,
    };

    Item.findByIdAndUpdate({_id: req.params.id}, {$set : updatedItem} ,(req,res,err)=>{
        if(!err){
            console.log("Item updated")
    }else{
        console.log(err)
    }
})
})

// DELETE FROM DB 

app.delete('/delete/:id', (req,res)=>{
    const id = req.params.id;

    Item.findByIdAndDelete({_id : id}, (req,res,err)=>{
        if(!err){
            console.log("ITEM DELETED FROM SERVER")
        }else{
            console.log(err)
        }
    })
})

 // SERVER LISTENING
app.listen(port,()=>{
    console.log("server started")
})