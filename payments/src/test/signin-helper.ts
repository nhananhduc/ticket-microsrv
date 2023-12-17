import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const signinHelper = (id?: string) => {
  const payload = {
    id: id || new Types.ObjectId().toHexString(),
    email: "test@test.com",
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");
  return [`session=${base64}`];
};

export { signinHelper };
