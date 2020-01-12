/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
var firebase = require("firebase");
const MASTERPASS = 'temporary';

firebase.initializeApp({
  apiKey: "AIzaSyBWnvJdxOYYnTcWotE0DhjyDG2HAUaZFik",
  authDomain: "the-drop-4bfee.firebaseapp.com",
  databaseURL: "https://the-drop-4bfee.firebaseio.com",
  projectId: "the-drop-4bfee"
});

const db = firebase.firestore();

async function createDrop(props) {
  const {code, location, name, notifyDate, prize, startDate, password} = props

  if(password !== MASTERPASS){
  	console.log('Incorrect password')
    return 0;
  }

  if (code === ""){
    code = Math.floor(Math.random()) * 100000000;
    console.log("Generated code", code)
  }

  const docRef = await db
    .collection('drops')
    .add({
      code: code,
      location: location,
      name: name,
      notifyDate: notifyDate,
      prize: prize,
      startDate: startDate,
      status: 0
    });
  console.log("Added doc with id", docRef.id)
  return 1;
}

// change to exports.signupUser before deploying
exports.addDrop = async (req, res) => {
  res.header('Content-Type','application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  //respond to CORS preflight requests
  if (req.method == 'OPTIONS') {
    res.status(204).send('');
  }

  const dropSuccess = await createDrop(JSON.parse(req.body));

  if (dropSuccess == 1) {
    return res.status(200).send("Success");
  }

    return res.status(403).send("Error");
};
