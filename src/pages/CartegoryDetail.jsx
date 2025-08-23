import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getCategoryById,
  getItemsByCategory,
  addItemToCategory,
} from '../firebase/firestore';
import AddItemForm from '../components/AddItemForm';

export default function CategoryDetailPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategoryById(id);
      setCategory(data);
    };

    const fetchItems = async () => {
      const data = await getItemsByCategory(id);
      setItems(data);
    };

    fetchCategory();
    fetchItems();
  }, [id]);

  const handleAddItem = async (newItem) => {
    await addItemToCategory(id, newItem);
    const updatedItems = await getItemsByCategory(id);
    setItems(updatedItems);
  };

  if (!category) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{category.name}</h2>
      <p>{category.description}</p>

      <h3>Agregar ítem</h3>
      <AddItemForm onAddItem={handleAddItem} />

      <h3>Ítems</h3>
      {items.length === 0 ? (
        <p>No hay ítems aún.</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            style={{ border: '1px solid #ccc', padding: '8px', margin: '8px' }}
          >
            <img src={item.imageUrl} alt={item.name} width={80} />
            <h4>{item.name}</h4>
            <p>Valor: ${item.value}</p>
          </div>
        ))
      )}
    </div>
  );
}
