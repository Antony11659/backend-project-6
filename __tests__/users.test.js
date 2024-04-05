/* eslint-disable quotes */
// @ts-nocheck

import _ from "lodash";
import fastify from "fastify";

import init from "../server/plugin.js";
import encrypt from "../server/lib/secure.cjs";
import { createUser } from "../__fixtures__/testData.js";
// import logIn from "./helpers/index.js";

describe("test users CRUD", () => {
  let app;
  let knex;
  let models;

  beforeAll(async () => {
    app = fastify({
      exposeHeadRoutes: false,
      logger: { target: "pino-pretty" },
    });
    await init(app);
    knex = app.objection.knex;
    models = app.objection.models;
    await knex.migrate.latest();
  });

  // beforeEach(async () => {
  // await knex("users").truncate();
  // });

  it("index", async () => {
    const response = await app.inject({
      method: "GET",
      url: app.reverse("users"),
    });

    expect(response.statusCode).toBe(200);
  });

  it("new", async () => {
    const response = await app.inject({
      method: "GET",
      url: app.reverse("newUser"),
    });

    expect(response.statusCode).toBe(200);
  });

  it("create", async () => {
    const params = createUser();
    const response = await app.inject({
      method: "POST",
      url: app.reverse("users"),
      payload: {
        data: params,
      },
    });
    expect(response.statusCode).toBe(302);
    const expected = {
      ..._.omit(params, "password"),
      passwordDigest: encrypt(params.password),
    };
    const user = await models.user.query().findOne({ email: params.email });
    expect(user).toMatchObject(expected);
  });

  it("update", async () => {
    const oldUser = createUser();
    const newUser = createUser();
    await models.user.query().insert(oldUser);
    const { lastName } = oldUser;
    const { id } = await models.user.query().findOne({ lastName });

    const login = await app.inject({
      method: "POST",
      url: app.reverse("session"),
      payload: {
        data: oldUser,
      },
    });

    const [sessionCookie] = login.cookies;
    const { name, value } = sessionCookie;
    const cookie = { [name]: value };

    const response = await app.inject({
      method: "PATCH",
      url: `/users/${id}`,
      payload: {
        data: newUser,
      },
      cookies: cookie,
    });
    expect(response.statusCode).toBe(302);
    const updatedUser = await models.user.query().findOne({ id });

    expect(updatedUser).toHaveProperty("firstName", newUser.firstName);
  });

  it("delete", async () => {
    const user = createUser();
    await models.user.query().insert(user);
    const { lastName } = user;
    const { id } = await models.user.query().findOne({ lastName });

    const login = await app.inject({
      method: "POST",
      url: app.reverse("session"),
      payload: {
        data: user,
      },
    });

    const [sessionCookie] = login.cookies;
    const { name, value } = sessionCookie;
    const cookie = { [name]: value };

    const response = await app.inject({
      method: "delete",
      url: `/users/${id}`,
      cookies: cookie,
    });
    expect(response.statusCode).toBe(302);

    expect(await models.user.query().findOne({ id })).toBeUndefined();
  });

  afterEach(async () => {
    //   // Пока Segmentation fault: 11
    //   // после каждого теста откатываем миграции
    //   // await knex.migrate.rollback();
    await knex("users").truncate();
  });

  afterAll(async () => {
    await knex("users").truncate();
    await app.close();
  });
});
