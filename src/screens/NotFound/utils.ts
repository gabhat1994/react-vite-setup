const formatTime = (timeString: string) => {
  const [hourString, minute] = timeString.split(':');
  const hour = +hourString % 24;
  return `${hour % 12 || 12}:${minute < '10' ? `0${minute}` : minute} ${
    hour < 12 ? 'AM' : 'PM'
  }`;
};

export const getFinalTime = (eventDate: Date) => {
  const hours = eventDate.getHours();
  const minutes = eventDate.getMinutes();
  const finalTime = `${hours}:${minutes}`;
  return formatTime(finalTime);
};
