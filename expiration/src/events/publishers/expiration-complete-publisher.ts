import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@ducnhandev/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
