import { faker } from "@faker-js/faker";

export default () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.exampleEmail(),
  password: faker.internet.password({ length: 10 }),
});
// faker.helpers.multiple(fn, {count}) create many users
