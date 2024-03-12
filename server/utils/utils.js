export default (entity, id, propertyVlue) => {
  const result = entity.filter((el) => el.id === id)[0];
  return result[propertyVlue] ?? "";
};
