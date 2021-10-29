import { Container, Hit, ResetButton } from "./AlgoliaElements";
import algoliasearch from "algoliasearch";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import "./algolia.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const searchClient = algoliasearch(
  "31RACQ57NW",
  "d60661b1114e50e709893f5735be534f"
);
const Algolia = () => {
  const [refresh, setRefresh] = useState(false);
  const [helper, setHelper] = useState(false);
  useEffect(() => {
    setRefresh(false);
  }, [helper]);

  const refreshAlgolia = () => {
    console.log("refreshing started");
    setRefresh(!refresh);
    setHelper(!helper);
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
      container.classList.add("focus");
    };
    const removefocus = () => {
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
    const unsubscribe = onSnapshot(q, () => {
      console.log("collection updated");
      setTimeout(refreshAlgolia, 5000);
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
      <InstantSearch
        refresh={refresh}
        searchClient={searchClient}
        indexName="rooms"
      >
        <ResetButton Reset={Reset} />
        <SearchBox onReset={(e) => ToggleFocus(e)} />
        <Hits hitComponent={Hit} />
      </InstantSearch>
      <button onClick={() => refreshAlgolia()}> Clear cache</button>
    </Container>
  );
};

export default Algolia;
