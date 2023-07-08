module.exports = class DTOCategory {
  constructor(data) {
    this.CategoryID = data.CategoryID;
    this.CategoryName = data.CategoryName;
    if (!data.CreatedAt) data.CreatedAt = new Date().toISOString();
    this.CreatedAt = data.CreatedAt;
  }
};
