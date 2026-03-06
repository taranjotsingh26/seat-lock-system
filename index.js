console.log("New deployment running");

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/* ---------------- MONGODB CONNECTION ---------------- */

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ---------------- SCHEMA ---------------- */

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  avgRating: Number,

  variants: [
    {
      sku: String,
      color: String,
      price: Number,
      stock: Number
    }
  ],

  reviews: [
    {
      rating: Number,
      comment: String
    }
  ]
});

const Product = mongoose.model("Product", productSchema);

/* ---------------- TEST ROUTE ---------------- */

app.get("/test", (req, res) => {
  res.send("Render deployment working");
});

/* ---------------- HOME PAGE ---------------- */

app.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    let html = `<h1>Ecommerce Catalog</h1>`;

    products.forEach(p => {
      html += `
      <div style="border:1px solid #ccc;padding:10px;margin:10px">
        <h2>${p.name}</h2>
        <p><b>Category:</b> ${p.category}</p>
        <p><b>Avg Rating:</b> ${p.avgRating}</p>

        <h3>Variants</h3>
        <ul>
      `;

      p.variants.forEach(v => {
        html += `
        <li>
        ${v.color} | SKU: ${v.sku} | Price: $${v.price} | Stock: ${v.stock}
        </li>
        `;
      });

      html += "</ul><h3>Reviews</h3><ul>";

      p.reviews.forEach(r => {
        html += `<li>${r.rating}⭐ - ${r.comment}</li>`;
      });

      html += "</ul></div>";
    });

    res.send(html);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

/* ---------------- GET PRODUCTS ---------------- */

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- CREATE PRODUCT ---------------- */

app.post("/api/products", async (req, res) => {
  try {

    const product = new Product(req.body);
    await product.save();

    res.json({
      message: "Product created successfully",
      product
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/book/:id", (req, res) => {
  const seatId = req.params.id;

  res.json({
    message: `Seat ${seatId} booked successfully`
  });
});
/* ---------------- SERVER ---------------- */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});