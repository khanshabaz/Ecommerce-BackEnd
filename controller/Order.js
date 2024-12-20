const model = require("../model/Order");
const Order = model.Order;

exports.fetchOrderByUser = async (req, res) => {
  const {user}=req.query;
   try {
     const orders = await Order.find({user:user});
     res.status(200).json(orders);
   } catch (err) {
     console.error({ err });
     res.status(400).json(err);
   }
 };

 exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
    console.log(req.body);
    try {
      const doc = await order.save();
      res.status(201).json(doc);
    } catch (err) {
      console.error({ err });
      res.status(400).json(err);
    }
  };

  
// exports.deleteFromCart = async (req, res) => {
//     const {id}=req.params
//      try {
//        const doc = await Cart.findByIdAndDelete(id);
//        res.status(200).json(doc);
//      } catch (err) {
//        console.error({ err });
//        res.status(400).json(err);
//      }
//    };


   exports.updateOrder = async (req, res) => {
    const {id}=req.params
     try {
       const order = await Order.findByIdAndUpdate(id,req.body,{new:true});
      res.status(200).json(order);
     } catch (err) {
       console.error({ err });
       res.status(400).json(err);
     }
   };
  