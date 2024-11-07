import { useState, useEffect } from 'react';
import { parseCSV, calculateYearlyAverage } from '../utils/dataParser';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import ChartComponent from '../components/ChartComponent';

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import('../components/MapComponent'), { ssr: false });

const HomePage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [chartType, setChartType] = useState('bar');
  const [normalized, setNormalized] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [yearlyAverage, setYearlyAverage] = useState(0);

  useEffect(() => {
    parseCSV('/data/Footfall 1.csv').then(parsedData => {
      setData(parsedData);
      setYearlyAverage(calculateYearlyAverage(parsedData));
      setFilteredData(parsedData);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      const [start, end] = dateRange;
      setFilteredData(filterDataByDateRange(data, start, end));
    } else {
      setFilteredData(data);
    }
  }, [dateRange, data]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <Header
            chartType={chartType}
            setChartType={setChartType}
            normalized={normalized}
            setNormalized={setNormalized}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </div>
      </div>
      <div className="row my-4">
        <div className="col-12">
          <ChartComponent
            data={filteredData}
            normalized={normalized}
            chartType={chartType}
            yearlyAverage={yearlyAverage}
          />
        </div>
      </div>
      <div className="row my-4">
        <div className="col-12">
          <h2 className="text-center mb-3">Map Displaying GeoJSON Data</h2>
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
