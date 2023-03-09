 let s = require('./db')
     // let docs = [{
     //     name: 'Fries',
     //     price: 2000,
     //     currency: 'N',
     //     picture: 'https://fileuploadservice.aremzy.repl.co/api/getRawFile/?space=63fb931bb96443f9d0187769&file=fries.png'
     // }, {
     //     name: 'Salad',
     //     price: 2000,
     //     currency: 'N',
     //     picture: 'https://fileuploadservice.aremzy.repl.co/api/getRawFile/?space=63fb931bb96443f9d0187769&file=salad.png'
     // }, {
     //     name: 'Egusi',
     //     price: 2000,
     //     currency: 'N',
     //     picture: 'https://fileuploadservice.aremzy.repl.co/api/getRawFile/?space=63fb931bb96443f9d0187769&file=egusi.png'
     // }]
     // s.insertProducts(docs).then(e => {
     //     console.log(e)
     // }).catch(e => {
     //     console.log(e)
     // })

 s.getAllProducts().then(res => {
     console.log(res)
 }).catch(e => console.log(e))