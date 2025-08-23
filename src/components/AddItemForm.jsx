import { useState } from 'react';
import { uploadImage } from '../firebase/storageHelper';

export default function AddItemForm({ onAddItem }) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    if (image) {
      imageUrl = await uploadImage(image);
    }

    const newItem = {
      name,
      value: parseFloat(value),
      imageUrl,
    };

    onAddItem(newItem);
    setName('');
    setValue('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del ítem"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Valor"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Agregar Ítem</button>
    </form>
  );
}
