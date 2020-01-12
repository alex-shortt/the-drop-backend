/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */

var firebase = require("firebase");

firebase.initializeApp({
  apiKey: "AIzaSyBWnvJdxOYYnTcWotE0DhjyDG2HAUaZFik",
  authDomain: "the-drop-4bfee.firebaseapp.com",
  databaseURL: "https://the-drop-4bfee.firebaseio.com",
  projectId: "the-drop-4bfee"
});

const db = firebase.firestore();

async function createUser(res, props) {
  const { phone, venmo } = props;

  const docRef = await db.collection("users").add({
    phone: phone,
    venmo: venmo
  });
  console.log("Added doc with id", docRef.id);
  return res.status(200).send({ success: true });
}

// change to exports.signupUser before deploying
//const signupUser = async (req, res) => {
  exports.signupUser = async (req, res) => {

  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  //respond to CORS preflight requests
  if (req.method == "OPTIONS") {
    res.status(204).send("");
  }

  return await createUser(res, JSON.parse(req.body));
};
