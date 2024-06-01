import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { FaPlus } from 'react-icons/fa';
import AddItem from './AddItem';
import CategoryScrollBar from './CategoryScrollBar';
import ItemTable from './ItemTable';
import SearchBar from './SearchBar';
import Keyboard from '../../../Components/keyboard';
import UpdateItem from './UpdateItem';
import ItemDetailView from './ItemDetailView'; // Import the ItemDetailView component

const ManagementProductPage = () => {
  const [categories] = useState([
    { name: 'Category 1', image: 'https://via.placeholder.com/100' },
    { name: 'Category 2', image: 'https://via.placeholder.com/100' },
    { name: 'Category 3', image: 'https://via.placeholder.com/100' },
  ]);

  const [items, setItems] = useState([
    { id: 1, photo: 'https://via.placeholder.com/64', title: 'Item 1', price: 10.0, category: 'Category 1', cardAmount: 5 },
    { id: 2, photo: 'https://via.placeholder.com/64', title: 'Item 2', price: 20.0, category: 'Category 2', cardAmount: 10 },
    { id: 3, photo: 'https://via.placeholder.com/64', title: 'Item 3', price: 30.0, category: 'Category 3', cardAmount: 15 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [isUpdateViewOpen, setIsUpdateViewOpen] = useState(false);

  const handleUpdateItem = (updatedItem) => {
    setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
    setSelectedItem(null);
    setIsUpdateViewOpen(false);
  };

  const handleDeleteItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  useEffect(() => {
    if (isModalOpen) {
      setIsKeyboardOpen(false);
    }
  }, [isModalOpen]);

  const handleKeyPress = (key) => {
    if (key === 'Enter') {
      setIsKeyboardOpen(false);
    } else if (key === 'Backspace') {
      setSearchQuery(searchQuery.slice(0, -1));
    } else {
      setSearchQuery(searchQuery + key);
    }
  };

  const handleAddItem = (newItem) => {
    setItems([...items, { id: items.length + 1, ...newItem }]);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toString().includes(searchQuery)
  );

  return (
    <div className="w-[90vw] h-full p-4 overflow-hidden">
      <div onClick={() => setIsKeyboardOpen(false)}>
        <CategoryScrollBar categories={categories} />
      </div>
      <div className="flex justify-end my-4">
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Item
        </Button>
      </div>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onClick={() => setIsKeyboardOpen(!isKeyboardOpen)}
      />
      <div onClick={() => setIsKeyboardOpen(false)}>
        <ItemTable
          items={filteredItems}
          onClick={() => setIsKeyboardOpen(false)}
          onUpdate={(item) => {
            setSelectedItem(item);
            setIsDetailViewOpen(false); // Ensure detail view is closed when updating
            setIsUpdateViewOpen(true);
          }}
          onDelete={handleDeleteItem} // Pass delete function to ItemTable
          onView={(item) => {
            setSelectedItem(item);
            setIsDetailViewOpen(true);
            setIsUpdateViewOpen(false);
          }} // Pass view function to ItemTable
        />
        <AddItem open={isModalOpen} onClose={() => setIsModalOpen(false)} onAddItem={handleAddItem} />
      </div>
      {/* Render the ItemDetailView when an item is selected */}
      {isDetailViewOpen && selectedItem && (
        <ItemDetailView
          item={selectedItem}
          open={isDetailViewOpen}
          onClose={() => setIsDetailViewOpen(false)}
        />
      )}
      {/* Render the UpdateItem when an item is selected */}
      {isUpdateViewOpen && selectedItem && (
        <UpdateItem
          open={isUpdateViewOpen}
          onClose={() => {
            setSelectedItem(null);
            setIsUpdateViewOpen(false);
          }}
          onUpdate={handleUpdateItem}
          item={selectedItem}
        />
      )}
      <div className="fixed bottom-0 right-0">
        {isKeyboardOpen && <Keyboard onKeyPress={handleKeyPress} />}
      </div>
    </div>
  );
};

export default ManagementProductPage;
