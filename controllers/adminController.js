export const deleteUser = async (req, res, next) => {};

export const getAllUsers = async (req, res, next) => {};

export const getUserById = async (req, res, next) => {
  const { _id } = req.params;

  try {
    if (!_id) {
      throw new CustomError("User id is required ", 400);
    }

    const user = await User.findById(_id);

    if (!user) {
      throw new CustomError("User not found", 404);
    }

    return res.status(200).json({
      success: { message: "User found successfully" },
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
