const AuthSchema = require("../model/Auth");
const dbConfig = require("../database/dbconfig");
const dbUtils = require("../utils/dbUtils");

exports.addAuth = async (auth) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  auth.createdAt = new Date().toISOString();

  let insertData = AuthSchema.validateData(auth);
  let query = `SET IDENTITY_INSERT ${AuthSchema.schemaName} ON insert into ${AuthSchema.schemaName}`;
  const {request, insertFieldNamesStr, insertValuesStr} =
    dbUtils.getInsertQuery(AuthSchema.schema, dbPool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }
  query +=
    " (" +
    insertFieldNamesStr +
    ") select  " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${AuthSchema.schemaName} WHERE AuthName = @AuthName)` +
    ` SET IDENTITY_INSERT ${AuthSchema.schemaName} OFF`;
  await request.query(query);
};

exports.clearAll = async () => {
  query = `delete ${AuthSchema.schemaName}  DBCC CHECKIDENT ('[${AuthSchema.schemaName} ]', RESEED, 1);`;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets;
};
