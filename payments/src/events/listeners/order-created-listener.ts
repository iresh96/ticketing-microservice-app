import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from "@sim96tickets/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { id, userId, status, version, ticket } = data;
    const order = Order.build({
      id,
      userId,
      status,
      version,
      price: ticket.price,
    });

    await order.save();

    msg.ack();
  }
}
