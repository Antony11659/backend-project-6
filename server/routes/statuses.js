/* eslint-disable quotes */
// @ts-check

import i18next from "i18next";

export default (app) => {
  app
    .get(
      "/statuses",
      { name: "statuses", preValidation: app.authenticate },
      async (req, reply) => {
        try {
          const statuses = await app.objection.models.status.query();
          reply.render("statuses/index", { statuses });
        } catch (err) {
          reply.send(err.message);
        }
        return reply;
      }
    )
    .get(
      "/statuses/new",
      { name: "newStatus", preValidation: app.authenticate },
      (req, reply) => {
        const status = new app.objection.models.status();
        try {
          reply.render("statuses/new", { status });
        } catch (err) {
          reply.send(err.message);
        }
        return reply;
      }
    )
    .post(
      "/statuses",
      { preValidation: app.authenticate },
      async (req, reply) => {
        const validUser = new app.objection.models.status();
        validUser.$set(req.body.data);
        try {
          await app.objection.models.status.query().insert(validUser);
          req.flash("info", i18next.t("flash.statuses.create.success"));
          reply.redirect("/statuses");
        } catch (err) {
          req.flash("error", i18next.t("flash.statuses.create.error"));
          reply.send(err.message);
        }
        return reply;
      }
    )
    .get(
      "/statuses/:id/edit",
      { name: "updateStatus", preValidation: app.authenticate },
      async (req, reply) => {
        try {
          const status = await app.objection.models.status
            .query()
            .findById(req.params.id);
          reply.render("/statuses/edit", { status });
        } catch (err) {
          reply.send(err.message);
        }
        return reply;
      }
    )
    .patch(
      "/statuses/:id",
      { preValidation: app.authenticate },
      async (req, reply) => {
        const validStatus = await app.objection.models.status.fromJson(
          req.body.data
        );
        validStatus.$set(validStatus);
        const status = await app.objection.models.status
          .query()
          .findById(req.params.id);
        try {
          await status.$query().patch(validStatus);
          req.flash("info", i18next.t("flash.statuses.update.success"));
          reply.redirect("/statuses");
        } catch (err) {
          req.flash("error", i18next.t("flash.statuses.update.error"));
          reply.send(err.message);
        }
        return reply;
      }
    )
    .delete(
      "/statuses/:id",
      { preValidation: app.authenticate },
      async (req, reply) => {
        const status = await app.objection.models.status
          .query()
          .findById(req.params.id);
        const tasks = await status.$relatedQuery("tasks");
        const isTaskHasStatus = tasks.length > 0;
        if (isTaskHasStatus) {
          req.flash("error", i18next.t("flash.statuses.delete.error"));
          reply.redirect("/statuses");
          return reply;
        }
        try {
          await app.objection.models.status.query().deleteById(req.params.id);
          req.flash("info", i18next.t("flash.statuses.delete.success"));
          reply.redirect("/statuses");
        } catch (err) {
          req.flash("error", i18next.t("flash.statuses.delete.error"));
          reply.send(err.message);
        }
        return reply;
      }
    );
};
