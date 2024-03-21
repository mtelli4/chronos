import React from 'react';
import { CSVLink } from 'react-csv';

const CSVExportPage = ({setHeaderVisibility}) => {
  React.useEffect(() => {
    setHeaderVisibility();
  });

  const data = [ // les lignes/data
    { name: 'John Doe', age: 30, email: 'john.doe@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
    { name: 'Bob Johnson', age: 35, email: 'bob.johnson@example.com' },
  ];

  const headers = [ //Les nom des colonnes
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Email', key: 'email' },
  ];

  return (
    <div>
      <h1>CSV Export Page</h1>
      <CSVLink data={data} headers={headers} filename={'example.csv'}>
        Export to CSV
      </CSVLink>
    </div>
  );
};

export default CSVExportPage;
