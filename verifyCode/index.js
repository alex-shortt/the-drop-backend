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

async function verifyTheCode(res, props) {
  const { code, venmo } = props;

  const dropDocs = await db.collection("drops").where("code", "==", code).get()
  const drops = []
  for (const dropDoc of dropDocs.docs) {
    drops.push({...dropDoc.data(), id: dropDoc.id})
  }

  if(drops.length === 0){
    console.log("Code did not solve a drop")
    return res.status(400).send({ error: true, message: "Invalid code." });
  }

  const drop = drops[0]
  if(drop.status !== "active" || drop.winner){
    console.log("Drop has already been solved.");
    return res.status(400).send({ error: true, message: "Drop has already been solved." });
  }

  var docRef = db.collection("drops").doc(drop.id);
  docRef.update({
    state: "completed",
    winner: venmo
  })

  return res.status(200).send({ success: true });
}

// change to exports.signupUser before deploying
exports.verifyCode = async (req, res) => {
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  //respond to CORS preflight requests
  if (req.method == "OPTIONS") {
    res.status(204).send("");
  }

  return await verifyTheCode(res, JSON.parse(req.body));
};