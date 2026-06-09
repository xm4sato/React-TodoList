import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale"; // If you are using Arabic locales

/**
 * Safely parses incoming date primitives and returns a formatted relative time string.
 * Enforces strict fallback structures to prevent chronological application crashes.
 * * @param {string | null | undefined} dateISOString - The incoming target timestamp.
 * @returns {string} The localized descriptive relative distance phrase.
 */
export const getRelativeTime = (dateISOString: string | null | undefined): string => {
  // STEP 1: Safeguard against empty, nullified, or unassigned dates
  if (!dateISOString) {
    return "بدون موعد محدد"; // Safe fallback string when no date is assigned
  }

  try {
    const parsedDate = new Date(dateISOString);

    // STEP 2: Verify if the generated Date instance is fundamentally valid
    if (isNaN(parsedDate.getTime())) {
      return "تاريخ غير صالح"; 
    }

    // STEP 3: Execute execution layer safely
    return formatDistanceToNow(parsedDate, {
      addSuffix: true,
      locale: ar, // Forces Arabic expressions like "منذ 3 ساعات" or "خلال يوم"
    });
    
  } catch (error) {
    console.error("Chronological parsing failure within getRelativeTime:", error);
    return "خطأ في قراءة التاريخ";
  }
};