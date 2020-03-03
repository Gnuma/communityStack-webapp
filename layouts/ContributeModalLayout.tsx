import React, { FunctionComponent } from "react";
import useInputChange from "../utils/inputController";
import * as colors from "../utils/colors";

interface ContributeModalLayoutProps {
  callback: CallableFunction;
}

const ContributeModalLayout: FunctionComponent<ContributeModalLayoutProps> = ({
  callback
}) => {
  const [input, changeInput] = useInputChange();

  return (
    <div className="modal-form">
      <form
        onSubmit={e => {
          e.preventDefault();
          callback(input);
        }}
      >
        <span className="subtitle">just a few infos</span>
        <label className="form-text">link*</label>
        <input
          onChange={changeInput}
          className="form-text"
          type="text"
          name="link"
          placeholder="Enter resource link..."
        />
        <label className="form-text">are you the author of the resource?</label>
        <div className="radio-buttons">
          <input type="radio" name="yn" value="Yes" onChange={changeInput} />
          <label className="form-text">yes</label>
          <input type="radio" name="yn" value="No" onChange={changeInput} />
          <label className="form-text">no</label>
        </div>
        <label className="form-text">email*</label>
        <input
          onChange={changeInput}
          className="form-text"
          type="text"
          name="email"
          placeholder="Enter your email..."
        />
        <label className="form-text">user*</label>
        <input
          onChange={changeInput}
          className="form-text"
          type="text"
          name="username"
          placeholder="Enter your username..."
        />
        <input className="submit-button" type="submit" value="Contribute" />
      </form>

      <style jsx>{`
        .modal-form {
          padding: 5px;
          width: 100%;
          overflow: none;
        }

        .modal-form > form {
          display: flex;
          flex-direction: column;
        }

        .modal-form > form > * {
          margin: 5px 0px;
        }

        .form-text {
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: 0.1em;
          color: ${colors.PRIMARY_BLUE};
        }

        .radio-buttons {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          width: 50%;
        }

        .submit-button {
          width: 25%;
        }
      `}</style>
    </div>
  );
};

export default ContributeModalLayout;
