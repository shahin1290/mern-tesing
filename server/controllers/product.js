import ProductModal from "../models/product.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
  const product = req.body;
  const newProduct = new ProductModal({
    ...product,
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getProducts = async (req, res) => {
  const { page } = req.query;
  try {
    // const products = await ProductModal.find();
    // res.status(200).json(products);

    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await ProductModal.countDocuments({});
    const products = await ProductModal.find().limit(limit).skip(startIndex);
    res.json({
      data: products,
      currentPage: Number(page),
      totalProducts: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModal.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No Product exist with id: ${id}` });
    }
    await ProductModal.findByIdAndRemove(id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No Product exist with id: ${id}` });
    }

    const updatedProduct = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await ProductModal.findByIdAndUpdate(id, updatedProduct, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};