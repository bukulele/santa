function getStatusForDay(day) {
  const today = new Date().getDate();
  if (day > today) return "locked";
  if (day === today) return "available";
  return "done";
}

export default getStatusForDay;
