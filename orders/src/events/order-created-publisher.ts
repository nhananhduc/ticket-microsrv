import { OrderCreatedEvent, Publisher, Subjects } from "@ducnhandev/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
