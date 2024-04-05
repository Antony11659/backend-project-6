// @ts-check

import fastify from "fastify";
import init from "../server/plugin.js";
import { createUser } from "../__fixtures__/testData.js";

describe("test session", () => {
  const user = createUser();
  let app;
  let knex;

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: "pino-pretty" },
    });
    await init(app);
    knex = app.objection.knex;
    await knex.migrate.latest();

    await app.objection.models.user.query().insert(user);
  });

  it("test sign in / sign out", async () => {
    const response = await app.inject({
      method: "GET",
      url: app.reverse("newSession"),
    });

    expect(response.statusCode).toBe(200);

    const responseSignIn = await app.inject({
      method: "POST",
      url: app.reverse("session"),
      payload: {
        data: user,
      },
    });
    expect(responseSignIn.statusCode).toBe(302);

    const [sessionCookie] = responseSignIn.cookies;
    const { name, value } = sessionCookie;
    const cookie = { [name]: value };

    const responseSignOut = await app.inject({
      method: "DELETE",
      url: app.reverse("session"),

      cookies: cookie,
    });

    expect(responseSignOut.statusCode).toBe(302);
  });

  afterAll(async () => {
    await app.close();
  });
});
