const express = require("express");
const moment = require("moment");
const router = express.Router();
const messageMap = {};
let customers = [];
let orders = [];

router.post("/add", (req, res) => {
    // body came with body-parser, messages is name of textarea
    if (!req.body.messages || req.body.messages.length <=0) return;

    const messages = JSON.parse(req.body.messages);
    const orders = messages.orders || [];
    if (orders) {
        for ( let order of orders) {
            if (!messageMap[order.customerAccountId]) {
                messageMap[order.customerAccountId] = [];
            }
            messageMap[order.customerAccountId].push(order);
        }
        customers = Object.keys(messageMap);
    }
    req.flash("info", "Messages submitted successfully");
    //res.redirect("/");

    res.render("home/", { customers: customers, orders: [] });
  });
 
  router.post("/getorders", (req, res) => {
        let id = req.body.customerId;
        const FORMAT = " MMM DD YYYY hh:mm a";
        orders = messageMap[id].map(order => {
            order.orderDate = moment(order.orderData).format(FORMAT)
            return order;
        });
        res.render("home/", {customers: customers, orders: orders});
    });

module.exports = router;