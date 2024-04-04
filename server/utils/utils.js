const getValue = (entity, id, propertyValue) => {
  const result = entity.filter((el) => el.id === id)[0];
  return result[propertyValue] ?? "";
};

const insertLabels = async (labels, task, trx) => {
  if (labels.length === 1) {
    const label = labels[0];
    await task.$relatedQuery("labels", trx).relate([label]);
    return;
  }
  const result = labels.map(async (label) =>
    task.$relatedQuery("labels", trx).relate([label])
  );
  await Promise.all(result);
};

export { getValue, insertLabels };
