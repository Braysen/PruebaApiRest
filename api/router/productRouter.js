const router = require('express').Router();
const { getProducts, getProductsByProductId, getProductsDescriptions, create, getProductsPerStore } = require('../services/productService');

router.get("/products",async(req,res) => {
        getProducts(async (err, results) => {
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
                res.status(200).json({message: 'No hay productos'});
            }
        });
});

router.get("/product/:id",async(req,res) => {
        const id = req.params.id;
        
        getProductsByProductId(id, (err, results) => {
            if(err){
                console.log(err);
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Product not Found"
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })
});

router.get("/productsDescription",async(req,res) => {
    getProductsDescriptions(async (err, results) => {
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
            return res.status(200).json({message: "Not Products found"})
        }
        
        
    });
});

router.post("/insert", async (req, res) => {
    try{
        const body = req.body
        create(body, (err, results) => {

            if(err){
                console.log(err);
            }

            if(results){
                res.status(200).json({message: "Product registered"});
            }

        });
        
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.get("/productsPerStore",async(req,res) => {
    getProductsPerStore(async (err, results) => {
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
            res.status(200).json({message: 'Not products founds'});
        }
    });
});

module.exports = router;