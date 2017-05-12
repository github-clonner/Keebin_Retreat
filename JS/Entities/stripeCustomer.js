/**
 * Created by mrlef on 5/11/2017.
 */


// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_owha8O0rJ9JkxvSyHQpFgUjP");
var User = require('./../Entities/User.js'); // Requires


function _createStripeCustomer(userEmail, callback) {
    console.log("CreateStripeCustomer is running.")
    console.log("vi søger på userEmail: " + userEmail)
    User.getUser(userEmail, function (data) {
        if (data.stripeCustomerId != null) {
            console.log("Customer already has a StripeId.")
            stripe.customers.retrieve(
                data.stripeCustomerId,
                function(err, customer) {
                    // asynchronously called
                    if (err){
                        console.log("Error in retrieving customer from Stripe.")
                        callback(false)
                    } else {
                        callback(customer)
                    }
                }
            )
        } else {
            var customer = stripe.customers.create({
                email: userEmail,
            }, function (err, customer) {
                // asynchronously called
                if (err) {
                    console.log("error i createStripeCustomer: " + err)
                    callback(false)
                } else {
                    User.putGiveUserStripeCustomerID(customer.email, customer.id, function (data) {
                        let callbackData = {}
                        if (data) {
                            //subscribe
                            callback(customer)
                        } else {
                            console.log("Error: fejl i createStripeCustomer. Deleting StripeCutomer")
                            stripeCustomer.deleteStripeCustomer(customer.id, function (data) {
                                console.log("deletion of stripeCustomer: " + data)
                                callback(false)
                            })
                        }
                    })
                }
            })
        }
    })
}

function _deleteStripeCustomer(customerId, callback) {
    stripe.customers.del(
        customerId,
        function(err, confirmation) {
            // asynchronously called
            if(err) {
                console.log("Deletion of stripeCustomer failed: " + err)
                callback(false)
            } else {
                console.log(confirmation)
                callback(true)
            }
        })
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
    subscribeCustomerToPlan: _subscribeCustomerToPlan,
    deleteStripeCustomer: _deleteStripeCustomer
};


