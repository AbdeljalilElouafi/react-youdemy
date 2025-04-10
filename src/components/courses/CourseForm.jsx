import { useState, useEffect } from 'react';
import api from '../../services/api';

const CourseForm = ({ course, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: course?.name || '',
    description: course?.description || '',
    duration: course?.duration || 60,
    difficulty_level: course?.difficulty_level || 'beginner',
    price: course?.price || 0,
    category_id: course?.category_id || '',
    mentor_id: course?.mentor_id || ''
  });
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data.categories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = {
        name: formData.name,
        description: formData.description,
        duration: parseInt(formData.duration),
        difficulty_level: formData.difficulty_level,
        price: parseInt(formData.price),
        category_id: parseInt(formData.category_id),
        mentor_id: parseInt(formData.mentor_id)
      };

      let response;
      if (course) {
        response = await api.put(`/courses/${course.id}`, data);
      } else {
        response = await api.post('/courses', data);
      }

      onSuccess(response.data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 
                      err.response?.data?.error ||
                      err.message ||
                      'An error occurred';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{course ? 'Edit Course' : 'Add New Course'}</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        {/* Name field */}
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Description field */}
        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>
        
        {/* Duration field */}
        <div className="form-group">
          <label>Duration (minutes) *</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        
        {/* Difficulty level */}
        <div className="form-group">
          <label>Difficulty Level *</label>
          <select
            name="difficulty_level"
            value={formData.difficulty_level}
            onChange={handleChange}
            required
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        
        {/* Price field */}
        <div className="form-group">
          <label>Price *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        
        {/* Category dropdown */}
        <div className="form-group">
          <label>Category *</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        
        {/* Mentor ID input */}
        <div className="form-group">
          <label>Mentor ID *</label>
          <input
            type="number"
            name="mentor_id"
            value={formData.mentor_id}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Save'}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;