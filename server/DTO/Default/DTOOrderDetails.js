module.exports = class DTOOrderDetails {
  constructor(data) {
    this.OrderID = data.OrderID;
    this.ProductID = data.ProductID;
    this.Amount = data.Amount;
    if (!data.CreatedAt) data.CreatedAt = new Date().toISOString();
    this.CreatedAt = data.CreatedAt;
  }
};
