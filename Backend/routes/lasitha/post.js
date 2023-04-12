const express = require('express');
const vendor = require('../../models/lasitha/vendorDetails');
const vendordata = require('../../models/lasitha/vendorStockDetails');
const collection = require('../../models/pamudu/userSchema');
const Dash = require('../../models/pamudu/dashSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({extended: true}))
router.use(cors())

const JWT_SECRET = "hdhjsahdahdjhaj123()aauauaayayka13414959487laksfjafkaf"



//save posts

router.post('/Vpost/save',(req,res)=>{

    let newPost = new vendordata(req.body);

    newPost.save((err) =>{

        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({

            success:"Posts saved successfully"
        });
    });


});


//get posts

router.get('/Vposts',(req,res) =>{
    vendordata.find().exec((err,posts) =>{
        if(err){
            return res.status(400).json({
                error:err
            });


        }

        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
});

//get a specific post

router.get("/Vpost/:id",(req,res) =>{

    let postId = req.params.id;

    vendordata.findById(postId,(err,post) =>{

        if(err){
            return res.status(400).json({success:false, err})
        }

        return res.status(200).json({
            success:true,
            post
        });
    });
});

//update routes

router.put('/vpost/update/:id',(req,res)=>{

    
    
    vendordata.findByIdAndUpdate(req.params.id,
        {
            $set:req.body
        },
        (err,post) =>{

            if(err){
                return res.status(400).json({error:err});
            }

            return res.status(200).json({
                success:"Updated Succesfully",
                
            });
        }
    );
});

//delete post

router.delete('/vpost/delete/:id', (req,res)=>{

    vendordata.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{

        if(err) return res.status(400).json({

            message:"Delete unsuccessful", err
        });

        return res.json({
            messege:"Delete Successful",deletedPost
        });
    });
});

//Login
router.post("/v",async(req,res) =>{
    const{Email,password}=req.body;

    const user = await vendor.findOne({Email});

    if(!user){
        return res.send({error: "User not exist"});
    }

    if(await bcrypt.compare(password,user.password)){

        const token=jwt.sign({email: user.Email},JWT_SECRET, {
            expiresIn: 10,
        });

        if(res.status(201)){
            return res.json({status: "ok", data: token});
            
        }else{

            return res.json({error: "error"})
        }
    }

    res.json({status: "error",error:"Invalid Password"});
    
});
// vendor Registration
router.post("/Vregister", async (req, res) => {
    const { userType, OrganizationName, Email, address, phone_no, icon, password, date } = req.body;
  
    const encryptedPassword = await bcrypt.hash(password,10);
    try {
        const oldUser = await vendor.findOne({Email});

        if(oldUser){
            return res.send({error: "User exist"})
        }
      await vendor.create({ Email, password:encryptedPassword ,userType ,phone_no,address,OrganizationName, icon, date});
      res.send({ status: "ok" });
    } catch (e) {
      res.send({ status: "error" });
    }
  });
  //Profile Details
  router.post("/vendorData",async(req,res)=>{

    const {token} =req.body;
    try{

        const user =jwt.verify(token,JWT_SECRET,(err,res)=>{
            if(err){
                return "token expired"
            }
            return res;
        });
        console.log(user);
        if(user =="token expired"){

            return res.send({status: "error", data: "token expired"});
        }
        const useremail = user.Email;
        vendor.findOne({Email:useremail})
        .then((data)=>{
            res.send({status: "ok", data: data});
        }).catch((error)=>{
            res.send({status: "error", data: error});
        });

    } catch(error){

    }
  })

  // Emp Details
router.get('/Vaccounts',(req,res) =>{
    vendor.find().exec((err,userSchema) =>{
        if(err){
            return res.status(400).json({
                error:err
            });


        }

        return res.status(200).json({
            success:true,
            userDetails:userSchema
        });
    });
});




module.exports = router;