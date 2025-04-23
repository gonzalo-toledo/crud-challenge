import React, { useState } from "react";
import initialProducts from "./ProductData";

const ProductView = () => {
  const [productList, setProductList] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null); // Producto en edición
  const [formData, setFormData] = useState({ name: "", price: "" }); // Datos del form

  const handleDelete = (id) => {
    const updated = productList.filter((product) => product.id !== id);
    setProductList(updated);
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({ name: product.name, price: product.price });
  };

  const handleUpdate = () => {
    const updatedList = productList.map((product) =>
      product.id === editingProduct.id
        ? { ...product, name: formData.name, price: formData.price }
        : product
    );
    setProductList(updatedList);
    setEditingProduct(null);
    setFormData({ name: "", price: "" });
  };

  const handleCreate = () => {
    const newProduct = {
      id: productList.length + 1,
      name: formData.name,
      price: formData.price,
    };
    setProductList([...productList, newProduct]);
    setFormData({ name: "", price: "" });

  };

  return (
    <div>
      <h1>Productos</h1>
      <ul>
      <input
        type="text"
        placeholder="Nombre"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
      />

        <button onClick={() => handleCreate()}>Agregar</button>
      </ul>
      <ul>
        {productList.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - $<strong>{product.price}</strong>
            <button onClick={() => startEdit(product)}>Editar</button>
            <button onClick={() => handleDelete(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {editingProduct && (
        <div style={{ marginTop: "20px", border: "1px solid gray", padding: "10px" }}>
          <h2>Editando producto: {editingProduct.name}</h2>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nombre"
          />
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            placeholder="Precio"
          />
          <button onClick={handleUpdate}>Guardar</button>
        </div>
      )}
    </div>
  );
};

export default ProductView;
