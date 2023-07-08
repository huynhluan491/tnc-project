module.exports = class DTOBrand {
  constructor(data) {
    this.BrandID = data.BrandID;
    this.BrandName = data.BrandName;
    if (!data.CreatedAt) data.CreatedAt = new Date().toISOString();
    this.CreatedAt = data.CreatedAt;
  }
};
