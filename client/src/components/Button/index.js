import React from "react";

const Button = ({ children, color = "black", type = "button", ...props }) => (
  <button type={type} {...props}>
    {children}
  </button>
);

const ButtonUnobtrusive = ({ children, type = "button", ...props }) => (
  <button type={type} {...props}>
    {children}
  </button>
);

export { ButtonUnobtrusive };

export default Button;
