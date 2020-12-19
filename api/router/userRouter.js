const router = require('express').Router();
const jwt = require("jsonwebtoken");
const { getUsers,getUserByUserEmail, getUserByUserId, updateUser } = require('../services/userService');
const auth = require("../controller/verifyToken");
const { compareSync } = require('bcrypt')

router.post("/login", async (req, res) => {
        try{
            const body = req.body
            getUserByUserEmail(body.email, (err, results) => {
    
                if(err){
                    console.log(err);
                }
                if(body.email == "" || body.password == ""){
                    return res.status(500).json({Error: "Ingrese Password y email"});
                }
    
                if(!results){
                    return res.json({
                        success: 0,
                        data: "Invalid email or password"
                    })
                }
                const result = compareSync(body.password, results.password)
                if(result){
                    results.password = undefined
                    
                    const token = jwt.sign({id: results.id},process.env.JWT_SECRET,{
                        expiresIn: 60 * 60 * 24
                    });
                    
                    res.status(200).json({auth: true, token});
    
    
                }else{
                    return res.json({
                        success: 0,
                        data: "Invalid email or password"
                    })
                }
            });
            
        }catch(err){
            res.status(500).json({error: err.message});
        }
});

router.get("/users",auth, async(req,res) => {
        getUsers(async (err, results) => {
            if(err){
                /* Mostramos mensaje de error en el servidor */
                console.log(err)
                /* Mostramos mensaje de error al front-end */
                res.status(500).json({error: 'the database cannot be accessed'});
                return;
            }

            if(results.length > 0){
                return res.json({
                    data: results
                });
            }else{
                return res.status(200).json({message: "Users not found"});
            } 
            
        });
});

router.get("/user/:id",async(req,res) => {
    const id = req.params.id;
    
    getUserByUserId(id, (err, results) => {
        if(err){
            console.log(err);
            return
        }

        if(!results){
            return res.json({
                success: 0,
                message: "User not Found"
            })
        }

        return res.json({
            success: 1,
            data: results
        })
    })
});

router.post("/updateProfile/:id", async (req, res) => {
    try{
        const body = req.body
        const id = req.params.id;
        updateUser(body,id, (err, results) => {

            if(err){
                console.log(err);
                /* Mostramos mensaje de error al front-end */
                res.status(500).json({error: 'Not update profile'});
                return;
            }

            if(results){
                res.status(200).json({auth: true, message: "User profile Update"});
            }
        });
        
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;