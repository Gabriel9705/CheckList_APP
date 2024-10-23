import { useState } from 'react';

const items = [
  { id: 1, name: 'Item 1', category: 'A' },
  { id: 2, name: 'Item 2', category: 'B' },
  { id: 3, name: 'Item 3', category: 'A' },
  { id: 4, name: 'Item 4', category: 'C' },
  { id: 5, name: 'Item 5', category: 'B' },
];

const FilterWithSelect = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Função para filtrar os itens com base na categoria selecionada
  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <div className="container mt-4">
      <h3>Filtro de Itens</h3>
      <div className="mb-3">
        <label htmlFor="categorySelect" className="form-label">Filtrar por Categoria</label>
        <select
          id="categorySelect"
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="A">Categoria A</option>
          <option value="B">Categoria B</option>
          <option value="C">Categoria C</option>
        </select>
      </div>

      <ul className="list-group">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <li key={item.id} className="list-group-item">
              {item.name} - Categoria: {item.category}
            </li>
          ))
        ) : (
          <li className="list-group-item">Nenhum item encontrado</li>
        )}
      </ul>
    </div>
  );
};

export default FilterWithSelect;
