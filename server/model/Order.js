const ModelSchema = require("./ModelSchema");
const ModelSchemaValidator = require("./ModelSchemaValidator");
const sql = require("mssql");

const OrdersSchema = new ModelSchema(
  {
    OrderID: new ModelSchemaValidator({
      name: "OrderID",
      sqlType: sql.Int,
    }),
    UserID: new ModelSchemaValidator({
      name: "UserID",
      sqlType: sql.Int,
    }),
    CustomerName: new ModelSchemaValidator({
      name: "CustomerName",
      sqlType: sql.NVarChar,
    }),
    Address: new ModelSchemaValidator({
      name: "Address",
      sqlType: sql.NVarChar,
    }),
    Phone: new ModelSchemaValidator({
      name: "Phone",
      sqlType: sql.NVarChar,
    }),
    PaymentID: new ModelSchemaValidator({
      name: "PaymentID",
      sqlType: sql.Int,
    }),
    StatusID: new ModelSchemaValidator({
      name: "StatusID",
      sqlType: sql.Int,
    }),
    createdAt: new ModelSchemaValidator({
      name: "CreatedAt",
      sqlType: sql.DateTime,
      default: new Date().toISOString(),
      require: true,
    }),
  },
  "Orders",
  "createAt"
);
const Order_DetailsSchema = new ModelSchema(
  {
    OrderID: new ModelSchemaValidator({
      name: "OrderID",
      sqlType: sql.Int,
    }),
    ProductID: new ModelSchemaValidator({
      name: "ProductID",
      sqlType: sql.Int,
    }),
    Amount: new ModelSchemaValidator({
      name: "Amount",
      sqlType: sql.Int,
      require: true,
    }),
    CreatedAt: new ModelSchemaValidator({
      name: "CreatedAt",
      sqlType: sql.DateTime,
      default: new Date().toISOString(),
      require: true,
    }),
  },
  "Order_Details",
  "createAt"
);
module.exports = {OrdersSchema, Order_DetailsSchema};
