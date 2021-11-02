import {
  Container,
  Hit,
  Hitwrapper,
  ResetButton,
  Room,
  Roomlist,
  RoomlistContainer,
  Slider,
  Wrapper,
} from "./AlgoliaElements";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import "./algolia.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { query, collection, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";

const searchClient = algoliasearch(
  "31RACQ57NW",
  "d60661b1114e50e709893f5735be534f"
);
export type room = {
  roomid: string;
  roomname: string;
  roomtype: string;
  roommessagecount: number;
  roomphotoURL: string;
  latestmessage: string;
  latestmessagetime: Timestamp;
  latestmessageuser: string;
  latestmessageuserphotoURL: string;
  //TODO add roomtime: Timestamp: time until flush
};
const Algolia = () => {
  const [roomlist, setroomlist] = useState<room[]>([]);
  const [inputfocused, setinputfocused] = useState(false);

  const variants = {
    slidein: {
      x: 0,
    },
    slideout: {
      x: "-100%",
    },
  };
  const ToggleFocus = (e: SyntheticEvent) => {
    (
      document
        .getElementsByClassName("ais-SearchBox-input")
        .item(0) as HTMLElement
    ).blur();
  };

  useEffect(() => {
    const input = document
      .getElementsByClassName("ais-SearchBox-input")
      .item(0) as HTMLElement;
    const container = document
      .getElementsByClassName("algolia__container")
      .item(0) as HTMLElement;
    const addfocus = () => {
      setinputfocused(true);
      container.classList.add("focus");
      
    };
    const removefocus = () => {
      // qeuue this. Otherwise any click effects on a component that depends on inputfocused wont be registerd
      setTimeout(() => {
        setinputfocused(false);
        console.log("input unfocus event");
      }, 100);
      container.classList.remove("focus");

    };
    input.addEventListener("focus", addfocus);
    input.addEventListener("blur", removefocus);

    return () => {
      input.removeEventListener("focus", addfocus);
      input.removeEventListener("blur", removefocus);
    };
  }, []);

  useEffect(() => {
    const q = query(collection(db, "rooms"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let rooms: room[] = [];
      querySnapshot.forEach((room) => {
        let aroom = { ...room.data(), roomid: room.id } as room;
        rooms.push({ ...aroom });
      });
      setroomlist(rooms);
    });

    return unsubscribe;
  }, []);

  const Reset = () => {
    (
      document
        .getElementsByClassName("ais-SearchBox-reset")
        .item(0) as HTMLElement
    ).click();
  };
  return (
    <Container className="algolia__container">
      <InstantSearch searchClient={searchClient} indexName="rooms">
        <ResetButton Reset={Reset} />
        <SearchBox onReset={(e) => ToggleFocus(e)} />
        <RoomlistContainer>
          <Slider variants = {variants}  animate = {inputfocused ? "slideout" : "slidein"}>
            <Wrapper>
              <Roomlist>
                {roomlist.map((room, index) => (
                  <Room key={index} {...room} />
                ))}
              </Roomlist>
            </Wrapper>
            <Hitwrapper>
              <Hits hitComponent={Hit} />
            </Hitwrapper>
          </Slider>
        </RoomlistContainer>
      </InstantSearch>
    </Container>
  );
};

export default Algolia;
