/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
var firebase = require("firebase");
const Masterpassword = 'temporary';

firebase.initializeApp({
  apiKey: "AIzaSyBWnvJdxOYYnTcWotE0DhjyDG2HAUaZFik",
  authDomain: "the-drop-4bfee.firebaseapp.com",
  databaseURL: "https://the-drop-4bfee.firebaseio.com",
  projectId: "the-drop-4bfee"
});

const db = firebase.firestore();

async function createDrop(code, location, name, notifyDate, prize, startDate, status, winnerId, password) {

  if (password == Masterpassword){
    if (code == ""){
      code = Math.floor(Math.random()) * 100000000;
    }
    console.log(code)
    const docRef = await db
          .collection('drops')
          .add({
            code: code,
            location: location,
            name: name,
            notifyDate: notifyDate,
            prize: prize,
            startDate: startDate,
            status: status,
            winnerId: winnerId,
          }).then(ref => {
            console.log('Added drop with ID: ', ref.id);
          });
          return 1;
  }
  else{
    console.log('Incorrect password')
    return 0;
  }
}

// change to exports.signupUser before deploying
exports.addDrop = async (req, res) => {
  const { code, location, name, notifyDate, prize, startDate, status, winnerId, password } = req.body;
  let dropSuccess = await createDrop(code, location, name, notifyDate, prize, startDate, status, winnerId, password);
  if (dropSuccess == 1)
    res.status(200);
  else
    res.status(403);
};

addDrop({ body: { code: "",
  location: "",
  name: "name",
  notifyDate: "",
  prize: "",
  startDate: "",
  status: "",
  winnerId: "",
  password: "", } });


/*
  exports.signupUser = async (req, res) => {
    let message = req.query.message || req.body.message || 'Hello World Man!';
    res.status(200).send(message);
  };`
*/