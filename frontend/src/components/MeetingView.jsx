import { useMeeting } from "@videosdk.live/react-sdk";
import { useMemo, useRef, useState } from "react";
import ParticipantView from "./ParticipantView";
import Controls from "./Controls";
import { useDispatch, useSelector } from "react-redux";
import { loadData } from "../store/auth";
import { Link } from "react-router-dom";

export default function MeetingView(props) {
      const [joined, setJoined] = useState(null);
      const participant = useRef([]);
      //Get the method which will be used to join the meeting.
      //We will also get the participants list to display all participants
      const { join, participants } = useMeeting({
        
        //callback for when meeting is joined successfully
        onMeetingJoined: () => {
          setJoined("JOINED");
        },
        
        //callback for when meeting is left
        onMeetingLeft: () => {
          props.onMeetingLeave();
        },
      });
      const joinMeeting = () => {
        setJoined("JOINING");
        join();
      };
      const dispatch = useDispatch();
    useMemo(() => {
        dispatch(loadData([...participants.keys()]));
        console.log([...participants.keys()],"participants");
      },[participants,dispatch])
  
    
      return (
        <div className="container">
          <h3>Meeting Id: {props.meetingId}</h3>
          {joined && joined == "JOINED" ? (

            <div className="flex items-center gap-5 flex-cols">

              {[...participants.keys()].length > 0 ? (
  [...participants.keys()].map((key) => (
    <div key={key} className="border-4 mt-4 border-black h-min w-min flex flex-col">
      <ParticipantView participantId={key} />
      
    </div>
  ))

) : (
  <div className="flex flex-col min-h-screen">
    <div className="flex-grow">
      <div className="grid grid-cols-4 gap-4 md:gap-8 lg:gap-12">
        <div className="bg-gray-200 h-20 md:h-40 mt-4"></div>
        <div className="bg-gray-400 h-20 md:h-40 mt-4"></div>
        <div className="bg-gray-500 h-20 md:h-40 mt-4"></div>
      </div>
      <div className="flex items-center justify-between my-20">
        <div className="bg-gray-200 w-1/5 h-20 md:h-40 mb-4"></div>
        <div className="bg-gray-200 h-20 w-1/5 md:h-40 mb-4"></div>
      </div>
      <div className="grid grid-cols-4 gap-4 md:gap-8 lg:gap-12 place-content-end">
        <div className="bg-gray-200 h-20 md:h-40 mb-4"></div>
        <div className="bg-gray-200 h-20 md:h-40 mb-4"></div>
        <div className="bg-gray-400 h-20 md:h-40 mb-4"></div>
        <div className="bg-gray-500 h-20 md:h-40 mb-4"></div>
      </div>
    </div>
  </div>
)}
               <Controls />
            </div>
          ) : joined && joined == "JOINING" ? (
            <p>Joining the meeting...</p>
          ) : (
            <button onClick={joinMeeting}>Join</button>
          )}
        </div>
      );
    }