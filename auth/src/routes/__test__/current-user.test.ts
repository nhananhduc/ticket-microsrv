import request from "supertest";
import { app } from "../../app";
import { signinHelper } from "../../test/signin-helper";

it("responds with details aboput the current user", async () => {
  const cookie = await signinHelper();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not anthenicated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
