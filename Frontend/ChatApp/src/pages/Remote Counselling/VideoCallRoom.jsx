import React from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import { useSelector } from 'react-redux'

const VideoCallRoom = () => {
    const {roomId} = useParams()
    const {user} = useSelector(state=>state.auth)
    const myMeeting  =  async (element)=>{
       const appId =1205572401
       const serverSecret ="4c515a21ef210f3cc2baf93d0cd42f8a"
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