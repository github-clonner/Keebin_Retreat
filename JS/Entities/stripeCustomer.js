/**
 * Created by mrlef on 5/11/2017.
 */


// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_owha8O0rJ9JkxvSyHQpFgUjP");




function _createStripeCustomer(userEmail, callback) {
    var customer = stripe.customers.create({
        email: userEmail,
    }, function(err, customer) {
        // asynchronously called
        if(err){
            console.log("error i createStripeCustomer: " + err)
            callback(false)
        } else {

            callback(customer)

        }
    });
}

function _subscribeCustomerToPlan(userStripeId, callback) {
    // Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
    var stripe = require("stripe")("sk_test_owha8O0rJ9JkxvSyHQpFgUjP");

    var subscription = stripe.subscriptions.create({
        customer: userStripeId,
        plan: "premiumPlanRetreat",
    }, function(err, subscription) {
        // asynchronously called
        if(err){
            console.log("error i _subscribeCustomerToPlan: " + err)
            callback(false)
        } else {
            callback(true)
        }
    });
}

module.exports = {
    createStripeCustomer: _createStripeCustomer,
    subscribeCustomerToPlan: _subscribeCustomerToPlan
};


