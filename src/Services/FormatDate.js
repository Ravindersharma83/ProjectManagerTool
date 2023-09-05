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
    if (!inputTime) {
      return ''; // Handle the case when inputTime is undefined or falsy
    }
    const [hours, minutes] = inputTime.split(':');
    const formattedHours = parseInt(hours, 10);
    const formattedMinutes = parseInt(minutes, 10);
    // Determine whether it's AM or PM
    const period = formattedHours < 12 ? 'AM' : 'PM';
    // Convert to 12-hour format and format the time
    const formattedTime =(formattedHours % 12 || 12) + ':' + (formattedMinutes < 10 ? '0' : '') + formattedMinutes + ' ' + period;
  
    return formattedTime;
  }

export function formatDateString(inputDate) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString(undefined, options);
  return formattedDate;
}