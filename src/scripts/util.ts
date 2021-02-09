export const createDataTree = (dataset: any) => {
  let hashtable = Object.create(null);
  dataset.forEach((a: any) => (hashtable[a.id] = { ...a, childNodes: [] }));
  let datatree: any = [];
  dataset.forEach((a: any) => {
    if (a.parentId) hashtable[a.parentId].childNodes.push(hashtable[a.id]);
    else datatree.push(hashtable[a.id]);
  });
  return datatree;
};
