const axios = require("axios");
exports.getSession = async (req, res) => {
  try {
    const response = await axios.get(
      "https://http://127.0.0.1:5000/api/v1/session"
    );

    const data = response;

    res.status(200).json(data);
  } catch (error) {
    console.error("Error sending request:", error);
    res
      .status(500)
      .json({error: "An error occurred while sending the request."});
  }
};

exports.getSessionID = async (req, res) => {
  try {
    const id = req.params.id * 1;
    const response = await axios.get(
      "https://http://127.0.0.1:5000/api/v1/session" + id
    );

    const data = response;

    res.status(200).json(data);
  } catch (error) {
    console.error("Error sending request:", error);
    res
      .status(500)
      .json({error: "An error occurred while sending the request."});
  }
};

exports.addChat = async (req, res) => {
  try {
    const sid = req.params.id * 1;
    const reqBody = req.body;
    const response = await axios.post(
      "https://http://127.0.0.1:5000/api/v1/chat/" + sid,
      reqBody
    );

    const data = response;

    res.status(200).json(data);
  } catch (error) {
    console.error("Error sending request:", error);
    res
      .status(500)
      .json({error: "An error occurred while sending the request."});
  }
};

exports.getImage = async (req, res) => {
  try {
    const imageName = req.params.imageName;
    const response = await axios.get(
      "https://http://127.0.0.1:5000/api/v1/chat/image/" + imageName,
      {
        responseType: "blob",
      }
    );

    const data = response;

    res.status(200).json(data);
  } catch (error) {
    console.error("Error sending request:", error);
    res
      .status(500)
      .json({error: "An error occurred while sending the request."});
  }
};
