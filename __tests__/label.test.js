/* eslint-disable quotes */
// @ts-nocheck

import fastify from "fastify";
import init from "../server/plugin.js";
import { createLabel } from "../__fixtures__/testData.js";
import logIn from "./helpers/index.js";

describe("test labels", () => {
  let app;
  let knex;
  let cookie;

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: "pino-pretty" },
    });
    await init(app);
    knex = app.objection.knex;
    await knex.migrate.latest();
    cookie = await logIn(app);
  });

  // beforeEach(async () => {
  // await knex.migrate.latest();
  // cookie = await logIn(app);
  // await knex("labels").truncate();
  // });

  it("get label", async () => {
    const response = await app.inject({
      method: "get",
      url: `/labels`,
      cookies: cookie,
    });
    expect(response.statusCode).toBe(200);
  });

  it("new label", async () => {
    const response = await app.inject({
      method: "get",
      url: "/labels/new",
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it("create label", async () => {
    const label = createLabel();

    const response = await app.inject({
      method: "post",
      url: "/labels",
      payload: {
        data: label,
      },
      cookies: cookie,
    });
    expect(response.statusCode).toBe(302);
    const addedLabel = await app.objection.models.labels
      .query()
      .findOne({ name: label.name });
    expect(addedLabel.name).toBe(label.name);
  });

  it("update label", async () => {
    const oldLabel = createLabel();
    await app.objection.models.labels.query().insert(oldLabel);
    const newValue = { name: "newValue" };
    const { id } = await app.objection.models.labels
      .query()
      .findOne({ name: oldLabel.name });

    const response = await app.inject({
      method: "patch",
      url: `/labels/${id}`,
      payload: {
        data: newValue,
      },
      cookies: cookie,
    });
    const newLabel = await app.objection.models.labels.query().findOne({ id });
    expect(response.statusCode).toBe(302);
    expect(newValue.name).toBe(newLabel.name);
  });

  it("delete label", async () => {
    const label = createLabel();
    await app.objection.models.labels.query().insert(label);
    const { id } = await app.objection.models.labels
      .query()
      .findOne({ name: label.name });

    const response = await app.inject({
      method: "delete",
      url: `/labels/${id}`,
      cookies: cookie,
    });
    expect(response.statusCode).toBe(302);
    expect(
      await app.objection.models.labels.query().findById(id)
    ).toBeUndefined();
  });

  afterEach(async () => {
    // Пока Segmentation fault: 11
    // после каждого теста откатываем миграции
    // await knex.migrate.rollback();
    await knex("labels").truncate();
  });

  afterAll(async () => {
    await knex("users").truncate();
    await app.close();
  });
});
