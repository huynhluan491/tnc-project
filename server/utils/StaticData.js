const DateTimeUtils = require("./DateTimeUtils");
exports.AUTH = {
  Role: {
    user: 3,
    admin: 2,
    master: 1,
  },
};

exports.config = {
  MAX_PAGE_SIZE: 20,
};
exports.DefaultTimeExpries = {
  TokenExpries: DateTimeUtils.convertToMilliseconds(process.env.JWT_EXPIRED_IN),
  RefreshTokenExpries: DateTimeUtils.convertToMilliseconds(
    process.env.REFRESH_JWT_EXPRIRED_IN
  ),
};
