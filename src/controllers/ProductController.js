const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const Product = require("../models/Product");

class ProductController {
  async insert(req, res) {
    const { title, description, price } = req.body;

    const { filename: image } = req.file;
    const [name] = image.split(".");
    const filename = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, "resized", filename));

    fs.unlinkSync(req.file.path);

    try {
      const product = await Product.create({
        image: filename,
        title,
        description,
        price
      });

      req.io.emit("Product", product);

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({
        message: `There was a problem creating a Product: ${error}`
      });
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(404).json({ message: "The ID informed is invalid" });
    }
  }

  async getAll(req, res) {
    try {
      const product = await Product.find().sort("-createdAt");
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  async removeOne(req, res) {}
}

module.exports = new ProductController();
