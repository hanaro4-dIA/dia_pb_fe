export default function changeDateFormat(elem: string) {
  const formattedDate = elem.replace(/-/g, '.');
  return formattedDate;
}
