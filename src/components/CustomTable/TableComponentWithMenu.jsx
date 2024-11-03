import React, { useState, useMemo, useRef, useEffect } from 'react';
import DropdownMenu from "./DropDownMenu";

const TableComponentWithMenu = ({ data, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  
  const menuRef = useRef(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    const sortedArray = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
    return sortedArray;
  }, [data, sortConfig]);

  const filteredData = sortedData.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleClickOutside = (event) => {
    // Close the menu if the click is outside the menu
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenuIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="table-container">
      <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />

      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} onClick={() => handleSort(key)}>
                {key} {sortConfig?.key === key ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((val, i) => (
                <td key={i}>{val}</td>
              ))}
              <td>
                <button onClick={() => toggleMenu(index)}>Menu</button>
                {openMenuIndex === index && (
                  <div ref={menuRef}>
                    <DropdownMenu
                      onEdit={() => onEdit(index)}
                      onDelete={() => {
                        onDelete(index);
                        setOpenMenuIndex(null); // Close the menu after action
                      }}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponentWithMenu;
