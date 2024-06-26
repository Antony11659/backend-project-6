/* eslint-disable quotes */
// @ts-nocheck

import fastify from "fastify";
import init from "../server/plugin.js";
import logIn from "./helpers/index.js";
import { createTask } from "../__fixtures__/testData.js";

describe("test tasks", () => {
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
  //   await knex("tasks").truncate();
  //   await knex("tasks_labels").truncate();
  // });

  it("get tasks", async () => {
    const response = await app.inject({
      method: "get",
      url: `/tasks`,
      cookies: cookie,
    });
    expect(response.statusCode).toBe(200);
  });

  it("new task", async () => {
    const response = await app.inject({
      method: "get",
      url: "/tasks/new",
      cookies: cookie,
    });

    expect(response.statusCode).toBe(200);
  });

  it("create task", async () => {
    const newTask = createTask();

    const response = await app.inject({
      method: "post",
      url: "/tasks",
      payload: {
        data: newTask,
      },
      cookies: cookie,
    });
    expect(response.statusCode).toBe(302);
    const addedTask = await app.objection.models.tasks
      .query()
      .findOne({ name: newTask.name });
    expect(addedTask.name).toBe(newTask.name);
  });

  it("update task", async () => {
    const oldTask = createTask();
    await app.objection.models.tasks.query().insert(oldTask);

    const newValue = { name: "newValue" };

    const updateParams = { ...oldTask, ...newValue };

    const { id } = await app.objection.models.tasks
      .query()
      .findOne({ name: oldTask.name });

    const response = await app.inject({
      method: "patch",
      url: `/tasks/${id}`,
      payload: {
        data: updateParams,
      },
      cookies: cookie,
    });

    const newTask = await app.objection.models.tasks.query().findOne({ id });

    expect(response.statusCode).toBe(302);
    expect(newValue.name).toBe(newTask.name);
  });

  it("delete task", async () => {
    const task = createTask();
    await app.objection.models.tasks.query().insert(task);
    const { id } = await app.objection.models.tasks
      .query()
      .findOne({ name: task.name });

    const response = await app.inject({
      method: "delete",
      url: `/tasks/${id}`,
      cookies: cookie,
    });
    expect(response.statusCode).toBe(302);
    expect(
      await app.objection.models.tasks.query().findOne({ id })
    ).toBeUndefined();
  });

  afterEach(async () => {
    await knex("tasks").truncate();
    await knex("tasks_labels").truncate();
  });

  afterAll(async () => {
    await knex("users").truncate();
    await app.close();
  });
});
