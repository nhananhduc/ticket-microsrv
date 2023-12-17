import request from "supertest";
import { app } from "../../app";
import { Types } from "mongoose";
import { signinHelper } from "../../test/signin-helper";
import { Ticket } from "../../models/ticket";
import { Order, OrderStatus } from "../../models/order";
import { natsWrapper } from "../../nats-wrapper";

it("returns an error if the ticket does not exist", async () => {
  const ticketId = new Types.ObjectId();
  await request(app)
    .post("/api/orders")
    .set("Cookie", signinHelper())
    .send({
      ticketId,
    })
    .expect(404);
});

it("returns an error if the ticket is already reserved", async () => {
  const ticket = Ticket.build({
    id: new Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: "dfdsfwevsdf",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", signinHelper())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserves a ticket", async () => {
  const ticket = Ticket.build({
    id: new Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", signinHelper())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it("emits an order created event", async () => {
  const ticket = Ticket.build({
    id: new Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", signinHelper())
    .send({ ticketId: ticket.id })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
