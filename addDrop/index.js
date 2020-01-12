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

async function createDrop(props) {
  const { location, name, notifyDate, prize, startDate, password } = props;

  const code = props.code === "" ? Math.floor(Math.random()) * 100000000 : code;

  if (password !== MASTERPASS) {
    console.log("Incorrect password");
    return 0;
  }

  const docRef = await db.collection("drops").add({
    code: code,
    location: new firebase.firestore.GeoPoint(location.lat, location.lng),
    name: name,
    notifyDate: notifyDate,
    prize: prize,
    startDate: startDate,
    status: 0
  });
  console.log("Added doc with id", docRef.id);
  return 1;
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

  let dropSuccess = 0;
  try {
    dropSuccess = await createDrop(JSON.parse(req.body));
  } catch (e) {
    return res.status(500).send("Internal Error");
  }

  if (dropSuccess == 1) {
    return res.status(200).send("Success");
  }

  return res.status(403).send("Error");
};
