console.log("New deployment running");

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/* ---------------- IN MEMORY STORAGE ---------------- */

let products = [];

/* ---------------- TEST ROUTE ---------------- */

app.get("/test", (req, res) => {
  res.send("Render deployment working");
});

/* ---------------- HOME PAGE ---------------- */

app.get("/", (req, res) => {

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
});

/* ---------------- GET PRODUCTS ---------------- */

app.get("/api/products", (req, res) => {
  res.json(products);
});

/* ---------------- CREATE PRODUCT ---------------- */

app.post("/api/products", (req, res) => {

  const product = req.body;

  products.push(product);

  res.json({
    message: "Product added successfully",
    product
  });

});

/* ---------------- SERVER ---------------- */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});