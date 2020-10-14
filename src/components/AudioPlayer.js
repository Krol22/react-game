import React, { useEffect } from "react";

import music from "../assets/music/track_1.mp3";

const AudioPlayer = () => {
  useEffect(() => {
    setTimeout(() => {
      const audio = new Audio(music);
      audio.load();
      audio.play();
    }, 1000);
  }, []);

  return <></>;
};

export default AudioPlayer;
