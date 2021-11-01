import { collection, limit, onSnapshot, orderBy, query, Timestamp } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

type MessageClass = {
    content: string;
    timestamp: Timestamp;
    user: string;
    userphotoURL: string;
    userid: string;
}
export default function useRoomMessageList(roomid:string) {
  const [messagelist, setmessagelist] = useState<MessageClass[]>([]);

  useEffect(() => {
    const ref = collection(db, `/rooms/${roomid}/messages`);
    const q = query(ref, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages:MessageClass[] = [];
      querySnapshot.forEach((message) => {
        messages.push({
            ...message.data()
        } as MessageClass);
      });
      setmessagelist(messages.reverse());
      // EndOfMessageList.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
    return unsubscribe;
  }, [roomid]);

  return messagelist;
}
