import userModel from "./user.modle.js";

export const createUser = async (inputs) => {
  const { name, email, password, role } = inputs;
  const [user, created] = await userModel.findOrCreate({
    where: { email },
    defaults: { name, password, role },
  });
  return [user, created];
};

export const updateOrInsert = async (inputs) => {
  const { id, name, email, password, role } = inputs;
  const [user, created] = await userModel.upsert(
    {
      id,
      name,
      email,
      password,
      role,
    },
    { validate: false },
  );
  return [user, created];
};

export const findUserById = async (id) => {
  const user = await userModel.findByPk(id);
  return user;
};

export const findUserByEmail = async (email) => {
  const user = await userModel.findOne({ where: { email } });
  return user;
};

export const findUserByIdExclude = async (id) => {
  const user = await userModel.findByPk(id, {
    attributes: { exclude: "role" },
  });
  return user;
};
