import { formatDate } from "../helpers";

export const getEventByName = (
  emailadres: string,
  tekst: string
) => `SELECT top 1 Aanvulling
FROM Taakbeheer.Notificatie
WHERE bestemming = '${emailadres}' AND CommunicatieMediumTypeId = 2 AND Aangemaakt > '${formatDate()}' AND aanvulling LIKE '%${tekst}%'
ORDER BY ID DESC;`;
