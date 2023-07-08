const dbConfig = require("../database/dbconfig");
const StatusSchema = require("../model/Status");
const dbUtils = require("../utils/dbUtils");

exports.addStatusIfNotExists = async (status) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  status.createdAt = new Date().toISOString();

  let insertData = StatusSchema.validateData(status);
  let query = `SET IDENTITY_INSERT ${StatusSchema.schemaName} ON insert into ${StatusSchema.schemaName}`;
  const {request, insertFieldNamesStr, insertValuesStr} =
    dbUtils.getInsertQuery(StatusSchema.schema, dbPool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }

  query +=
    " (" +
    insertFieldNamesStr +
    ") select  " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${StatusSchema.schemaName} WHERE StatusName = @StatusName)` +
    ` SET IDENTITY_INSERT ${StatusSchema.schemaName} OFF`;
  let result = await request.query(query);
  return result.recordsets;
};

exports.clearAll = async () => {
  query = `delete ${StatusSchema.schemaName}  DBCC CHECKIDENT ('[${StatusSchema.schemaName} ]', RESEED, 1);`;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets;
};
