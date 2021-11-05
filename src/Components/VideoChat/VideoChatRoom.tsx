import { async } from "@firebase/util";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  Container,
  Hangup,
  Hangupsvg,
  StyledVideoChatRoom,
  Video,
} from "./VideoChatRoomElements";
import { db } from "../../firebase";
import { context } from "../../Globals/GlobalStateProvider";
import { pc } from "./WebRTC";

const VideoChatRoom = ({
  stopvideocall,
  caller,
}: {
  stopvideocall: () => void;
  caller: boolean;
}) => {
  // const [localstream, setlocalstream] = useState<MediaStream>(null);
  // const [remotestream, setremotestream] = useState<MediaStream>(null);
  const Localvideo = useRef(null);
  const Remotevideo = useRef(null);
  const dragBox = useRef(null);
  const { globalstate } = useContext(context);
  const roomid = globalstate.currentRoom;
  const callref = useRef(false);
  callref.current = caller;

  let localstream: MediaStream = null;
  let remotestream: MediaStream = null;

  //TODO initialise the call:
  /** Get local stream, display local video
   *  Create an offer. put onto database
   * listen for answer
   * setup icelistener.
   * add ice to database
   */

  //Get Local stream. allow camera and stuff

  const CreateOfferAndListenToAnswer = async () => {
    await setDoc(doc(db, "calls", roomid), {});
    const callDoc = doc(db, "calls", roomid);
    const offerCandidates = collection(
      db,
      `calls/${callDoc.id}`,
      "offerCandidates"
    );
    const answerCandidates = collection(
      db,
      `calls/${callDoc.id}`,
      "answerCandidates"
    );

    //add ice candidate to db whenever we locally add ice to pc
    pc.onicecandidate = (event) => {
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };

    // create offer and add to db
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDoc, { offer: offer });

    // Listen for remote answer
    onSnapshot(callDoc, (snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });
    // Listen for remote ICE

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newCandidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(newCandidate);
        }
      });
    });
  };

  const GetOfferAndCreateAnswer = async () => {
    const callDoc = doc(db, "calls", roomid);
    const offerCandidates = collection(
      db,
      `calls/${callDoc.id}`,
      "offerCandidates"
    );
    const answerCandidates = collection(
      db,
      `calls/${callDoc.id}`,
      "answerCandidates"
    );
    //add ice candidate to db whenever we locally add ice to pc
    pc.onicecandidate = (event) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    //get offer from db and create answer
    const callData = (await getDoc(callDoc)).data();

    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await updateDoc(callDoc, { answer: answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newCandidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(newCandidate);
        }
      });
    });
  };

  const InitialiseStreams = async () => {
    // setlocalstream(
    //   await navigator.mediaDevices.getUserMedia({
    //     video: true,
    //     audio: true,
    //   })
    // );
    // setremotestream(new MediaStream());
    localstream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    remotestream = new MediaStream();
    console.log("Initialising stream", localstream, remotestream);
    console.log("effect runs");
    if (!(localstream && remotestream)) return;
    /** Initialised local stream and remote stream.
     *
     */

    console.log("Am I the caller? ", callref.current);
    console.log("Am I the caller? ", caller);
    console.log("set Track : ", localstream, remotestream);
    localstream.getTracks().forEach((track) => {
      pc.addTrack(track, localstream);
    });

    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      console.log("track is coming");
      event.streams[0].getTracks().forEach((track) => {
        remotestream.addTrack(track);
      });
    };
    Localvideo.current.srcObject = localstream;
    Remotevideo.current.srcObject = remotestream;

    /**Create offer and listen to answer if caller.
     *  Get offer data and create answer if callee */
    if (callref.current) {
      /**Create offer and add to database */
      CreateOfferAndListenToAnswer();
    } else {
      GetOfferAndCreateAnswer();
    }
  };

  useEffect(() => {
    InitialiseStreams();
  }, []);

  return (
    <Container ref={dragBox}>
      <StyledVideoChatRoom
        drag
        whileDrag={{ scale: 1.1 }}
        dragConstraints={dragBox}
      >
        <Hangup whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}  onClick={() => stopvideocall()}>
          <Hangupsvg
            viewBox="0 0 16 16"
          >
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
          </Hangupsvg>
        </Hangup>
        <Video id="localvideo" ref={Localvideo} autoPlay playsInline></Video>
        <Video ref={Remotevideo} autoPlay playsInline></Video>
      </StyledVideoChatRoom>
    </Container>
  );
};

export default VideoChatRoom;
