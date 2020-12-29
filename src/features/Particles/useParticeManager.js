import { useDispatch, useEffect } from "react-redux";

import { updateEmitters } from "./particleSlice";
import { useRef } from "react";
 
const useParticleManager = () => {
  const dispatch = useDispatch();
  const requestRef = useRef();

  const update = delta => {
    dispatch(updateEmitters(delta));   
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [requestRef]);
};

export default useParticleManager;
