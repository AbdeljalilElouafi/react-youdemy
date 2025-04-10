import { useState } from 'react';
import CourseForm from './CourseForm';
import api from '../../services/api';

const CourseList = ({ courses, refreshList }) => {
  const [editingCourse, setEditingCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${id}`);
        refreshList();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete course');
      }
    }
  };

  return (
    <div className="course-container">
      <div className="header">
        <h1>Courses</h1>
        <button 
          onClick={() => {
            setEditingCourse(null);
            setShowForm(true);
          }}
          className="add-btn"
        >
          Add Course
        </button>
      </div>

      {showForm && (
        <CourseForm
          course={editingCourse}
          onSuccess={() => {
            setShowForm(false);
            refreshList();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="course-list">
        {courses.map((course) => (
          <div key={course.id} className="course-item">
            <div className="course-info">
              <h3>{course.name}</h3>
              <p>{course.description.substring(0, 100)}...</p>
              <div className="course-meta">
                <span>Duration: {course.duration} mins</span>
                <span>Difficulty: {course.difficulty_level}</span>
                <span>Price: ${course.price}</span>
              </div>
            </div>
            
            <div className="course-actions">
              <button 
                onClick={() => {
                  setEditingCourse(course);
                  setShowForm(true);
                }}
                className="edit-btn"
              >
                Edit
              </button>
              
              <button 
                onClick={() => handleDelete(course.id)}
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

export default CourseList;