import { doc, onSnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { room } from "../Algolia/Algolia";

function useRoomDetails(roomid: string) {
  const [roomdetails, setroomdetails] = useState<room>(null);

  useEffect(() => {
    if (roomid === null || roomid === undefined) return null;
    else {
      const roomref = doc(db, "rooms", roomid);
      const unsubscribe = onSnapshot(roomref, (room) => {
        setroomdetails({ ...room.data(), roomid: room.id } as room);
      });
      return unsubscribe;
    }
  }, [roomid]);
  return roomdetails;
}

export default useRoomDetails;
