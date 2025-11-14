// Google Sheets CSV Service
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRmdFLM2dd1tJrsW8OIZL1s1sFtqnQo653m7B8aB3G44Cw39rIds8mg-D10s-XVyz7wLcoleZ62_R83/pub?gid=1883950162&single=true&output=csv';

export const fetchFundingIncomeData = async () => {
  try {
    // Add cache-busting parameter to ensure fresh data
    const response = await fetch(`${CSV_URL}&t=${Date.now()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    const lines = csvText.trim().split('\n');
    
    if (lines.length < 2) {
      throw new Error('No data found in CSV');
    }
    
    // Helper function to parse Indonesian currency format
    const parseCurrency = (value) => {
      if (!value) return 0;
      
      // Remove currency symbols, quotes, and format
      // Handle formats like: "Rp120,000,000", Rp0, "Rp2,704,000"
      const cleanValue = value
        .replace(/"/g, '')           // Remove quotes
        .replace(/Rp/g, '')          // Remove Rupiah symbol
        .replace(/,/g, '')           // Remove thousand separators
        .replace(/%/g, '')           // Remove percentage symbol
        .trim();
      
      const number = parseFloat(cleanValue) || 0;
      return Math.floor(number); // Or Math.round(number) if rounding is preferred
    };
    
    // Parse CSV with proper handling of quoted values
    const data = lines.slice(1).map(line => {
      // Handle CSV parsing with quoted values that contain commas
      const values = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            current += '"';
            i++; // Skip the next quote
          } else {
            inQuotes = !inQuotes;
          }
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim()); // Add the last value
      
      return {
        name: values[0] || 'Unknown',
        amount: parseCurrency(values[1]),
        realisasi: parseCurrency(values[2])
      };
    }).filter(item => item.name && item.name !== 'Unknown');
    
    console.log('Fetched funding data from Google Sheets:', data);
    return data;
    
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    // Return null on error - component will handle fallback
    return null;
  }
};

// Helper function to validate data structure
export const validateFundingData = (data) => {
  if (!Array.isArray(data)) return false;
  
  return data.every(item => 
    typeof item.name === 'string' &&
    typeof item.amount === 'number' &&
    typeof item.realisasi === 'number' &&
    item.name.length > 0
  );
};