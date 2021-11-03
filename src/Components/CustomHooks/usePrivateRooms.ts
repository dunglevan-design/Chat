import { useEffect, useState } from "react";
import {
  query,
  collection,
  doc,
  where,
  onSnapshot,
  documentId,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "../../firebase";
import { room } from "../Algolia/Algolia";


export const usePrivateRooms = (userid: string) => {
  const [privaterooms, setprivaterooms] = useState<room[]>([]);

  useEffect(() => {
    const roomlistref = doc(db, "users", userid);
    let unsubscribe2 : Unsubscribe;
    const unsubscribe1 = onSnapshot(roomlistref, (QuerySnapshot) => {
      const roomidlist = QuerySnapshot.data()?.privateRooms;
      if(!roomidlist) return;
      const q = query(
        collection(db, "rooms"),
        where(documentId(), "in", roomidlist)
      );
      unsubscribe2 = onSnapshot(q, (snapshot) => {
        const roomlist:room[] = [];
        snapshot.forEach((documentsnapshot) => {
          let aroom = { ...documentsnapshot.data(), roomid: documentsnapshot.id } as room;
          roomlist.push({ ...aroom });
        });
        setprivaterooms(roomlist);
      });
    });
    return () => {
        unsubscribe1();
        unsubscribe2();
    };
  }, []);
  return privaterooms;
};
