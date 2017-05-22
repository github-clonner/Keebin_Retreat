/**
 * Created by mrlef on 10/19/2016.
 */
var orderId;
var coffeeKindId;
var quantity;

var db = require('./../HouseKeeping/DataBaseCreation.js');
var sequelize = db.connect();
var Order = db.Order();
var orderItem = db.OrderItem();

function _newOrderItem(orderId, coffeeKindId, quantity) {
    this.orderId = orderId;
    this.coffeeKindId = coffeeKindId;
    this.quantity = quantity;

}


// Export Functions

function _createOrderItem(isPremiumUsed,prepaidCardId,orderId, menuItemId, callback) // This creates a new order - belonging to a user through the userId and a coffeeShop through CoffeeShopId
{
    console.log("ger er orderitem, premium: " + isPremiumUsed+ " cardId: " + prepaidCardId
+ " orderId: " + orderId + " menu: " + menuItemId )
    var orderItemCreated = false;

    console.log("newCoffeeShop is running.")
    Order.find({where: {id: orderId}}).then(function (data) { //we check if the order exists based on it's id.
        if (data == null) {
            console.log("Order not found");
            callback(orderItemCreated);
        } else {
            return sequelize.transaction(function (t) {
                console.log("Order with ID " + data.id + " found. Will insert orderItem.")
                // chain all your queries here. make sure you return them.
                return orderItem.create({
                    isPremiumUsed: isPremiumUsed,
                    prepaidCardId: prepaidCardId,
                    orderId: orderId,
                    menuItemId: menuItemId

                }, {transaction: t})

            }).then(function (result) {
                console.log("Transaction has been committed - orderItem has been added to the DB - to order with ID: " + data.id);
                orderItemCreated = true;
                callback(orderItemCreated);

                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                callback(orderItemCreated);
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            })
        }
    })
}
function _getOrderitemsByOrder(orderId,callback){
    var orderItems = [];
    console.log("nu er vi inde i get orderItems By Order: "+ orderId)
    // var log = function (inst) {
    //     console.log("fra getOrderItems: " +inst.get().isPremiumUsed)
    //     orderItems.push(inst.get());
    // }
    orderItem.findAll({where: {orderId: orderId}}).then(function (data, err) {
        if (data !== null) {

            callback(data);
        } else {
            console.log("get all cards fejl ---- ")
            console.log(err);
            callback(false);
        }
    })
}

module.exports = {CreateNewOrderItemObject: _newOrderItem, createOrderItem: _createOrderItem,
getOrderitemsByOrder: _getOrderitemsByOrder}; // Export Module