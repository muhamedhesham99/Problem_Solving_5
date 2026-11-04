import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByIdExclude,
  updateOrInsert,
} from "./user.service.js";

export const signUp = async (req, res) => {
  try {
    const [user, created] = await createUser(req.body);
    if (created)
      return res
        .status(201)
        .json({ message: "User Created Successfully", user });
    res.status(409).json({ message: "Email already exist" });
  } catch (err) {
    throw new Error(err);
  }
};

export const updateInsertUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  try {
    const userExist = await findUserById(id);
    const [user, created] = await updateOrInsert({
      id,
      name,
      email,
      password,
      role,
    });

    if ((userExist == null && !created) || (userExist?.email && !created))
      return res.status(200).json({
        message: "User Updated Successfully",
      });
    if (userExist == null && created)
      return res.status(201).json({
        message: "User Created Successfully",
        user,
      });
  } catch (err) {
    throw new Error(err);
  }
};

export const userByEmail = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    res.json({
      message: `Get user successfully where email is ${email}`,
      user,
    });
  } catch (err) {
    throw new Error(err);
  }
};
export const userByIdExeclude = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await findUserByIdExclude(id);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    res.json({
      message: `Get user successfully where id is ${id}`,
      user,
    });
  } catch (err) {
    throw new Error(err);
  }
};
