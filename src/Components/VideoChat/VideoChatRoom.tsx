import { async } from "@firebase/util";
import React, { useEffect, useRef, useState } from "react";
import { addDoc, collection, onSnapshot, setDoc } from "firebase/firestore";
import { Container, Hangup, StyledVideoChatRoom, Video } from "./VideoChatRoomElements";
import { pc } from "./WebRTC";
import { db } from "../../firebase";

const VideoChatRoom = ({ stopvideocall }: { stopvideocall: () => void }) => {
  const [localstream, setlocalstream] = useState<MediaStream>(null);
  const [remotestream, setremotestream] = useState<MediaStream>(null);
  const Localvideo = useRef(null);
  const Remotevideo = useRef(null);
  const dragBox = useRef(null)

  const InitialiseStreams = async () => {
    setlocalstream(
      await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
    );
    setremotestream(new MediaStream());
    console.timeLog("Initialising stream", localstream, remotestream);
  };

  //TODO initialise the call:
  /** Get local stream, display local video
   *  Create an offer. put onto database
   * listen for answer
   * setup icelistener.
   * add ice to database
   */

  //Get Local stream. allow camera and stuff

  useEffect(() => {
    InitialiseStreams();
    return () => {};
  }, []);

  const CreateOfferAndListenToAnswer = async () => {
    const callDoc = await addDoc(collection(db, "calls"), {});
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

    await setDoc(callDoc, offer);

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

  useEffect(() => {
    if (!(localstream && remotestream)) return;
    /** Initialised local stream and remote stream.
     *
     */
    Localvideo.current.srcObject = localstream;
    Remotevideo.current.srcObject = remotestream;

    localstream.getTracks().forEach((track) => {
      pc.addTrack(track, localstream);
    });

    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      setremotestream(event.streams[0]);
    };

    /**Create offer and add to database */
    CreateOfferAndListenToAnswer();
  }, [localstream, remotestream]);

  return (
      <Container ref = {dragBox}>

    <StyledVideoChatRoom
      drag
      whileDrag={{ scale: 1.1 }}
      dragConstraints={dragBox}
    >
      <Hangup onClick={() => stopvideocall()}>Hang up</Hangup>
      <Video id="localvideo" ref={Localvideo} autoPlay playsInline></Video>
      <Video ref={Remotevideo}></Video>
    </StyledVideoChatRoom>
      </Container>
  );
};

export default VideoChatRoom;
