import UserModel from "../models/user.js";

export async function findUser({ userId }) {
  const user = await UserModel.findOne({ userId });
  if (!user) {
    throw new Error("Invalid user id provided, unable to find user");
  }
  return user;
}

export function replaceDoc(docArray, newParams) {
  let replaced = false;
  for (let i = 0; i < docArray.length; i++) {
    if (docArray[i]._id.toString() === newParams._id) {
      docArray[i] = newParams;
      replaced = true;
      break;
    }
  }
  if (!replaced) {
    throw new Error("Invalid subdocument id, unable to replace subdocument");
  }
  return docArray;
}

export function removeDoc(docArray, params) {
  const prevLength = docArray.length;
  const newDocArray = docArray.filter(
    (item) => !(item._id.toString() === params._id)
  );
  if (newDocArray.length === prevLength) {
    throw new Error("Invalid subdocument id, unable to remove subdocument");
  }
  return newDocArray;
}

export function findDoc(docArray, params) {
  const subDoc = docArray.find((item) => item._id.toString() === params._id);
  if (!subDoc) {
    throw new Error("Invalid subdocument id, unable to find subdocument");
  }
  return subDoc;
}
