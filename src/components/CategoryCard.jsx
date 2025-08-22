import React from 'react';

function CategoryCard({ category, onEdit, onDelete }) {
  return (
    <div className="category-card">
      <strong>{category.name}</strong>: {category.description}{' '}
      <button onClick={() => onEdit(category)}>Editar</button>{' '}
      <button onClick={() => onDelete(category.id)}>Eliminar</button>
    </div>
  );
}

export default CategoryCard;
