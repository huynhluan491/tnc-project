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
    const newToken = await utils.protect(req);
    req.cookies.user = newToken.Token;
    req.cookies.RefreshToken = newToken.RefreshToken;
    req.user = newToken.User;

    res.cookie("user", newToken.Token, {
      httpOnly: true,
    });
    res.cookie("ruser", newToken.RefreshToken, {
      httpOnly: true,
    });
    res.cookie("csrf-token", newToken.CsrfToken, {secure: true});
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
    if (utils.checkRole(req, roles)) {
      next();
    }
    return res
      .status(403) // 403 - Forbidden
      .json({
        Code: 403,
        Msg: "You do not have permission to perform this action",
      });
  };
};

exports.getTokenDev = async (req, res) => {
  try {
    const master = {
      UserName: "master",
      Password: "1",
    };

    const result = await utils.login(master);
    delete result.User;
    res.cookie("user", result.Token, {
      httpOnly: true,
    });
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
