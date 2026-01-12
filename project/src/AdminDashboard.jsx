import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); 
  const [formData, setFormData] = useState({ id: '', category: 'cat_cpu_intel', name: '', price: '' });
  const [isEditing, setIsEditing] = useState(false);

  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userStr);
    
    
    if (user.role.toLowerCase() !== 'admin') {
      alert("Access Denied: Admins Only");
      navigate('/');
    } else {
      fetchAllProducts();
    }
  }, [navigate]);

  
  const fetchAllProducts = async () => {
    try {
      const res = await fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/customize');
      const data = await res.json();
      
      let allProds = [];
      data.forEach(cat => {
        cat.products.forEach(p => {
          allProds.push({ ...p, categoryId: cat.id, categoryName: cat.name });
        });
      });
      setProducts(allProds);
    } catch (err) { console.error(err); }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    
    await fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/admin/products', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    alert(isEditing ? "Updated!" : "Added!");
    setFormData({ id: '', category: 'cat_cpu_intel', name: '', price: '' });
    setIsEditing(false);
    fetchAllProducts();
  };

  
  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    
    await fetch(`http://localhost:8080/servlet_jsx_playground_war_exploded/api/admin/products?id=${id}`, {
      method: 'DELETE'
    });
    fetchAllProducts();
  };

  
  const handleEdit = (prod) => {
    setFormData({
      id: prod.id,
      category: prod.categoryId,
      name: prod.name,
      price: prod.price
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ id: '', category: 'cat_cpu_intel', name: '', price: '' });
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Manage Products</h1>      
      <div className="admin-form-container">
        <h3 className="form-title">{isEditing ? "Edit Product" : "Add New Product"}</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <input 
            className="admin-input"
            placeholder="Product ID (e.g. i9_14900)" 
            value={formData.id} 
            onChange={e => setFormData({...formData, id: e.target.value})}
            disabled={isEditing} 
            required 
          />
          <select 
            className="admin-select"
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
          >
             <option value="cat_cpu_intel">Intel CPU</option>
             <option value="cat_cpu_amd">AMD CPU</option>
             <option value="cat_cooler">Cooler</option>
             <option value="cat_mobo_intel">Mobo Intel</option>
             
          </select>
          <input 
            className="admin-input input-name"
            placeholder="Product Name" 
            value={formData.name} 
            onChange={e => setFormData({...formData, name: e.target.value})}
            required 
          />
          <input 
            className="admin-input"
            placeholder="Price" 
            type="number"
            value={formData.price} 
            onChange={e => setFormData({...formData, price: e.target.value})}
            required 
          />
          
          <button type="submit" className="submit-btn">
            {isEditing ? "Update" : "Add"}
          </button>
          
          {isEditing && (
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          )}
        </form>
      </div>

      
      <table className="products-table">
        <thead>
          <tr className="table-head-row">
            <th className="table-header">ID</th>
            <th className="table-header">Name</th>
            <th className="table-header">Price</th>
            <th className="table-header action-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="table-row">
              <td className="table-cell">{p.id}</td>
              <td className="table-cell">{p.name}</td>
              <td className="table-cell">RM {p.price}</td>
              <td className="table-cell action-cell">
                <button onClick={() => handleEdit(p)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;