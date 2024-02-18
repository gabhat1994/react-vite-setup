export const getDifferenceInDays = (
  firstDateString: string,
  secondDateString: string,
) => {
  const firstDay = new Date(firstDateString);
  const secondDay = new Date(secondDateString);
  const DifferenceInTime = firstDay.getTime() - secondDay.getTime();
  return Math.floor(DifferenceInTime / (1000 * 3600 * 24));
};
