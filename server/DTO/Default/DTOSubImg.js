module.exports = class DTOSubImg {
  constructor(data) {
    this.SubimgID = data.SubimgID;
    this.Image = data.Image;
    this.Alt = data.Alt;
    this.ProductID = data.ProductID;
    if (!data.CreatedAt) data.CreatedAt = new Date().toISOString();
    this.CreatedAt = data.CreatedAt;
  }
};
