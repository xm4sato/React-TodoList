import { v4 as uuidv4 } from "uuid";

export const generateShortId = (): number => {
  // توليد uuid وتحويله إلى سلسلة من الأرقام فقط عبر استبدال الحروف
  const fullId = uuidv4().replace(/\D/g, "");
  // أخذ أول 9 أرقام وتحويلها إلى رقم (Number)
  return parseInt(fullId.substring(0, 9));
};
