/* eslint-disable quotes */
// @ts-nocheck

import fastify from "fastify";
import init from "../server/plugin.js";
import { getTestData, prepareData } from "./helpers/index.js";
import {
  createTask,
  createStatus,
  createUser,
} from "../__fixtures__/testData.js";

describe("test tasks", () => {
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
      url: app.reverse("tasks"),
      payload: {
        data: testData.users.existing,
      },
    });

    const [sessionCookie] = login.cookies;
    const { name, value } = sessionCookie;
    cookie = { [name]: value };
  });

  it("get tasks", async () => {
    const response = await app.inject({
      method: "get",
      url: `/tasks`,
      cookies: cookie,
    });
    expect(response.statusCode).toBe(200);
  });

  // it("new task", async () => {
  //   const response = await app.inject({
  //     method: "get",
  //     url: "/tasks/new",
  //     cookies: cookie,
  //   });

  //   expect(response.statusCode).toBe(200);
  // });

  // it("create task", async () => {
  //   const newTask = createTask();

  //   const response = await app.inject({
  //     method: "post",
  //     url: "/tasks",
  //     payload: {
  //       data: newTask,
  //     },
  //     cookies: cookie,
  //   });
  //   expect(response.statusCode).toBe(302);
  //   const addedTask = await app.objection.models.tasks
  //     .query()
  //     .findOne({ name: newTask.name });
  //   expect(addedTask.name).toBe(newTask.name);
  // });

  // it("update task", async () => {
  //   const user = createUser();
  //   await app.objection.models.user.query().insert(user);
  //   const insertedUser = await app.objection.models.user
  //     .query()
  //     .findOne({ firstName: user.firstName });

  //   const status = createStatus();
  //   await app.objection.models.status.query().insert(status);
  //   const insertedStatus = await app.objection.models.status
  //     .query()
  //     .findOne({ name: status.name });

  //   const oldTask = createTask(insertedUser.id, insertedStatus.id);
  //   await app.objection.models.tasks.query().insert(oldTask);

  //   const newValue = { name: "newValue" };

  //   const { id } = await app.objection.models.tasks
  //     .query()
  //     .findOne({ name: oldTask.name });

  //   const response = await app.inject({
  //     method: "patch",
  //     url: `/tasks/${id}`,
  //     payload: {
  //       data: newValue,
  //     },
  //     cookies: cookie,
  //   });

  //   const newTask = await app.objection.models.tasks.query().findOne({ id });

  //   expect(response.statusCode).toBe(302);
  //   expect(newValue.name).toBe(newTask.name);
  // });

  //   it("delete task", async () => { // don't forget to finish this part
  //     const status = createStatus();
  //     await app.objection.models.status.query().insert(status);
  //     const { id } = await app.objection.models.status
  //       .query()
  //       .findOne({ name: status.name });

  //     const response = await app.inject({
  //       method: "delete",
  //       url: `/statuses/${id}`,
  //       cookies: cookie,
  //     });
  //     expect(response.statusCode).toBe(302);
  //     expect(
  //       await app.objection.models.status.query().findOne({ id })
  //     ).toBeUndefined();
  //   });

  afterAll(async () => {
    await knex.migrate.rollback();
    await app.close();
  });
});
