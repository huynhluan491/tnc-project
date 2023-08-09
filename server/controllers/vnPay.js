const StaticData = require("../utils/StaticData");
const dateFormat = require("dateformat");
const config = StaticData.configApiVnPay;
const OrderDAO = require("../DAO/OrderDAO");
const dateTimeUtils = require("../Utils/DateTimeUtils");

const sortObject = (obj) => {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
};

exports.create_payment_url = async (req, res, next) => {
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = config.vnp_TmnCode;
  var secretKey = config.vnp_HashSecret;
  var vnpUrl = config.vnp_Url;
  var returnUrl = config.vnp_ReturnUrl;

  var date = new Date();
  const reqBody = req.body;
  var createDate = dateFormat(date, "yyyymmddHHmmss");
  date.setTime(date.getTime() + 15 * 60 * 1000);
  var expire = dateFormat(date, "yyyymmddHHMMss");

  var bankCode = reqBody.bankCode || "";

  const orderId = reqBody.OrderID || 2; //testing

  if (!orderId) {
    res.status(400).json({code: 400, message: "Missing orderId parameter"});
  }
  var amount = reqBody.Amount || 100000;
  var orderInfo = reqBody.OrderDescription || "Hai dzai";
  var orderType = reqBody.OrderType || "billpayment";

  var locale = reqBody.Language || "vn";

  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  vnp_Params["vnp_ExpireDate"] = expire;

  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, {encode: false});
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, {encode: false});
  // res.status(200).json({code: 200, data: vnpUrl});
  console.log(vnpUrl);
  res.redirect(vnpUrl);
};

exports.vnpay_return = (req, res, next) => {
  var vnp_Params = req.query;

  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  var tmnCode = config.vnp_TmnCode;
  var secretKey = config.vnp_HashSecret;

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, {encode: false});
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  console.log("vnp_Params return", vnp_Params);
  if (secureHash === signed && vnp_Params["vnp_TransactionStatus"] === "00") {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    res.json({code: 200, Msg: "success"});
    // handle success here
    const orderId = vnp_Params["vnp_TxnRef"];
    const updateInfor = {
      OrderID: orderId,
      PaymentID: 1,
      StatusID: 2,
      PayIn: dateTimeUtils.convertMillisecondsToDateTimeSQL(
        1,
        false,
        true,
        true
      ),
    };
    const result = OrderDAO.updateStatusPayment(updateInfor);
    console.log("success");
  } else {
    res.json({code: 404, Msg: "fail"});
  }
};

exports.vnpay_ipn = (req, res, next) => {
  var vnp_Params = req.query;
  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  var secretKey = config.vnp_HashSecret;
  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, {encode: false});
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  if (secureHash === signed) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({RspCode: "00", Message: "success"});
  } else {
    res.status(200).json({RspCode: "97", Message: "Fail checksum"});
  }
};
