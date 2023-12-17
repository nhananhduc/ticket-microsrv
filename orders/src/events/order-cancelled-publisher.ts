import { OrderCancelledEvent, Publisher, Subjects } from "@ducnhandev/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
