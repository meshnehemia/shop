const Product = require('../models/products');

const Category = require('../models/category');

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, ...rest } = req.body;

    // 1. Check if the category exists
    let existingCategory = await Category.findOne({ name: category });

    // 2. If not found, create it
    if (!existingCategory) {
      existingCategory = await Category.create({ name: category });
    }

    // 3. Create the product with reference to the category ID
    const newProduct = await Product.create({
      title,
      description,
      price,
      category: existingCategory._id, // save category as ObjectId
      ...rest,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get One Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
