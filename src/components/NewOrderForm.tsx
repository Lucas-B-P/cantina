import React, { useState } from 'react';

interface NewOrderFormProps {
  onSubmit: (itemName: string, quantity: number, price: number) => Promise<void>;
}

export function NewOrderForm({ onSubmit }: NewOrderFormProps) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');

  const handleSubmit = async () => {
    const quantityNum = parseInt(quantity, 10);
    const priceNum = parseFloat(price);
    
    if (!isNaN(quantityNum) && !isNaN(priceNum)) {
      await onSubmit(itemName || 'Item sem nome', quantityNum, priceNum);
      setItemName('');
      setQuantity('1');
      setPrice('');
    }
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Adicionar Pedido</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Nome do item (opcional)"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          min="1"
          placeholder="Qtd"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full sm:w-24 p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full sm:w-32 p-2 border border-gray-300 rounded-lg"
          required
        />
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}