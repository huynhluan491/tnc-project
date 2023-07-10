const CartDAO = require("../DAO/CartDAO");
const DTOOrderDetails = require("../DTO/Default/DTOOrderDetails");

exports.getProductInOrderByUSerID = async (req, res) => {
  try {
    let result = await CartDAO.getProductInOderByUserID(req.query.userID);
    res.status(200).json({
      code: 200,
      msg: null,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      code: 404,
      msg: error,
    });
  }
};

// exports.createNewCart = async(req,res)=>{
//   try {
//     let result = await CartDAO.createNewCart(req.params.userID);
//     res.status(200).json({
//       code: 200,
//       msg: "OK",
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     res.status(404).json({
//       code: 404,
//       msg: "FAIL",
//     });
//   }
// }

exports.insertProductToOrder = async (req, res) => {
  // console.log(req.body);
  const dto = new DTOOrderDetails(req.body);
  try {
    let result = await CartDAO.addOrder_DetailsIfNotExisted(dto);
    res.status(200).json({
      code: 200,
      msg: null,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      code: 404,
      msg: error,
    });
  }
};

exports.updateProductInOrder = async (req, res) => {
  const dto = new DTOOrderDetails(req.body);
  console.log(dto);

  try {
    let result = await CartDAO.updateOrder_Details(dto);
    res.status(200).json({
      code: 200,
      msg: null,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      code: 404,
      msg: error,
    });
  }
};

exports.deleteProductInOrder = async (req, res) => {
  const q = req.query;
  try {
    let result = await CartDAO.deleteItemInOrder(q);
    res.status(200).json({
      code: 200,
      msg: null,
    });
  } catch (error) {
    res.status(404).json({
      code: 404,
      msg: error,
    });
  }
};
