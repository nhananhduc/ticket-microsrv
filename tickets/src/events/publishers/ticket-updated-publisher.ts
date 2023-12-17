import { Publisher, Subjects, TicketUpdatedEvent } from "@ducnhandev/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
