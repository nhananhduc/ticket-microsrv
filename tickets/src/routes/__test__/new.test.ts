import request from "supertest";
import { app } from "../../app";
import { signinHelper } from "../../test/signin-helper";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signinHelper())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app).post("/api/tickets").set("Cookie", signinHelper()).send({
    title: "",
    price: 10,
  });

  expect(400);

  await request(app).post("/api/tickets").set("Cookie", signinHelper()).send({
    price: 10,
  });

  expect(400);
});

it("returns an error if an invalid price is provided", async () => {
  await request(app).post("/api/tickets").set("Cookie", signinHelper()).send({
    title: "sdfdsfsd",
    price: -10,
  });

  expect(400);

  await request(app).post("/api/tickets").set("Cookie", signinHelper()).send({
    title: "sdfdsfsd",
  });

  expect(400);
});

it("creates a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", signinHelper())
    .send({
      title: "sdfsdaf",
      price: 20,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(20);
  expect(tickets[0].title).toEqual("sdfsdaf");
});

it("publishes an event", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signinHelper())
    .send({
      title: "sdfsdaf",
      price: 20,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
