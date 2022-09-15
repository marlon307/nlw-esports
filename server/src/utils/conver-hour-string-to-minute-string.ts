export function converHourStringToMinutes(hourString: string) {
  const [hours, minutes] = hourString.split(":").map(Number);
  const minutAmount = (hours * 60) + minutes;
  return minutAmount
}
