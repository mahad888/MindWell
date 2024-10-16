import React from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import { useSelector } from 'react-redux'

const VideoCallRoom = () => {
    const {roomId} = useParams()
    const {user} = useSelector(state=>state.auth)
    const myMeeting  =  async (element)=>{
       const appId =962887853
       const serverSecret ="51ee8f6a58818930a59a64d4db6662b8"
       const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret,roomId,user._id,user.name)

       const zp = ZegoUIKitPrebuilt.create(kitToken);
       zp.joinRoom({
         container: element,
         scenario: {
           mode: ZegoUIKitPrebuilt.OneONoneCall, // or LiveStreaming
           showScreenSharingButton:false
         },
       });
    }


  return (
    <div>
        <div ref={myMeeting}/>
    </div>
  )
}

export default VideoCallRoom