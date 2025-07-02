const formatDateWithZeros = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0"); // 01-31
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 01-12
  const year = date.getFullYear(); // 2025

  const hours = String(date.getHours()).padStart(2, "0"); // 00-23
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 00-59

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export default formatDateWithZeros;
