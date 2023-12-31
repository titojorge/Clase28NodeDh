// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/list', productsController.index); 

/*configurar MULTER*/
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,path.join(__dirname,'../../public/images/products'))
    },
    filename: function(req,file,cb){
        const fileNameNew =  path.basename(file.originalname) + '-' + path.extname(file.originalname);
        cb(null,fileNameNew)
    }
})

const upload = multer({ storage : storage})


/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create', upload.single('image-product'),productsController.store); 

/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', upload.single('image-product-edit'),productsController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;
