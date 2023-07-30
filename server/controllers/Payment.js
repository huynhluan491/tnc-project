const PaymentDAO = require("../DAO/PaymentDAO");

exports.getAllPayment = async (req, res) => {
  try {
    const result = await PaymentDAO.getAllPayment();
    res.status(200).json({
      Code: 200,
      Msg: "OK",
      Data: {result},
    });
  } catch (e) {
    res.status(500).json({
      Code: 500,
      Msg: e.toString(),
    });
  }
};