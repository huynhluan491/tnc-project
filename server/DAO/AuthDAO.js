const AuthSchema = require("../model/Auth");

exports.clearAll = async () => {
  query = `delete ${AuthSchema.schemaName}  DBCC CHECKIDENT ('[${AuthSchema.schemaName} ]', RESEED, 1);`;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets;
};
