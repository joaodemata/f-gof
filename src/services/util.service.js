import React from 'react';

function useLocalStorage(_itemName, _initialValue) {
  const [item, setItem] = React.useState(_initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(_itemName);

        if (localStorageItem) {
          setItem(JSON.parse(localStorageItem));
        } else {
          localStorage.setItem(_itemName, JSON.stringify(item));
        }

        setLoading(false);
      } catch (_error) {
        setLoading(false);
        setError(true);
      }
    }, 2000);
  }, []);

  const saveItem = (newItems) => {
    localStorage.setItem(_itemName, JSON.stringify(newItems));

    setItem(newItems);
  };

  return { item, saveItem, loading, error };
}

export { useLocalStorage };

// const defaultTODOS = [
//   { text: 'primera tarea', completed: true },
//   { text: 'segunda tarea', completed: false },
//   { text: 'tercera tarea', completed: true },
//   { text: 'cuarta tarea', completed: true },
//   { text: 'quinta tarea', completed: true },
//   { text: 'sexta tarea', completed: true },
// ];

// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTODOS));
// localStorage.getItem()
// localStorage.removeItem()
