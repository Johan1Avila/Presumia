export default function CategoryCard({ category, onEdit, onDelete }) {
  return (
    <li>
      <strong>{category.name}</strong>: {category.description}{' '}
      <button onClick={() => onEdit(category)}>Editar</button>{' '}
      <button onClick={() => onDelete(category.id)}>Eliminar</button>
    </li>
  );
}
