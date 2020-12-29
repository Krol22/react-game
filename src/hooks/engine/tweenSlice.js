import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const tickAnimation = (animation) => {
  const {
    currentFrame,
    frames,
    loop,
  } = animation;

  const currentAnimationFrame = frames[currentFrame];  
  const { duration, props } = currentAnimationFrame;

  const propertiesToChange = Object.keys(props);
  
  /* 
    forEach prop
    get each step for each frame,

    currentFrame;

    const propStep = nextFrame.props[prop].

    change prop
    check if duration is more,
    set next frame if loop is false,
  */
  
};


const tweenSlice = createSlice({
  name: "tween",
  initialState: {
    tweenAnimations: {},
  },
  reducers: {
    addAnimation: (store, { payload }) => {
      const { id, animation } = payload;

      // add step for each prop

      const animationObject = {
        id,
        playing: false,
        currentFrame: 0,
        ...animation,
      }

      store.tweenAnimations.id = animationObject;
    },
    playAnimation: (store) => {
      store.tweenAnimations.payload.playing = true;  
    },
    stopAnimation: (store) => {
      store.tweenAnimations.payload.playing = false;  
    },
  },
});

export const tick = createAsyncThunk(
  "tween/tick",
  (_, { getStore }) => {
    const animations = Object.values(getStore().tweenAnimations);

    animations
      .filter(({ playing }) => playing)
      .forEach(tickAnimation);
  },
);

export const {
  playAnimation,
  stopAnimation,
} = tweenSlice.actions;

export default tweenSlice.reducer;
