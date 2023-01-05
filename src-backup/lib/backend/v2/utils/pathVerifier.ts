import Server from '../../../../firebase/firebase_server_exports';

export const databaseEntryExists = async (
  paths: string[]
): Promise<string | void> => {
  const promises = paths.map(
    (element) =>
      new Promise((resolve) => {
        Server.db
          .doc(element)
          .get()
          .then((doc) => resolve(doc.exists ? element : ''));
      })
  );
  const results = (await Promise.all(promises)) as string[];
  const path = results.find((element) => element !== '');
  if (!path) throw new Error('No Path Found for Updation');
  return path;
};
