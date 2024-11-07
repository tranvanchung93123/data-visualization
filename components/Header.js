import React from 'react';

const Header = ({ chartType, setChartType, normalized, setNormalized, dateRange, setDateRange }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="btn-group" role="group">
        <button
          type="button"
          className={`btn ${chartType === 'bar' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setChartType('bar')}
        >
          Bar Chart
        </button>
        <button
          type="button"
          className={`btn ${chartType === 'line' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setChartType('line')}
        >
          Line Chart
        </button>
      </div>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="normalizeSwitch"
          checked={normalized}
          onChange={() => setNormalized(!normalized)}
        />
        <label className="form-check-label" htmlFor="normalizeSwitch">
          Normalize
        </label>
      </div>
    </div>
  );
};

export default Header;
