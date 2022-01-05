import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as corsLib from "cors";
import { firestore } from "firebase-admin";
const Filter = require("bad-words")

const cors = corsLib();

var serviceAccount = require("../Keys/chat-b7198-firebase-adminsdk-y9ec3-c22a578f15.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const messaging = admin.messaging();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const subscribeToTopic = functions.https.onRequest(
  (request, response) => {
    return cors(request, response, () => {
      const token = request.body.token;
      const topic = request.body.roomid;

      // subscribe user with this token to roomid
      functions.logger.info(
        `Subscribing to topic! ${topic} for token ${token}`,
        { structuredData: true }
      );
      messaging
        .subscribeToTopic(token, topic)
        .then((response) => {
          // See the MessagingTopicManagementResponse reference documentation
          // for the contents of response.
          console.log("Successfully subscribed to topic:", response);
        })
        .catch((error) => {
          console.log("Error subscribing to topic:", error);
        });
      response.send(`Hi, i am subsribing you to topic`);
    });
  }
);

//Listen to change in messages, getToken from database and send.
/**
 * Send notification to topic
 */
export const sendMessageNotification = functions.firestore
  .document("/rooms/{roomid}/messages/{messageid}")
  .onCreate(async (snap, context) => {
    // const original = snap.data().original;
    // console.log("hello");
    // functions.logger.log('Uppercasing', context.params.roomid, original);

    // get list of users in the room
    const roomid = context.params.roomid;
    // const messageid = context.params.messageid;
    // const roomref = admin.firestore().doc(`rooms/${roomid}`);
    // const roomsnapshot = await roomref.get();
    // const useridlists = roomsnapshot?.data()?.users;
    // functions.logger.info(useridlists, { structuredData: true });

    // get message data.
    const messagedata = await admin
      .firestore()
      .doc(`rooms/${roomid}/messages/messageid`)
      .get();
    // The topic name can be optionally prefixed with "/topics/".
    const topic = roomid;

    const message = {
      data: {
        messageid: messagedata.id,
        ...messagedata.data(),
      },
      topic: topic,
    };

    // Send a message to devices subscribed to the provided topic.
    messaging
      .send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  });


  export const detectEvilUsers = functions.firestore.document("rooms/{roomid}/messages/{messageid}").onCreate(async (doc, ctx) => {
    console.log("detecting evil users")
    const filter = new Filter();
    
    const {content, userid} = doc.data();

    if (filter.isProfane(content)) {
      const cleaned = filter.clean(content);
      await doc.ref.update({content: `This person has been banned for saying bad words ... ${cleaned}`});
      await firestore().collection("banned").doc(userid).set({});
    }

  })
