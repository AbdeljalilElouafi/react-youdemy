import { useState } from 'react';
import CategoryForm from './CategoryForm';
import api from '../../services/api';

const CategoryList = ({ categories, refreshList }) => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await api.delete(`/categories/${id}`);
        refreshList();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete category');
      }
    }
  };

  return (
    <div className="category-container">
      <div className="header">
        <h1>Categories</h1>
        <button 
          onClick={() => {
            setEditingCategory(null);
            setShowForm(true);
          }}
          className="add-btn"
        >
          Add Category
        </button>
      </div>

      {showForm && (
        <CategoryForm
          category={editingCategory}
          onSuccess={() => {
            setShowForm(false);
            refreshList();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="category-list">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <div className="category-info">
              <h3>{category.name}</h3>
              {category.parent_id && (
                <p>Parent ID: {category.parent_id}</p>
              )}
            </div>
            
            <div className="category-actions">
              <button 
                onClick={() => {
                  setEditingCategory(category);
                  setShowForm(true);
                }}
                className="edit-btn"
              >
                Edit
              </button>
              
              <button 
                onClick={() => handleDelete(category.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;