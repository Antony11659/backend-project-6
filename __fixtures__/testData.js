/* eslint-disable quotes */
import { faker } from "@faker-js/faker";

const createUser = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.exampleEmail(),
  password: faker.internet.password({ length: 10 }),
});

const createStatus = () => ({
  name: faker.lorem.word({ length: { min: 5, max: 7 }, strategy: "fail" }),
});

const createTask = (creatorId = 1, statusId = 3, labels = [1, 2]) => ({
  name: faker.word.adjective({
    length: { min: 5, max: 7 },
    strategy: "fail",
  }),
  description: faker.word.adjective({
    length: { min: 5, max: 70 },
    strategy: "any-length",
  }),
  creatorId,
  statusId,
  executorId: creatorId,
  labels,
});

const createLabel = () => ({
  name: faker.lorem.word({ length: { min: 5, max: 7 }, strategy: "fail" }),
});

export { createUser, createStatus, createTask, createLabel };
