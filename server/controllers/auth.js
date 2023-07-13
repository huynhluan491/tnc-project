const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserDAO = require("../DAO/UserDAO");
const CartDAO = require("../DAO/OrderDAO");

const signToken = (id, username, auth, OrderID) => {
  return jwt.sign(
    {
      UserID: id,
      Username: username,
      Auth: auth,
      // cartID: OrderID
    },
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRED_IN}
  );
};
exports.login = async (req, res) => {
  try {
    const form = req.body;
    //1. check if form is valid
    if (!form.password || !form.userName) {
      return res
        .status(403) // 403 - Forbidden
        .json({Code: 403, Msg: `Invalid params`});
    }
    //2. check if user existed
    const user = await UserDAO.getUserByUserName(form.userName);
    const OrderID = await CartDAO.getOrderIDByUserName(form.userName);
    let orderID;
    if (!OrderID) {
      orderID = -1;
    } else {
      orderID = OrderID;
    }
    if (!user) {
      return res
        .status(401) // 401 - Unauthorized
        .json({Code: 401, Msg: `Invalid user - ${form.userName}`});
    }
    //3. check if password is valid
    const isValidPassword = await bcrypt.compare(form.password, user.password);
    if (!isValidPassword) {
      return res
        .status(401) // 401 - Unauthorized
        .json({Code: 401, Msg: "Invalid authentication"});
    }
    //4. get JWT & response to use  //https://jwt.io/
    const token = signToken(user.UserID, user.UserName, user.Auth, cartID);
    //testing
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

exports.signup = async (req, res) => {
  try {
    const form = req.body;
    if (!form.password || !form.userName || !form.email) {
      return res.status(403).json({
        Code: 403,
        mgs: `Invalid Password`,
      });
    }

    await UserDAO.insertUser({
      userName: form.userName,
      email: form.email,
      password: form.password,
    });

    const user = await UserDAO.getUserByUserName(form.userName);
    await CartDAO.createNewCart(user.userID);
    delete user.password;
    // console.log("usertest", user);
    return res.status(200).json({
      Code: 200,
      Msg: "sign up success",
      Data: {user},
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
