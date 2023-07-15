const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserDAO = require("../DAO/UserDAO");
const OrderDAO = require("../DAO/OrderDAO");
const DTOUser = require("../DTO/Default/DTOUser");

const signToken = (id, username, auth, OrderID = 0) => {
  return jwt.sign(
    {
      UserID: id,
      Username: username,
      Auth: auth,
      OrderID: OrderID,
    },
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRED_IN}
  );
};
exports.login = async (req, res) => {
  try {
    const form = req.body;
    //1. check if form is valid
    if (!form.Password || !form.UserName) {
      return res
        .status(403) // 403 - Forbidden
        .json({Code: 403, Msg: `Invalid params`});
    }
    //2. check if user existed
    const user = await UserDAO.getUserByUserName(form.UserName);
    const orderIDQuery = await OrderDAO.getOrderIDByUserName(form.UserName);
    let orderID;
    if (!orderIDQuery) {
      orderID = -1;
    } else {
      orderID = orderIDQuery;
    }
    if (!user) {
      return res
        .status(401) // 401 - Unauthorized
        .json({Code: 401, Msg: `Invalid user - ${form.UserName}`});
    }
    //3. check if password is valid
    const isValidPassword = await bcrypt.compare(form.Password, user.Password);
    if (!isValidPassword) {
      return res
        .status(401) // 401 - Unauthorized
        .json({Code: 401, Msg: "Invalid authentication"});
    }
    //4. get JWT & response to use  //https://jwt.io/
    const token = signToken(user.UserID, user.UserName, user.Auth, orderID);
    //res jwt cookie
    res.cookie("user", token, {
      httpOnly: true,
    });
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

exports.logout = async (req, res) => {
  // res.clearCookie()
  try {
    const cookieKey = Object.keys(req.cookies)[0];
    res.clearCookie(cookieKey);
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
    // await UserDAO.insertUser({
    //   UserName: form.UserName,
    //   Email: form.Email,
    //   Password: form.Password,
    // });

    // const user = await UserDAO.getUserByUserName(form.UserName);
    // await OrderDAO.createNewOrder(user.UserID);
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
    // 1) Getting token from header "Authorization"
    let token = this.getTokenFromReq(req);
    if (!token) {
      return res
        .status(401) // 401 - Unauthorized
        .json({
          Code: 401,
          Msg: "You are not logged in! Please log in to get access.",
        });
    }
    // 2) Verification token
    const payload = this.verificationToken(token);
    // 3) Check if user still exists
    const currentUser = await UserDAO.getUserById(payload.UserID);
    console.log("payload", payload);
    if (!currentUser) {
      return res
        .status(401) // 401 - Unauthorized
        .json({Code: 401, Msg: `Invalid authentication`});
    }
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

exports.verificationToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);

exports.getTokenFromReq = (req) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTY3OTUzMzEwOSwiZXhwIjoxNjc5NTU0NzA5fQ.HZ7zIGlbU2dQjgCUDbBridcO-CATrGbjthnNH0X2w-M
    token = req.headers.authorization.split(" ")[1];
  } else {
    token = req.cookies.access_token_dev;
  }
  return token;
};

exports.getTokenDev = async (req, res) => {
  try {
    // get JWT & response to use  //https://jwt.io/
    const token = jwt.sign(
      {
        UserID: "-1",
        UserName: "MASTER",
        password: 1,
        AuthID: 1,
      },
      process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_EXPIRED_IN}
    );
    res.cookie("access_token_dev", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "dev",
    });
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
