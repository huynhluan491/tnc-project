const dbConfig = require("../database/dbconfig");

const dbUtils = require("../utils/dbUtils");
const DateTimeUtils = require("../utils/DateTimeUtils");

const UserSchema = require("../Model/User");
const {OrdersSchema, Order_DetailsSchema} = require("../Model/Order");
const StatusSchema = require("../Model/Status");
const PaymentSchema = require("../Model/Payment");

const DTOProduct = require("../DTO/Default/DTOProduct");
const DTOProductCustomize = require("../DTO/Customize/DTOProductCustomize");
const DTOOrderDetails = require("../DTO/Default/DTOOrderDetails");
const DTOOrderCustomize = require("../DTO/Customize/DTOOrderCustomize");
const ProductSchema = require("../Model/Product");

exports.addOrder = async (order) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  const ms = DateTimeUtils.convertDateTimeToMilliseconds(Date.now());
  order.CreatedAt = DateTimeUtils.convertMillisecondsToDateTime(ms);

  let insertData = OrdersSchema.validateData(order);
  let query = `SET IDENTITY_INSERT ${OrdersSchema.schemaName} ON insert into ${OrdersSchema.schemaName}`;
  const {request, insertFieldNamesStr, insertValuesStr} =
    dbUtils.getInsertQuery(OrdersSchema.schema, dbPool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }

  query +=
    " (" +
    insertFieldNamesStr +
    ") select  " +
    insertValuesStr +
    ` SET IDENTITY_INSERT ${OrdersSchema.schemaName} OFF`;
  result = await request.query(query);
  return result.recordsets;
};

exports.createNewOrder = async (userID) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  let order = {
    UserID: userID,
  };

  let insertData = OrdersSchema.validateData(order);
  const {request, insertFieldNamesStr, insertValuesStr} =
    dbUtils.getInsertQuery(OrdersSchema.schema, dbPool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }
  const query = `insert into ${OrdersSchema.schemaName} ( ${insertFieldNamesStr} ) select ${insertValuesStr}`;
  let result = await request.query(query);
  // console.log(result);
  return result;
};

exports.addOrder_DetailsIfNotExisted = async (order_details) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  let insertData = Order_DetailsSchema.validateData(order_details);
  let query = `insert into ${Order_DetailsSchema.schemaName}`;
  const {request, insertFieldNamesStr, insertValuesStr} =
    dbUtils.getInsertQuery(
      Order_DetailsSchema.schema,
      dbPool.request(),
      insertData
    );
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }

  query +=
    " (" +
    insertFieldNamesStr +
    ") SELECT  " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${Order_DetailsSchema.schemaName} WHERE OrderID = @orderID and productID = @productID)` +
    `
    select * from ${Order_DetailsSchema.schemaName} WHERE OrderID = @orderID
    `;

  let result = await request.query(query);
  var dtos = result.recordsets[0].map((x) => new DTOOrderDetails(x));
  return dtos;
};

exports.getProductInOderByUserID = async (userID) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }

  // console.log(query);
  let result = await dbPool
    .request()
    .input(
      OrdersSchema.schema.UserID.name,
      OrdersSchema.schema.UserID.sqlType,
      userID
    ).query(` select  p.*,od.Amount from Order_Details od
       inner join Product p on p.ProductID = od.ProductID
       where od.OrderID in (select OrderID from Orders o where o.UserID = @UserID)
      `);

  var dto = result.recordsets[0].map(
    (element) => new DTOProductCustomize(element)
  );
  return dto;
};

exports.getOrderIDByUserName = async (username) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }

  let result = await dbPool
    .request()
    .input(
      UserSchema.schema.UserName.name,
      UserSchema.schema.UserName.sqlType,
      username
    )
    .query(
      `select OrderID from ${OrdersSchema.schemaName} where UserID in (select UserID from ${UserSchema.schemaName} where userName = @${UserSchema.schema.UserName.name}) `
    );
  return result.recordsets[0];
};

exports.updateOrder_Details = async (Order_Details) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  let updateData = Order_DetailsSchema.validateData(Order_Details);
  let q = `update ${Order_DetailsSchema.schemaName} set `;
  // console.log(updateData);

  const {request, updateStr} = dbUtils.getUpdateQuery(
    Order_DetailsSchema.schema,
    dbPool.request(),
    updateData
  );

  q += updateStr + ` where ProductID =@ProductID and OrderID = @OrderID`;
  objectReturn =
    q +
    ` select * from ${Order_DetailsSchema.schemaName} where ProductID =@ProductID and OrderID = @OrderID`;
  let result = await request.query(objectReturn);
  var dto = new DTOOrderDetails(result.recordsets[0][0]);
  return dto;
};

exports.deleteItemInOrder = async (urlQuery) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  let q = `delete Order_Details where ProductID = ${urlQuery.ProductID} and OrderID = ${urlQuery.OrderID} `;
  let result = await dbPool.request().query(q);
};

exports.getOrderByUserID = async (userID) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  const query = `select  ${OrdersSchema.schemaName}.*,
  ${StatusSchema.schemaName}.${StatusSchema.schema.StatusName.name},
  ${PaymentSchema.schemaName}.${PaymentSchema.schema.PaymentName.name},
  Order_Details.TotalPrice,
  Order_Details.TotalAmount
   from ${OrdersSchema.schemaName}
  inner join ${StatusSchema.schemaName} on ${OrdersSchema.schemaName}.StatusID = ${StatusSchema.schemaName}.StatusID
  inner join ${PaymentSchema.schemaName} on ${OrdersSchema.schemaName}.PaymentID = ${PaymentSchema.schemaName}.PaymentID
  inner join
  (
    select ${Order_DetailsSchema.schemaName}.OrderID,
    sum(${Order_DetailsSchema.schemaName}.Amount * ${ProductSchema.schemaName}.Price) as TotalPrice,
    count(${Order_DetailsSchema.schemaName}.Amount) as TotalAmount
    from ${Order_DetailsSchema.schemaName}
    inner join ${ProductSchema.schemaName}
    on ${Order_DetailsSchema.schemaName}.ProductID = ${ProductSchema.schemaName}.ProductID
    group by ${Order_DetailsSchema.schemaName}.OrderID
  ) as Order_Details
  on ${OrdersSchema.schemaName}.OrderID = ${Order_DetailsSchema.schemaName}.OrderID
  where UserID = @${OrdersSchema.schema.UserID.name}
  `;
  console.log(query);
  let result = await dbPool
    .request()
    .input(
      OrdersSchema.schema.UserID.name,
      OrdersSchema.schema.UserID.sqlType,
      userID
    )
    .query(query);

  return result.recordsets[0].map((x) => {
    x.CreatedAt = DateTimeUtils.convertSqlDateTimeToUIDateTime(x.CreatedAt);
    return new DTOOrderCustomize(x);
  });
};

exports.clearAllOrder_Details = async () => {
  query = `delete ${Order_DetailsSchema.schemaName} ;`;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets;
};
exports.clearAllOrder = async () => {
  query = `delete ${OrdersSchema.schemaName}  DBCC CHECKIDENT ('[${OrdersSchema.schemaName} ]', RESEED, 1);`;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets;
};
