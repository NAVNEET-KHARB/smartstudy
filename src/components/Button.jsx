import React from 'react';

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  hoverBgColor = "hover:bg-blue-700",
  textColor = "text-white",
  hoverTextColor = "hover:text-gray-100",
  className = "",
  shadow = "shadow-lg",
  focusRing = "focus:ring-4 focus:ring-blue-300",
  rounded = "rounded-full",
  fontSize = "text-lg font-semibold",
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-6 py-3 ${bgColor} ${textColor} ${hoverBgColor} ${hoverTextColor} ${rounded} ${shadow} ${focusRing} ${fontSize} transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
