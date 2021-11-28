import { useEffect, useState } from "react";
import {
  query,
  collection,
  doc,
  where,
  onSnapshot,
  documentId,
  Unsubscribe,
  getDoc,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../../firebase";
import { room } from "../Algolia/Algolia";

export const usePrivateRooms = (userid: string) => {
  const [privaterooms, setprivaterooms] = useState<room[]>([]);

  let unsubscribe2:Unsubscribe;

  //get a list of all private rooms and listen to change on that room
  useEffect(() => {
    const roomlistref = doc(db, "users", userid);
    //listentochange to user doc: if a room has been added
    const unsubscribe1 = onSnapshot(roomlistref, (QuerySnapshot) => {
      //remove the previous listener to private rooms
      if(unsubscribe2){
        console.log("removing listener");
        unsubscribe2();
      }
      const roomidlist = QuerySnapshot.data()?.privateRooms;
      //if no rooms, nvm. i.e: First snapshot return.
      if(!roomidlist) return;
      // setup new listener on all rooms.
      const q = query(
        collection(db, "rooms"),
        where(documentId(), "in", roomidlist)
      );
      console.log("adding listener");
      unsubscribe2 = onSnapshot(q, (snapshot) => {
        const roomlist: room[] = [];
        snapshot.forEach((documentsnapshot) => {
          let aroom = {
            ...documentsnapshot.data(),
            roomid: documentsnapshot.id,
          } as room;
          roomlist.push({ ...aroom });
        });
        setprivaterooms(roomlist);
      });

    });

    // listen to change to private rooms
    return () => {
      console.log("removing listner in effect");
      unsubscribe1();
      unsubscribe2();
    } 
  }, []);
  return privaterooms;
};
