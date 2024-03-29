/* eslint-disable quotes */
// @ts-check

import i18next from "i18next";
import getValue from "../utils/utils.js";

export default (app) => {
  app
    .get(
      "/tasks",
      { name: "tasks", preValidation: app.authenticate },
      async (req, reply) => {
        try {
          const tasks = await app.objection.models.tasks.query();
          const users = await app.objection.models.user.query();
          const statuses = await app.objection.models.status.query();
          reply.render("tasks/index", {
            tasks,
            users,
            statuses,
            getValue,
          });
        } catch (err) {
          reply.send(err.message);
        }
        return reply;
      }
    )
    .get(
      "/tasks/new",
      { name: "newTask", preValidation: app.authenticate },
      async (req, reply) => {
        const task = new app.objection.models.tasks();
        const users = await app.objection.models.user.query();
        const statuses = await app.objection.models.status.query();
        try {
          reply.render("tasks/new", { task, users, statuses });
        } catch (err) {
          reply.send(err.message);
        }
        return reply;
      }
    )
    .post("/tasks", { preValidation: app.authenticate }, async (req, reply) => {
      const validTask = new app.objection.models.tasks();
      validTask.$set(req.body.data);
      try {
        await app.objection.models.tasks.query().insert(validTask);
        req.flash("info", i18next.t("flash.tasks.create.success"));
        reply.redirect("/tasks");
      } catch (err) {
        req.flash("info", i18next.t("flash.tasks.create.error"));
        reply.send(err.message);
      }
      return reply;
    })
    .get(
      "/tasks/:id/edit",
      { name: "updateTask", preValidation: app.authenticate },
      async (req, reply) => {
        try {
          const task = await app.objection.models.tasks
            .query()
            .findById(req.params.id);
          const users = await app.objection.models.user.query();
          const statuses = await app.objection.models.status.query();
          reply.render("/tasks/edit", { task, users, statuses });
        } catch (err) {
          reply.send(err.message);
        }
        return reply;
      }
    )
    .patch(
      "/tasks/:id",
      { preValidation: app.authenticate },
      async (req, reply) => {
        const validTask = new app.objection.models.tasks();
        validTask.$set(req.body.data);
        const task = await app.objection.models.tasks
          .query()
          .findById(req.params.id);
        try {
          await task.$query().patch(validTask);
          req.flash("info", i18next.t("flash.tasks.update.success"));
          reply.redirect("/tasks");
        } catch (err) {
          req.flash("info", i18next.t("flash.tasks.update.error"));
          reply.send(err.message);
        }
        return reply;
      }
    )
    .delete(
      "/tasks/:id",
      { preValidation: app.authenticate },
      async (req, reply) => {
        const { creatorId } = await app.objection.models.tasks
          .query()
          .findById(req.params.id);

        const isReqUserOwner = creatorId === req.user.id;

        if (!isReqUserOwner) {
          req.flash("info", i18next.t("flash.tasks.delete.error"));
          reply.redirect("/tasks");
          return reply;
        }

        try {
          await app.objection.models.tasks.query().deleteById(req.params.id);
          req.flash("info", i18next.t("flash.tasks.delete.success"));
          reply.redirect("/tasks");
        } catch (err) {
          req.flash("info", i18next.t("flash.tasks.delete.error"));
          reply.send(err.message);
        }
        return reply;
      }
    );
};
