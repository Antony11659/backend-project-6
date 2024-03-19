/* eslint-disable quotes */
// @ts-check

import i18next from "i18next";

export default (app) => {
  app
    .get(
      "/labels",
      { name: "labels", preValidation: app.authenticate },
      async (req, reply) => {
        try {
          const labels = await app.objection.models.labels.query();
          reply.render("labels/index", { labels });
        } catch (err) {
          reply.send(err.message);
        }
        return reply;
      }
    )
    .get(
      "/labels/new",
      { name: "newLabel", preValidation: app.authenticate },
      async (req, reply) => {
        const label = new app.objection.models.labels();
        try {
          reply.render("labels/new", { label });
        } catch (err) {
          reply.send(err.message);
        }
        return reply;
      }
    )
    .post(
      "/labels",
      { preValidation: app.authenticate },
      async (req, reply) => {
        const validLabel = new app.objection.models.labels();
        validLabel.$set(req.body.data);
        console.log(validLabel);
        try {
          await app.objection.models.labels.query().insert(validLabel);
          req.flash("info", i18next.t("flash.labels.create.success"));
          reply.redirect("/labels");
        } catch (err) {
          req.flash("info", i18next.t("flash.labels.create.error"));
          reply.send(err.message);
        }
        return reply;
      }
    )
    .get(
      "/labels/:id/edit",
      { name: "updateLabel", preValidation: app.authenticate },
      async (req, reply) => {
        try {
          const label = await app.objection.models.labels
            .query()
            .findById(req.params.id);
          reply.render("/labels/edit", { label });
        } catch (err) {
          reply.send(err.message);
        }
        return reply;
      }
    )
    .patch(
      "/labels/:id",
      { preValidation: app.authenticate },
      async (req, reply) => {
        const validLabel = new app.objection.models.labels();
        validLabel.$set(req.body.data);
        const label = await app.objection.models.labels
          .query()
          .findById(req.params.id);
        try {
          await label.$query().patch(validLabel);
          req.flash("info", i18next.t("flash.labels.update.success"));
          reply.redirect("/labels");
        } catch (err) {
          req.flash("info", i18next.t("flash.labels.update.error"));
          reply.send(err.message);
        }
        return reply;
      }
    )
    .delete(
      "/labels/:id",
      { preValidation: app.authenticate },
      async (req, reply) => {
        // don't forget to implement the logic " if a task
        // has the connection with a label it is impossible to delete a lebel"
        try {
          await app.objection.models.labels.query().deleteById(req.params.id);
          req.flash("info", i18next.t("flash.labels.delete.success"));
          reply.redirect("/labels");
        } catch (err) {
          req.flash("info", i18next.t("flash.labels.delete.error"));
          reply.send(err.message);
        }
        return reply;
      }
    );
};
