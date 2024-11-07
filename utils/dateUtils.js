export const filterDataByDateRange = (data, startDate, endDate) => {
    return data.filter(d => {
      const date = new Date(d.date);
      return date >= startDate && date <= endDate;
    });
  };
  