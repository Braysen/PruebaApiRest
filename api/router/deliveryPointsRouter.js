const router = require('express').Router();
const { getDeliveryPointsPerProduct } = require('../services/deliveryPointsService');

router.get("/deliveryPoint/:ownerName",async(req,res) => {
    const ownerName = req.params.ownerName;
    
    getDeliveryPointsPerProduct(ownerName, (err, results) => {
        if(err){
            console.log(err);
            return
        }

        if(!results){
            return res.json({
                success: 0,
                message: "Delivery point per product not Found"
            })
        }

        if(results.length > 0){
            return res.json({
                success: 1,
                data: results
            })
        }else{
            return res.json({message: "Delivery point per product not Found"});
        }
        
    })
});


module.exports = router;