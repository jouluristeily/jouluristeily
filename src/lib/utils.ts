export function UTCtoTime(utcString: string) {
  const date = new Date(utcString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
