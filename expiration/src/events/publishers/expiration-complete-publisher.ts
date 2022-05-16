import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@sim96tickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
