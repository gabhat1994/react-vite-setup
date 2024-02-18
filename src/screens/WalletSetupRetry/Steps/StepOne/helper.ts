export const calculateAge = (birthday: string | number | null) => {
  const ageDifMs = Date.now() - new Date(birthday!).getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
