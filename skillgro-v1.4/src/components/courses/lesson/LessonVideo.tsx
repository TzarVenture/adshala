"use client";
import { useEffect } from "react";
import Plyr from 'plyr';

const LessonVideo = () => {

   useEffect(() => {
      const player = new Plyr('#player');
      return () => {
         player.destroy();
      };
   }, []);

   return (
      <video id="player" playsInline controls data-poster="/svg-animation-img/video_bg.webp">
         <source src="/svg-animation-img/video.mp4" type="video/mp4" />
         <source src="/path/to/video.webm" type="video/webm" />
      </video>
   )
}

export default LessonVideo
