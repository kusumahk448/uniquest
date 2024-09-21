const express = require('express')
const mongoose= require('mongoose')
const path=require('path')
const port =3020

const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/uniquest')
const db=mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection successful")
})

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    dob: Date,
    password:String
})

const Users= mongoose.model("Users",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'))
})

app.post('/post',async(req,res)=>{
    const {name,email,dob,password,confirmPassword}=req.body
    const existingUser= await Users.findOne({email})
    if (existingUser){
        return res.json({ success: false, message: "User with this email already exists." })
    } 
    try {
        const user = new Users({
            name,
            email,
            dob,
            password
        });
        await user.save();
        res.json({ success: true, message: "Form submitted successfully!" });
    } catch (err) {
        console.error("Error saving user:", err);
        res.json({ success: false, message: "An error occurred while saving the user." });
    }   
})

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})