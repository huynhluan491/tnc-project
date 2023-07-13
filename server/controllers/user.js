const UserDAO = require("../DAO/UserDAO");
const authController = require("../controllers/auth");
exports.getUserById = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const user = await UserDAO.getUserById(id);
    if (!user) {
      return res
        .status(404) //NOT FOUND
        .json({
          Code: 404,
          Msg: `Not found user with Id ${id}!`,
        });
    }
    req.user = user;
    return res.status(200).json({
      Code: 200,
      Msg: null,
      data: user,
    });
  } catch (e) {
    return res.status(500).json({
      Code: 500,
      Msg: e,
    });
  }
};

exports.getUsers = async (req, res) => {
  const users = await UserDAO.getAllUsers(req.query);
  res.status(200).json({
    Code: 200,
    Msg: "OK",
    Page: users.Page,
    PageSize: users.PageSize,
    TotalPage: users.TotalPage,
    TotalUser: users.TotalUser,
    DataUsers: users.DataUsers,
  });
};

// exports.getUser = async (req, res) => {
//   try {
//     const user = req.user;
//     res.status(200).json({
//       Code: 200,
//       Msg: "OK",
//       data: { user },
//     });
//   } catch (e) {
//     console.error(e);
//     res
//       .status(500) // 500 - Internal Error
//       .json({
//         Code: 500,
//         Msg: e.toString(),
//       });
//   }
// };

exports.getUserByUserName = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await UserDAO.getUserByUserName(username);
    if (!user) {
      return res
        .status(404) /// 404 - NOT FOUND!
        .json({
          Code: 404,
          Msg: `Not found user with name ${username}`,
        });
    }
    res.status(200).json({
      Code: 200,
      Msg: null,
      data: user,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500) // 500 - Internal Error
      .json({
        Code: 500,
        Msg: e.toString(),
      });
  }
};

exports.addUser = async (req, res) => {
  const newUser = req.body;
  try {
    let user = await UserDAO.getUserByEmail(req.body.email);
    if (user) {
      // console.log(user);
      return res.status(403).json({
        Code: 403,
        Msg: "User email used!",
      });
    }
    user = await UserDAO.getUserByUserName(req.body.userName);
    if (user) {
      // console.log(user);
      return res.status(403).json({
        Code: 403,
        Msg: "User name used!",
      });
    }
    const result = await UserDAO.insertUser(newUser);
    const u = await UserDAO.getUserByUserName(newUser.userName);
    await CartDAO.createNewCart(u.userID);
    return res.status(200).json({
      Code: 200,
      Msg: null,
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      Code: 404,
      Msg: "Add user failed!",
    });
  }
};

exports.updateUserById = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const updateInfo = req.body;
    let user = await UserDAO.getUserById(id);
    if (!user) {
      return res.status(404).json({
        Code: 404,
        Msg: `Not found user with Id ${id}!`,
      });
    }
    await UserDAO.updateUserById(id, updateInfo);
    user = await UserDAO.getUserById(id);
    return res.status(200).json({
      Code: 200,
      Msg: null,
      data: user,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      Code: 500,
      Msg: `Update user with id: ${id} failed!`,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  const id = req.params.id * 1;
  try {
    const user = await UserDAO.getUserById(id);
    if (!user) {
      return res
        .status(404) //NOT FOUND
        .json({
          Code: 404,
          Msg: `User with Id ${id} not found!`,
        });
    }
    const token = authController.getTokenFromReq(req);
    const payload = authController.verificationToken(token);
    if (payload.AuthID < user.AuthID) {
      await UserDAO.deleteUserById(id);
    } else {
      return res
        .status(403) //NOT FOUND
        .json({
          Code: 403,
          Msg: "You don't have permission to perform this action !!",
        });
    }

    return res.status(200).json({
      Code: 200,
      Msg: `Deleted user with id ${id} successfully!`,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      Code: 500,
      Msg: e,
    });
  }
};

exports.deleteMultipleUserById = async (req, res) => {
  const idList = req.query.id;
  try {
    if (!idList || idList.length === 0) {
      return res.status(403).json({
        Code: 403,
        Msg: `Invalid ids`,
      });
    }
    const token = authController.getTokenFromReq(req);
    const payload = authController.verificationToken(token);
    // console.log(payload);
    await UserDAO.deleteMultipleUserById(idList, payload);
    return res.status(200).json({
      Code: 200,
      Msg: null,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      Code: 500,
      Msg: `Delete users with id ${idList} failed!`,
    });
  }
};
