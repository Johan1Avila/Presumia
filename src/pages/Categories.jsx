import { useEffect } from 'react';
import { getCategories } from '../firebase/firebaseFirestore';

function Categories() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
      console.log('Categorías:', data);
    };
    fetchData();
  }, []);

  return <h1>Categorías</h1>;
}

export default Categories;
