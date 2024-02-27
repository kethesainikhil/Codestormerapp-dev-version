import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ParticipantView from "./ParticipantView";

export default function CardComponent() {
  const selectData = useSelector((state) => state.auth?.participants);
  const [particiants,setParticiants] = useState([]);
  
    useMemo(()=>{
      setParticiants(selectData);
      console.log(selectData,"selectData")
      console.log(particiants[0],"particiants")
    },[setParticiants,selectData,particiants])
    
  return (
   

<>
<div className="px-2 py-2">
                  <ParticipantView
                  participantId={particiants[0]}
                  
                />
                </div>

</>
  )
}


