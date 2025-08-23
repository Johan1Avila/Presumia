import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItemsByCategory, addItemToCategory } from '../firebase/firestore';
import AddItemForm from '../components/AddItemForm';

export default function CategoryDetailPage() {
  const { id } = useParams(); // ID de la categoría
  const [items, setItems] = useState([]);

  // Cargar ítems de la categoría
  useEffect(() => {
    const fetchItems = async () => {
      const data = await getItemsByCategory(id);
      setItems(data);
    };
    fetchItems();
  }, [id]);

  const handleAddItem = async (newItem) => {
    try {
      await addItemToCategory(id, newItem);
      setItems((prevItems) => [...prevItems, newItem]); // Actualiza el estado local
    } catch (error) {
      console.error('Error agregando ítem:', error);
    }
  };

  return (
    <div>
      <h2>Detalles de la Categoría</h2>
      <AddItemForm onAddItem={handleAddItem} />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - ${item.value}
            {item.imageUrl && (
              <div>
                <img src={item.imageUrl} alt={item.name} width={100} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
