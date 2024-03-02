/* eslint-disable quotes */
// @ts-nocheck

import fastify from "fastify";
import init from "../server/plugin.js";
import { getTestData, prepareData } from "./helpers/index.js";
import { createStatus } from "../__fixtures__/testData.js";

describe("test status", () => {
  let app;
  let knex;
  let testData;
  let cookie;

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: "pino-pretty" },
    });
    await init(app);
    knex = app.objection.knex;
    await knex.migrate.latest();
    await prepareData(app);
    testData = getTestData();

    const login = await app.inject({
      method: "POST",
      url: app.reverse("session"),
      payload: {
        data: testData.users.existing,
      },
    });

    const [sessionCookie] = login.cookies;
    const { name, value } = sessionCookie;
    cookie = { [name]: value };
  });

  it("get status", async () => {
    const response = await app.inject({
      method: "get",
      url: `/statuses`,
      cookies: cookie,
    });
    expect(response.statusCode).toBe(200);
  });

  it("new status", async () => {
    const response = await app.inject({
      method: "get",
      url: "/statuses/new",
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it("create status", async () => {
    const status = createStatus();

    const response = await app.inject({
      method: "post",
      url: "/statuses",
      payload: {
        data: status,
      },
      cookies: cookie,
    });
    expect(response.statusCode).toBe(302);
    const addedStatus = await app.objection.models.status
      .query()
      .findOne({ name: status.name });
    expect(addedStatus.name).toBe(status.name);
  });

  it("update status", async () => {
    const oldStatus = createStatus();
    await app.objection.models.status.query().insert(oldStatus);
    const newValue = { name: "newValue" };
    const { id } = await app.objection.models.status
      .query()
      .findOne({ name: oldStatus.name });

    const response = await app.inject({
      method: "patch",
      url: `/statuses/${id}`,
      payload: {
        data: newValue,
      },
      cookies: cookie,
    });
    const newStatus = await app.objection.models.status.query().findOne({ id });
    expect(response.statusCode).toBe(302);
    expect(newValue.name).toBe(newStatus.name);
  });

  it("delete status", async () => {
    const status = createStatus();
    await app.objection.models.status.query().insert(status);
    const { id } = await app.objection.models.status
      .query()
      .findOne({ name: status.name });

    const response = await app.inject({
      method: "delete",
      url: `/statuses/${id}`,
      cookies: cookie,
    });
    expect(response.statusCode).toBe(302);
    expect(
      await app.objection.models.status.query().findOne({ id })
    ).toBeUndefined();
  });

  afterAll(async () => {
    // await knex.migrate.rollback();
    await app.close();
  });
});
