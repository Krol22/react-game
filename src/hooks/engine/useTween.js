import { useDispatch } from "react-redux";

const addAnimation = () => {};
const playAnimation = () => {};
const stopAnimation = () => {};

const useTween = (animation) => {
  const id = "exampleId";
  const dispatch = useDispatch();

  dispatch(addAnimation(id, animation));

  return {
    play: playAnimation(id),
    stop: stopAnimation(id),
  }
};

export default useTween;
