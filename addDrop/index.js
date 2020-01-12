/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
var firebase = require("firebase");
const MASTERPASS = "temporary";

firebase.initializeApp({
  apiKey: "AIzaSyBWnvJdxOYYnTcWotE0DhjyDG2HAUaZFik",
  authDomain: "the-drop-4bfee.firebaseapp.com",
  databaseURL: "https://the-drop-4bfee.firebaseio.com",
  projectId: "the-drop-4bfee"
});

const db = firebase.firestore();

async function createDrop(res, props) {
  const { location, name, notifyDate, prize, startDate, password } = props;

  const code =
    props.code === "" ? Math.floor(Math.random() * 100000000).toString() : props.code;

  if (password !== MASTERPASS) {
    return res.status(400).send({ error: true, message: "Incorrect Password" });
    return 0;
  }

  const docRef = await db.collection("drops").add({
    code: code,
    location: new firebase.firestore.GeoPoint(location.lat, location.lng),
    name: name,
    notifyDate: notifyDate,
    prize: parseInt(prize),
    startDate: new Date(startDate),
    status: "pending"
  });
  console.log("Added doc with id", docRef.id);
  return res.status(200).send({ success: true });
}

// change to exports.signupUser before deploying
exports.addDrop = async (req, res) => {
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  //respond to CORS preflight requests
  if (req.method == "OPTIONS") {
    res.status(204).send("");
  }

  return await createDrop(res, JSON.parse(req.body));
};
