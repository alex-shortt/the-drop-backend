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

async function getDrop(id) {
  const doc = await db
    .collection("drops")
    .doc(id)
    .get();

  if (!doc.exists) {
    return null;
  }

  return doc.data();
}

// change to exports.signupUser before deploying
const signupUser = async (req, res) => {
  const { venmo, phone } = req.body;
  console.log(venmo)
  console.log(phone)
  let drop = await getDrop("trRhr7AX26Ll5YOYRI6e");
  console.log(drop);
  // res.status(200).send(drop);
};

signupUser({ body: { venmo: "alex-shortt", phone: 4086803231 } });


/*
  exports.signupUser = (req, res) => {
    let message = req.query.message || req.body.message || 'Hello World Man!';
    res.status(200).send(message);
  };`
*/
