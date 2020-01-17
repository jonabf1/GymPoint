import pt from "date-fns/locale/pt";
import { format, parseISO } from "date-fns";

export default param => {
  return format(parseISO(param), "d 'de' MMMM 'de' yyyy", { locale: pt });
};
