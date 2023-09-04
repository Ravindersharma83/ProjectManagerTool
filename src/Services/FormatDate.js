export function formatDate(inputDate) {
    const dateObj = new Date(inputDate);
    return dateObj.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  }

export function formatTimeString(inputTime) {
  const [hours, minutes, seconds] = inputTime.split(':');
  const formattedTime = new Date(0, 0, 0, hours, minutes, seconds);

  const options = {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  return formattedTime.toLocaleTimeString(undefined, options);
}

export function formatDateString(inputDate) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString(undefined, options);
  return formattedDate;
}