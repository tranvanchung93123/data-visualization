import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateFilter = ({ dateRange, onDateChange }) => (
  <DatePicker
    selectsRange
    startDate={dateRange[0]}
    endDate={dateRange[1]}
    onChange={(update) => onDateChange(update)}
    isClearable={true}
  />
);

export default DateFilter;
