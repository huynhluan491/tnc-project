const ProductDAO = require("../DAO/ProductDAO");
const CategoryDAO = require("../DAO/CategoryDAO");
// const ProductSchema = require("../model/Product");
const path = require("path");
const fs = require("fs");
const DTOProduct = require("../DTO/Default/DTOProduct");
exports.getProducts = async (req, res) => {
  console.log("req.query", req.query);
  if (req.query.categoryName) {
    const cateid = await CategoryDAO.getCategoryIdByName(
      req.query["categoryName"]
    );
    req.query.categoryID = cateid;

    delete req.query.categoryName;
  }
  try {
    const products = await ProductDAO.getAllProducts(req.query);
    res.status(200).json({
      Code: 200,
      Msg: null,
      Data: products,
    });
  } catch (err) {
    res.status(500).json({
      Code: 500,
      Msg: `FAIL with ${err}`,
    });
  }
};

exports.getProductById = async (req, res) => {
  // console.log("req.params", req.params);
  const id = req.params.id * 1;
  try {
    const product = await ProductDAO.getProductById(id);
    if (!product) {
      return res
        .status(404) //NOT FOUND
        .json({
          Code: 404,
          Msg: `Not found product with Id ${id}!`,
        });
    }
    return res.status(200).json({
      Code: 200,
      Msg: null,
      Data: product,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      Code: 500,
      Msg: e,
    });
  }
};

exports.createNewProduct = async (req, res) => {
  const newProduct = req.body;
  const dto = new DTOProduct(newProduct);
  try {
    let product = await ProductDAO.getProductByName(dto.Name);
    if (product) {
      return res
        .status(403) //Forbidden
        .json({
          Code: 403,
          Msg: `Product name duplicate!`,
        });
    }
    await ProductDAO.createNewProduct(dto);
    product = await ProductDAO.getProductByName(dto.Name);
    product && (await ProductDAO.createNewRating(product));
    // console.log(`Created new product successfully!`);
    return res.status(200).json({
      Code: 200,
      Msg: null,
      Data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      Code: 500,
      Msg: `Product create failed`,
    });
  }
};

exports.deleteById = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const product = await ProductDAO.getProductById(id);
    if (!product) {
      return res
        .status(404) //NOT FOUND
        .json({
          Code: 404,
          Msg: `Product with Id ${id} not found!`,
        });
    }
    await ProductDAO.deleteProductById(id);
    return res.status(200).json({
      Code: 200,
      Msg: null,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      Code: 500,
      Msg: e,
    });
  }
};

exports.deleteMultipleProductById = async (req, res) => {
  const idList = req.query.id;
  try {
    if (!idList || idList.length === 0) {
      return res.status(403).json({
        Code: 403,
        Msg: `Invalid ids`,
      });
    }
    await ProductDAO.deleteMultipleProductById(idList);
    return res.status(200).json({
      Code: 200,
      Msg: null,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      Code: 500,
      Msg: `Delete products with id ${idList} failed!`,
    });
  }
};

exports.getProductNonPaginate = async (req, res) => {
  try {
    const products = await ProductDAO.getProductsNotPagination(req.query);
    if (!products) {
      return res
        .status(404) //NOT FOUND
        .json({
          Code: 404,
          Msg: `Products list not found!`,
        });
    }
    return res.status(200).json({
      Code: 200,
      Msg: null,
      Data: products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      Code: 500,
      Msg: e,
    });
  }
};

exports.updateProductById = async (req, res) => {
  // console.log("Id update", req.params.id);
  const id = req.params.id * 1;
  try {
    const updateInfo = req.body;
    let product = await ProductDAO.getProductById(id);
    if (!product) {
      return res.status(404).json({
        Code: 404,
        Msg: `Not found product with Id ${id}!`,
      });
    }
    await ProductDAO.updateProductById(id, updateInfo);
    product = await ProductDAO.getProductById(id);
    return res.status(200).json({
      Code: 200,
      Msg: null,
      Data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      Code: 500,
      Msg: `Update product with id: ${id} failed!`,
    });
  }
};

const Blob = require("buffer");
exports.getFileProductImage = (req, res) => {
  let imageName = req.params.imageName;
  const dirPath = path.join(
    __dirname,
    "..",
    "dev-Data",
    "productImages"
    // imageName + ".jpg"
  );
  // fs.readdir(dirPath, (err, files) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   const matchingFile = files.find((file) => file.startsWith(imageName));
  //   if (matchingFile) {
  //     const imagePath = path.join(dirPath, matchingFile);
  //     // console.log(`Found file: ${imagePath}`);
  //     const imageStream = fs.createReadStream(imagePath);
  //     imageStream.pipe(res);
  //   }

  // });
  const imagePath =
    "C:\\Users\\ADMIN\\Desktop\\PJTNC\\server\\dev-Data\\productImages\\image1.jpg";
  fs.readFile(imagePath, (err, data) => {
    const base64Data = Buffer.from(data).toString("base64");
    const dataUrl = `data:image/jpeg;base64,${base64Data}`;
    const blob = base64ToBlob(dataUrl);
    const url = URL.createObjectURL(blob);
    res.status(200).json({imageUrl: url});
  });
  // const binaryString = atob(result);
  // const blob = new Blob([binaryString], {type: "image/png"});
  // const blobUrl = URL.createObjectURL(blob);
};
function base64ToBlob(base64Data) {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray]);
}

exports.saveFileProductImage = async (req, res) => {
  let infor = req.body;
  const imagePath = path.join(
    __dirname,
    "..",
    "dev-Data",
    "productImages",
    infor.imageName
  );
  const buffer = Buffer.from(infor.blob, "base64");
  fs.writeFile(imagePath, buffer, (err) => {
    if (err) {
      // console.error(err);
      res.status(500).json({error: "Failed to save the file."});
    } else {
      // console.log("File saved successfully.");
      res.status(200).json({message: "File saved successfully."});
    }
  });
  const Name = infor.imageName;
  img = {
    image: Name,
  };
  await ProductDAO.updateProductById(infor.productID, img);
};
