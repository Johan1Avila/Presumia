import { useParams } from 'react-router-dom';

function Items() {
  const { categoryId } = useParams();

  return (
    <div>
      <h2>Items de la categoría: {categoryId}</h2>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </div>
  );
}

export default Items;
