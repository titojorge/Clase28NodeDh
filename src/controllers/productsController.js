const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function getProducts(){
	const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products;
}

function addProduct(product){
    products.push(product);
    const productsString = JSON.stringify(products);
    fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), productsString);
}

function  updateProducts(){
    const productsString = JSON.stringify(products)
    fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), productsString);
}

function deleteProducts(productsNuevos){
	const productsString = JSON.stringify(productsNuevos)
    fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), productsString);
}


const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = getProducts();
		res.render('products', {products : products})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const idProduct = req.params.id;
		const productFound = products.filter( elem => elem.id == idProduct)
		res.render('detail', {productFound: productFound[0]})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const form = req.body;
		const nameFile = req.file.filename;

        const newProduct = {
            id: products.length + 1 ,
            name: form.name,
            discount: form.discount,
            price: form.price,
			category: form.category,
			description: form.description,
			image: nameFile
        }

        addProduct(newProduct);
        res.redirect('/products/list');
	},

	// Update - Form to edit
	edit: (req, res) => {
		const idProduct = req.params.id
        //busco el producto
        const productFound = products.find(function(elem){
            return elem.id == idProduct
        })
        res.render('product-edit-form', { productFound: productFound });
	},
	// Update - Method to update
	update: (req, res) => {
		const id = req.params.id
        const form = req.body;
		const nameFile = req.file.filename;

        //busco el producto
        const productFound = products.find(function(elem){
            return elem.id == id
        })
        
        //modifico el producto en el listado correspondiente
        productFound.name = form.name;
        productFound.description = form.description;
        productFound.price = form.price;
		productFound.discount = form.discount;
		productFound.category = form.category;
		productFound.image = nameFile;

        //actualizar el json
        updateProducts()

        res.redirect('/products/list');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const idProduct = req.params.id;

		const productsNuevos = products.filter( elem => elem.id != idProduct );

		deleteProducts(productsNuevos);

		res.redirect('/products/list');
	}
};

module.exports = controller;