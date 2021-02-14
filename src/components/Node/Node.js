import React from "react";

export const Node = React.forwardRef(({
  x = 0,
  y = 0,
  rotation = 0,
  scaleX = 1,
  scaleY = 1,
  local = false,
  width = 0,
  height = 0,
  anchorPoint,
  zIndex,
  visible = true,
  children,
  ...rest
}, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: local ? 'relative' : 'absolute',
        top: y,
        left: x,
        transform:`rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`,
        width: width,
        height: height,
        display: visible ? `inline-block` :`none`,
        zIndex: zIndex ? `${zIndex}` : 'unset',
        boxSizing: 'content-box',
        transformOrigin: anchorPoint ? `${anchorPoint}` : 'center',
      }}
      {...rest}
    >
      {children}
    </div>
  ) 
});
