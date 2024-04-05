// @ts-check

import { createUser } from "../../__fixtures__/testData.js";

// import { URL } from "url";
// import fs from "fs";
// import path from "path";

// // TODO: использовать для фикстур https://github.com/viglucci/simple-knex-fixtures

// const getFixturePath = (filename) =>
//   path.join("..", "..", "__fixtures__", filename);
// const readFixture = (filename) =>
//   fs
//     .readFileSync(new URL(getFixturePath(filename), import.meta.url), "utf-8")
//     .trim();
// const getFixtureData = (filename) => JSON.parse(readFixture(filename));

// export const getTestData = () => getFixtureData("testData.json");

// export const prepareData = async (app) => {
//   const { knex } = app.objection;

//   // получаем данные из фикстур и заполняем БД
//   await knex("users").insert(getFixtureData("users.json"));
// };

export default async (app) => {
  const user = createUser();
  await app.objection.models.user.query().insert(user);
  const login = await app.inject({
    method: "POST",
    url: app.reverse("session"),
    payload: {
      data: user,
    },
  });

  const [sessionCookie] = login.cookies;
  const { name, value } = sessionCookie;
  return { [name]: value };
};
