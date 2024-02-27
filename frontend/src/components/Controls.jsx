import { useMeeting } from "@videosdk.live/react-sdk";
import { useSelector } from "react-redux";

export default function Controls() {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    const particiants = useSelector((state) => state.auth.particiants);
    return (
      <div className="flex items-center justify-items-start gap-2">
        <button onClick={() => leave()}>Leave</button>
        <button onClick={() => toggleMic()}>Mic</button>
        <button onClick={() => toggleWebcam()}>webCam</button>
      </div>
    );
  }