import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
type PropsType = {
  reference: any;
  pHolder: string;
  showPas: boolean;
  belowTx?: boolean;
  setShowPas: (val: boolean) => void;
};
const PasswordInput = ({
  reference,
  pHolder,
  showPas,
  setShowPas,
  belowTx = true,
}: PropsType) => {
  // const [showPas, setShowPas] = useState(false);
  return (
    <>
      <div className="InputFields">
        <input
          placeholder={pHolder}
          type={showPas ? "text" : "password"}
          ref={reference}
          required
          className="ResetPasswordInput"
          
        />
        {showPas ? (
          <AiFillEye
            onClick={() => setShowPas(!showPas)}
            className="ShowPasswordLogin"
          />
        ) : (
          <AiFillEyeInvisible
            onClick={() => setShowPas(!showPas)}
            className="ShowPasswordLogin"
          />
        )}
      </div>
      {belowTx ? (
        <span className="PasswordDetails">
          Password must has at least 8 characters, that include at least 1
          lowercase character, 1 uppercase characters, 1 number and 1 special
          character in (!@#$%^&*)
        </span>
      ) : null}
    </>
  );
};

export default PasswordInput;
