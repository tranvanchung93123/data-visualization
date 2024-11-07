import Papa from 'papaparse';

export const parseCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      delimiter: ';', // Specify semicolon as the delimiter
      complete: (results) => {
        const parsedData = results.data
          .map(row => {
            if (row['Time'] && typeof row['Time'] === 'string') {
              const date = row['Time'].split('T')[0]; // Extract date only
              const footfall = row['Value'] ? parseInt(row['Value'], 10) : null;

              if (date && footfall !== null) {
                return { date, footfall };
              }
            }
            return null; // Skip rows with invalid data
          })
          .filter(row => row !== null); // Filter out null entries

        resolve(parsedData);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        reject(error);
      },
    });
  });
};

export const calculateYearlyAverage = (data) => {
  const total = data.reduce((sum, row) => sum + row.footfall, 0);
  return data.length > 0 ? total / data.length : 0; // Avoid division by zero
};
