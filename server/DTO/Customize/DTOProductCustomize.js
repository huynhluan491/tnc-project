const DTOProduct = require("../Default/DTOProduct");
module.exports = class DTOProductCustomize extends DTOProduct {
  constructor(data) {
    super(data);
    this.BrandName = data.BrandName ?? null;
  }
};
