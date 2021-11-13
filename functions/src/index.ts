import * as functions from "firebase-functions";
import * as admin from "firebase-admin"; 

admin.initializeApp();


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const subscribeToTopic = functions.https.onRequest((request, response) => {
  
  functions.logger.info("Subscribing to topic!", {structuredData: true});
  response.send("Hi, i am subsribing you to topic");
})

//Listen to change in messages, getToken from database and send.
/**
 * Get list of userids from room data. Get list of tokens, send to all user.
 */
export const sendMessageNotification = functions.firestore.document('/rooms/{roomid}/messages/{messageid}').onCreate(async (snap,context) => {
  // const original = snap.data().original;
  // console.log("hello");
  // functions.logger.log('Uppercasing', context.params.roomid, original);
  

  // get list of users in the room
  const roomid = context.params.roomid;
  const roomref = admin.firestore().doc(`rooms/${roomid}`);
  const roomsnapshot = await roomref.get();
  const useridlists = roomsnapshot?.data()?.users;

  functions.logger.info(useridlists, {structuredData: true});
  
  // get notification token of every users.
  let notificationtokenlist = [];
  for (let index = 0; index < useridlists.length; index++) {
    const userid = useridlists[index];
    const userdocumentsnapshot = await admin.firestore().doc(`users/${userid}`).get();
    const token = userdocumentsnapshot?.data()?.notificationToken;
    notificationtokenlist.push(token);
  }
  functions.logger.info(notificationtokenlist, {structuredData: true});

})