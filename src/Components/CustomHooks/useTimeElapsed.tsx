import { Timestamp } from "@firebase/firestore";
import { useEffect, useState } from "react";

export function useTimeElapsed(timestamp: Timestamp){
    const [messagetime, setMessageTime] = useState("");
    const ConvertTimestamp = (timestamp:Timestamp) : string => {
      if (typeof timestamp.seconds === undefined || timestamp.seconds === null) return "";
  
      const now = Timestamp.now();
      const timepassed = now.seconds - timestamp.seconds;
  
  
      if (timepassed < 60) {
        return `${Math.round(timepassed)} seconds ago`;
      } else if (timepassed < 60 * 60) {
        return `${Math.round(timepassed / 60)} minutes ago`;
      } else if (timepassed < 60 * 60 * 24) {
        return `${Math.round(timepassed / 60 / 60)} hours ago`;
      } else {
        return `${Math.round(timepassed / 60 / 60 / 24)} days ago`;
      }
    };
  
    useEffect(() => {
      setMessageTime(ConvertTimestamp(timestamp));
    }, [timestamp]);

    return messagetime;
}