const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const Product = require('../models/product');
const User = require('../models/user');

router.get('/user/cart' , isLoggedIn , async(req,res)=>{
    const user = await User.findById(req.user._id).populate('cart');
    res.render('cart/cart' , {user});
})


router.post('/user/:productId/add' , isLoggedIn , async(req,res)=>{
    let {productId} = req.params;
    let userId = req.user._id;
    let product = await Product.findById(productId);
    let user = await User.findById(userId);
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart'); 
})

router.post('/cart/delete', (req, res) => {
    const index = req.body.index; // Get the index of the item to be deleted from the request body
  
    // Check if the index is valid
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1); // Remove the item from the cart array
      res.redirect('/cart'); // Redirect back to the cart page
    } else {
      res.status(400).send('Invalid index'); // Return an error if the index is invalid
    }
  });

// router.delete('/user/:productId/remove', isLoggedIn ,async (req, res) =>{
//     let {productId} = req.params;
//     let userId = req.user._id;
//     let product = await Product.findByIdAndDelete({_id:productId});
//     let user = await User.findByIdAndUpdate(userId, {$pull:{cart:product}});
//     res.redirect('/user/cart');  
//     })
module.exports = router;