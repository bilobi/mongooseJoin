const express=require('express');
const router=express.Router();
const categoryService=require('./services/category.service')

router.post('/category',(rq,res)=>{
    categoryService.postCategory(rq,res);
})
router.put('/category',(rq,res)=>{
    categoryService.putCategory(rq,res);
})

router.get('/category',(rq,res)=>{
    categoryService.getCategories(rq,res);
})
router.get('/variant',(rq,res)=>{
    categoryService.getVariants(rq,res);
})

router.post('/product',(rq,res)=>{
    categoryService.postProduct(rq,res);
})


router.post('/variant',(rq,res)=>{
    categoryService.postVariant(rq,res);
})


module.exports=router;