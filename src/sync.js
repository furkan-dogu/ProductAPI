"use strict"

const User = require('./models/userModel')
const { ProductCategory, Product } = require('./models/productModel')

module.exports = async () => {

    await User.deleteMany().then(() => console.log(' - User Deleted All'))
    await ProductCategory.deleteMany().then(() => console.log(' - ProductCategory Deleted All'))
    await Product.deleteMany().then(() => console.log(' - Product Deleted All'))

    // Example User:
    const user = await User.create({
        email: "test@test.com",
        password: "12345678",
        firstName: "Test",
        lastName: "Test"
    })
    // Example Category:
    const productCategory = await ProductCategory.create({
        name: 'Test Category'
    })
    // Example Posts:
    for (let key in [...Array(100)]) {
        await Product.create({
            userId: user._id,
            productCategoryId: productCategory._id,
            title: `test ${key} title`,
            description: `test ${key} description`,
            price: key * 10,
            discountPercentage: 17.94,
            rating: 4.44,
            stock: key + 1,
            brand: "Product",
            thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
            images: [
                "https://cdn.dummyjson.com/product-images/2/1.jpg",
                "https://cdn.dummyjson.com/product-images/2/2.jpg",
                "https://cdn.dummyjson.com/product-images/2/3.jpg",
                "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
            ]
        })
    }


    console.log('* Synchronized *')

}