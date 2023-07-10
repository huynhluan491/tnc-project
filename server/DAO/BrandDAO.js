const dbConfig = require("../database/dbconfig");
const BrandSchema = require("../model/Brand");
const dbUtils = require("../utils/dbUtils");

exports.addBrandIfNotExists = async (brand) => {
  const dbPool = dbConfig.db.pool;
  if (!dbPool) {
    throw new Error("Not connected to db");
  }
  brand.createdAt = new Date().toISOString();

  let insertData = BrandSchema.validateData(brand);
  let query = `SET IDENTITY_INSERT ${BrandSchema.schemaName} ON insert into ${BrandSchema.schemaName}`;
  const {request, insertFieldNamesStr, insertValuesStr} =
    dbUtils.getInsertQuery(BrandSchema.schema, dbPool.request(), insertData);
  if (!insertFieldNamesStr || !insertValuesStr) {
    throw new Error("Invalid insert param");
  }

  query +=
    " (" +
    insertFieldNamesStr +
    ") select  " +
    insertValuesStr +
    ` WHERE NOT EXISTS(SELECT * FROM ${BrandSchema.schemaName} WHERE brandName = @brandName)` +
    ` SET IDENTITY_INSERT ${BrandSchema.schemaName} OFF`;
  let result = await request.query(query);
  return result.recordsets;
};

exports.clearAll = async () => {
  query = `delete ${BrandSchema.schemaName}  DBCC CHECKIDENT ('[${BrandSchema.schemaName} ]', RESEED, 1);`;
  let result = await dbConfig.db.pool.request().query(query);
  return result.recordsets;
};

exports.getBrands = async () => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let request = dbConfig.db.pool.request();
  let result = await request.query(`select * from brand`);
  return result.recordsets[0];
};

exports.getBrandById = async (id) => {
  if (!dbConfig.db.pool) {
    throw new Error("Not connected to db");
  }
  let request = dbConfig.db.pool.request();
  let result = await request
    .input(
      `${BrandSchema.schema.brandID.name}`,
      BrandSchema.schema.brandID.sqlType,
      id
    )
    .query(
      `select * from ${BrandSchema.schemaName} where ${BrandSchema.schema.brandID.name} = @${BrandSchema.schema.brandID.name}`
    );
  return result.recordsets[0][0];
};
