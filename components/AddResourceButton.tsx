import React, { FunctionComponent } from "react";

interface AddResourceButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: number;
}

const DEFAULT_SIZE = 50;

const AddResourceButton: FunctionComponent<AddResourceButtonProps> = ({
  size = DEFAULT_SIZE,
  ...rest
}) => {
  const scale = size / DEFAULT_SIZE;
  return (
    <button {...rest}>
      <svg
        width={(50 - 4) * scale}
        height={(50 - 4) * scale}
        viewBox={`0 0 50 50`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#00063C"
      >
        <line x1="24.75" y1="13.75" x2="24.75" y2="36.25" strokeWidth="2" />
        <line x1="13.75" y1="25.25" x2="36.25" y2="25.25" strokeWidth="2" />
      </svg>
      <style jsx>{`
        button {
          transition: 0.3s;
          width: ${50 * scale}px;
          height: ${50 * scale}px;
          border-radius: 999px;
          border: solid ${2 * scale}px #00063c;
          background-color: "white";
          box-sizing: box-content;
        }
        button:hover {
          background-color: #00063c;
          cursor: pointer;
        }
        button:hover svg {
          stroke: white;
        }
      `}</style>
    </button>
  );
};

export default AddResourceButton;
