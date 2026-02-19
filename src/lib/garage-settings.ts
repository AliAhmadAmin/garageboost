export const COMMON_SERVICES = [
  "MOT Testing", "Full Service", "Interim Service", "Diagnostics", "Brake Service",
  "Oil Change", "Tyres", "Exhausts", "Clutch Repair", "Battery Replacement",
  "Air Conditioning", "Wheel Alignment", "Suspension", "Transmission", "Engine Repair"
];

export const COMMON_SPECIALTIES = [
  "Electric Vehicles (EV)", "Hybrid Vehicles", "Classic Cars", "Performance Tuning",
  "4x4 & Off-Road", "Vans & Light Commercial", "Luxury & Prestige", "Japanese Cars",
  "German Cars", "Italian Cars", "French Cars", "Korean Cars"
];

export const COMMON_CERTIFICATIONS = [
  "IMI Accredited", "Bosch Service", "AA Approved", "RAC Approved",
  "MOT Authorised", "Halfords Autocentre", "Good Garage Scheme",
  "Trust My Garage", "Motor Codes", "Trading Standards Approved"
];

export const COMMON_AMENITIES = [
  "Waiting Area", "Free Wi-Fi", "Coffee & Tea", "Kids Play Area",
  "Courtesy Car", "Collection & Delivery", "Free Parking", "Disabled Access",
  "Air Conditioned", "TV & Magazines"
];

interface DayHours {
  open: string;
  close: string;
  closed: boolean;
}

export interface WeekHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export function parseOpeningHours(hoursString: string | null | undefined): WeekHours {
  const defaultHours: WeekHours = {
    monday: { open: "09:00", close: "17:00", closed: false },
    tuesday: { open: "09:00", close: "17:00", closed: false },
    wednesday: { open: "09:00", close: "17:00", closed: false },
    thursday: { open: "09:00", close: "17:00", closed: false },
    friday: { open: "09:00", close: "17:00", closed: false },
    saturday: { open: "09:00", close: "14:00", closed: false },
    sunday: { open: "09:00", close: "17:00", closed: true },
  };

  if (!hoursString) return defaultHours;

  const lines = hoursString.split('\n');
  const result = { ...defaultHours };

  const dayMap: { [key: string]: keyof WeekHours } = {
    'mon': 'monday', 'monday': 'monday',
    'tue': 'tuesday', 'tues': 'tuesday', 'tuesday': 'tuesday',
    'wed': 'wednesday', 'wednesday': 'wednesday',
    'thu': 'thursday', 'thur': 'thursday', 'thurs': 'thursday', 'thursday': 'thursday',
    'fri': 'friday', 'friday': 'friday',
    'sat': 'saturday', 'saturday': 'saturday',
    'sun': 'sunday', 'sunday': 'sunday',
  };

  lines.forEach(line => {
    const lower = line.toLowerCase().trim();
    if (lower.includes('closed')) {
      Object.keys(dayMap).forEach(key => {
        if (lower.includes(key)) {
          result[dayMap[key]].closed = true;
        }
      });
    } else {
      const timeMatch = line.match(/(\d{1,2}):?(\d{2})\s*(am|pm)?\s*-\s*(\d{1,2}):?(\d{2})\s*(am|pm)?/i);
      if (timeMatch) {
        const [, openHour, openMin, openPeriod, closeHour, closeMin, closePeriod] = timeMatch;
        let open24 = parseInt(openHour);
        let close24 = parseInt(closeHour);
        
        if (openPeriod?.toLowerCase() === 'pm' && open24 !== 12) open24 += 12;
        if (closePeriod?.toLowerCase() === 'pm' && close24 !== 12) close24 += 12;
        if (openPeriod?.toLowerCase() === 'am' && open24 === 12) open24 = 0;
        if (closePeriod?.toLowerCase() === 'am' && close24 === 12) close24 = 0;

        const openTime = `${open24.toString().padStart(2, '0')}:${openMin}`;
        const closeTime = `${close24.toString().padStart(2, '0')}:${closeMin}`;

        Object.keys(dayMap).forEach(key => {
          if (lower.includes(key)) {
            result[dayMap[key]] = { open: openTime, close: closeTime, closed: false };
          }
        });
      }
    }
  });

  return result;
}

export function formatOpeningHours(hours: WeekHours): string {
  const lines: string[] = [];
  const days: (keyof WeekHours)[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  days.forEach(day => {
    const h = hours[day];
    const dayLabel = day.charAt(0).toUpperCase() + day.slice(1, 3);
    
    if (h.closed) {
      lines.push(`${dayLabel}: Closed`);
    } else {
      const formatTime = (time: string) => {
        const [hour, min] = time.split(':').map(Number);
        const period = hour >= 12 ? 'pm' : 'am';
        const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${hour12}:${min.toString().padStart(2, '0')}${period}`;
      };
      lines.push(`${dayLabel}: ${formatTime(h.open)} - ${formatTime(h.close)}`);
    }
  });

  return lines.join('\n');
}
