 let s = require('./db')
     //  let docs = [{
     //      name: 'Fries',
     //      price: 2000,
     //      currency: 'N',
     //      picture: 'https://fileuploadservice.aremzy.repl.co/api/getRawFile/?space=63fb931bb96443f9d0187769&file=fries.png'
     //  }, {
     //      name: 'Salad',
     //      price: 2000,
     //      currency: 'N',
     //      picture: 'https://fileuploadservice.aremzy.repl.co/api/getRawFile/?space=63fb931bb96443f9d0187769&file=salad.png'
     //  }, {
     //      name: 'Egusi',
     //      price: 2000,
     //      currency: 'N',
     //      picture: 'https://fileuploadservice.aremzy.repl.co/api/getRawFile/?space=63fb931bb96443f9d0187769&file=egusi.png'
     //  }]

 let products = [{
     name: 'Salad',
     price: 1500,
     currency: 'N',
     picture: 'https://i.ibb.co/nMssWZ7/salad.jpg'
 }, {
     name: 'Fries',
     price: 2100,
     currency: 'N',
     picture: 'https://fileuploadservice.aremzy.repl.co/api/getRawFile/?space=63fb931bb96443f9d0187769&file=fries.png'
 }, {
     name: 'Egusi',
     price: 2500,
     currency: 'N',
     picture: 'https://i.ibb.co/DRC2G0Y/egusi.jpg'
 }, {
     name: 'Waffles',
     price: 3000,
     currency: 'N',
     picture: 'https://i.ibb.co/zRtKspN/download-3.jpg'
 }, {
     name: 'Noodles',
     price: 2000,
     currency: 'N',
     picture: 'https://i.ibb.co/YcB4rSr/download-2.jpg'
 }, {
     name: 'Shawarma',
     price: 4000,
     currency: 'N',
     picture: 'https://i.ibb.co/16cm0d6/shawarma.webp'
 }, {
     name: 'Amala',
     price: 1000,
     currency: 'N',
     picture: 'https://i.ibb.co/d4GS36F/download.jpg'
 }, {
     name: 'Ice Cream',
     price: 2500,
     currency: 'N',
     picture: 'https://i.ibb.co/PrP7DP3/icecream.jpg'
 }, {
     name: 'Fried Rice',
     price: 2000,
     currency: 'N',
     picture: 'https://i.ibb.co/5K66xnY/images-1.jpg'
 }, {
     name: 'Efo Riro',
     price: 1500,
     currency: 'N',
     picture: 'https://i.ibb.co/Pz0DjVB/download-1.jpg'
 }, {
     name: 'Amala',
     price: 1000,
     currency: 'N',
     picture: 'https://i.ibb.co/d4GS36F/download.jpg'
 }, ]
 s.insertProducts(products.concat(products)).then(e => {
     console.log(e)
 }).catch(e => {
     console.log(e)
 })

 s.getAllProducts().then(res => {
     console.log(res)
 }).catch(e => console.log(e))