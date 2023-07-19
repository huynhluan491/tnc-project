const jwt = require("jsonwebtoken");
const UserDAO = require("../DAO/UserDAO");
const DTOUser = require("../DTO/Default/DTOUser");
const utils = require("../Utils/AuthUtils");
exports.login = async (req, res) => {
  try {
    const form = req.body;
    const dto = new DTOUser(form);
    const result = await utils.login(dto);
    res.cookie("user", result.Token, {
      httpOnly: true,
    });
    //test
    res.cookie("ruser", result.RefreshToken, {
      httpOnly: true,
    });
    res.cookie("csrf-token", result.CsrfToken, {});

    res.status(200).json({
      Code: 200,
      Msg: "OK",
      Data: result,
    });
  } catch (e) {
    console.error(e);
    res
      .status(500) // 500 - Internal Error
      .json({
        Code: 500,
        Msg: e.toString(),
      });
  }
};

exports.logout = async (req, res) => {
  try {
    const cookieKey = Object.keys(req.cookies)[0];
    res.clearCookie(cookieKey);
    //delete rtoken and token here
    res.status(200).json({
      Code: 200,
      Msg: "log out !!",
    });
  } catch (err) {
    res.status(404).json({
      Code: 404,
      Msg: err.toString(),
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const form = req.body;
    if (!form.Password || !form.UserName || !form.Email) {
      return res.status(403).json({
        Code: 403,
        Msg: `Invalid Password`,
      });
    }
    const dto = new DTOUser(form);
    const user = await UserDAO.userSignUp(dto);
    delete user.Password;
    delete user.AuthID;
    // console.log("usertest", user);
    return res.status(200).json({
      Code: 200,
      Msg: "sign up success",
      Data: user,
    });
  } catch (e) {
    res
      .status(500) // 500 - Internal Error
      .json({
        Code: 500,
        Msg: e.toString(),
      });
  }
};

exports.protect = async (req, res, next) => {
  try {
    const currentUser = utils.protect(req);
    req.user = currentUser;
  } catch (e) {
    console.error(e);
    return res
      .status(500) // 500 - Internal Error
      .json({
        Code: 500,
        Msg: e.toString(),
      });
  }
  next();
};

//roles
exports.restrictTo = (roles) => {
  return async (req, res, next) => {
    const roleUser = req.user.AuthID;
    switch (roleUser) {
      case roles.admin:
      case roles.master:
        next();
        break;
      default:
        return res
          .status(403) // 403 - Forbidden
          .json({
            Code: 403,
            Msg: "You do not have permission to perform this action",
          });
    }
  };
};

exports.getTokenDev = async (req, res) => {
  try {
    // get JWT & response to use  //https://jwt.io/
    const master = {
      UserID: "-1",
      UserName: "MASTER",
      password: 1,
      AuthID: 1,
    };
    const token = jwt.sign(master, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRED_IN,
    });
    res.cookie("access_token_dev", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "dev",
    });
    //await UserDAO.updateUserById(master.UserID, {Token: token});
    res.status(200).json({
      Code: 200,
      Msg: "OK",
      Data: {token},
    });
  } catch (e) {
    console.error(e);
    res
      .status(500) // 500 - Internal Error
      .json({
        Code: 500,
        Msg: e.toString(),
      });
  }
};

exports.getRefreshToken = async (req, res) => {
  try {
    const rToken = req.body || req.headers || req.cookies;
    const newRToken = await utils.handleRefreshToken(rToken);
    res.status(200).json({
      Code: 200,
      Msg: "OK",
      Data: newRToken,
    });
  } catch (e) {
    res
      .status(500) // 500 - Internal Error
      .json({
        Code: 500,
        Msg: e.toString(),
      });
  }
};
