
import './App.css';
import React, { useState } from 'react';
import CustomDialog from "./components/CustomDialog/CustomDialog"
import TableComponent from "./components/CustomTable/TableComponent";
import TableComponentWithMenu from './components/CustomTable/TableComponentWithMenu';

function App() {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [data, setData] = useState([
    { name: 'Alice', age: 25, city: 'New York' },
    { name: 'Bob', age: 30, city: 'Chicago' },
    // more data here
  ]);

  const handleDelete = (indexToDelete) => {
    setData((prevData) => prevData.filter((_, index) => index !== indexToDelete));
  };

  const handleEdit = (indexToEdit) => {
    // Handle editing logic here (e.g., open a modal or redirect to an edit page)
    alert(`Editing item at index: ${indexToEdit}`);
  };

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    console.log('Form Data:', formData);
    handleCloseDialog(); // Close dialog on submit
  };

  return (
    <div className="App">
       <button onClick={handleOpenDialog}>Open Dialog</button>
       <TableComponent data={data} onDelete={handleDelete} />
       <TableComponentWithMenu data={data} onEdit={handleEdit} onDelete={handleDelete} />
      <CustomDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </CustomDialog>
    
    </div>
  );
}

export default App;
