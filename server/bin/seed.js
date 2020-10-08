const mongoose = require('mongoose')
const Product = require('../models/product.model')

const dbName = "CITRICCO"
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })


const products = [
    {
        name: 'Amoeba',
        price: 18,
        image: 'https://i.etsystatic.com/17272408/r/il/6963ec/2511302462/il_794xN.2511302462_s8jg.jpg',
        category: ['aros']

    },
    {
        name: 'Celaya',
        price: 14,
        image: 'https://i.etsystatic.com/17272408/r/il/59bc12/2252680144/il_794xN.2252680144_hd4h.jpg',
        category: ['colgantes']
    }
]

Product.create(products)
    .then(allProductsCreated => console.log('Se han creado', allProductsCreated.length, 'productos en la BBDD'))
    .catch(err => console.log('ERROR: ', err))