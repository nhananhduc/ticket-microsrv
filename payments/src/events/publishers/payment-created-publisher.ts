import { PaymentCreatedEvent, Publisher, Subjects } from "@ducnhandev/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
