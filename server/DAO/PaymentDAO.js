const PaymentSchema = require("../model/Payment");
const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");
const DateTimeUtils = require("../utils/DateTimeUtils");
exports.addPaymentIfNotExists = async (payment) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  const ms = DateTimeUtils.convertDateTimeToMilliseconds(Date.now());
  payment.CreatedAt = DateTimeUtils.convertMillisecondsToDateTime(ms);

  let insertData = PaymentSchema.validateData(payment);
  let query = `SET IDENTITY_INSERT ${PaymentSchema.schemaName} ON insert into ${PaymentSchema.schemaName}`;
  const {request, insertFieldNamesStr, insertValuesStr} =
    dbUtils.getInsertQuery(PaymentSchema.schema, dbPool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }

  query +=
    " (" +
    insertFieldNamesStr +
    ") select  " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${PaymentSchema.schemaName} WHERE PaymentName = @paymentName)` +
    ` SET IDENTITY_INSERT ${PaymentSchema.schemaName} OFF`;
  let result = await request.query(query);
  return result.recordsets;
};

exports.getAllPayment = async () => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  const query = `
  select * from ${PaymentSchema.schemaName}
  `;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets[0];
};

exports.clearAll = async () => {
  query = `delete ${PaymentSchema.schemaName}  DBCC CHECKIDENT ('[${PaymentSchema.schemaName} ]', RESEED, 1);`;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets;
};
