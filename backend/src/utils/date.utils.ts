export function convertToIST(date: string): string {
  return new Date(date).toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata' 
  });
}

export function addSecondsToIST(dateInput: string | Date, secondsToAdd: number): Date {
  const date = new Date(typeof dateInput === 'string' ? dateInput : dateInput.getTime());
  date.setSeconds(date.getSeconds() + secondsToAdd);
  return date;
}

export function formatDateToIST(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.error('Invalid date provided:', date);
    return 'Invalid Date';
  }
  
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(date);
}

export function epochToIST(epochTimestamp: number) {
  if (epochTimestamp.toString().length <= 10) {
    epochTimestamp = epochTimestamp * 1000;
  }
  
  const date = new Date(epochTimestamp);
  
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  }).format(date);
}
