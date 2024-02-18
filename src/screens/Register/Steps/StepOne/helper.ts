export const eclipseName = (name: string, eclipseLength: number) => {
  // Check if the inputString length is less than or equal to eclipseLength
  if (name.length <= eclipseLength) {
    return name;
  }
  // Check if there is a space within eclipseLength characters
  const lastSpaceIndex = name.lastIndexOf(' ', eclipseLength);
  // Determine the position to truncate the string
  const truncatePosition = lastSpaceIndex >= 0 ? lastSpaceIndex : eclipseLength;
  // Truncate the string and add an ellipsis
  const truncatedString = `${name.slice(0, truncatePosition)}...`;
  return truncatedString;
};
