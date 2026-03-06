console.log("New deployment running");
const express = require("express");
require("./db");

const Product = require("./models/product");

const app = express();
const PORT = process.env.PORT || 3000;
app.get("/test", (req,res)=>{
  res.send("Render deployment working");
});

// HOME PAGE (HTML view)
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
    res.send(err.message);
  }
});


// API ROUTE (JSON)
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});