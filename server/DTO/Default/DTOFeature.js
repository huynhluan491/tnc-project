module.exports = class DTOFeature {
  constructor(data) {
    this.FeatureID = data.FeatureID;
    this.Feature = data.Feature;
    this.ProductID = data.ProductID;
    if (!data.CreatedAt) data.CreatedAt = new Date().toISOString();
    this.CreatedAt = data.CreatedAt;
  }
};
