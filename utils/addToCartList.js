const client = require('../redis-client/client')


module.exports = (id, orders) => {
    console.log('..........................')
    console.log(id, orders)
    console.log('..........................')

    client.get('orders' + id, (err, resp) => {
        // console.log(resp)
        if (err || !resp) {
            client.set('orders' + id, JSON.stringify([orders]), () => {})
                // console.log('allo')
        } else {
            // console.log('allo1')
            let orderArray = JSON.parse(resp)
            orderArray.push(orders)
            client.set('orders' + id, JSON.stringify(orderArray), () => {})

        }
    })
}