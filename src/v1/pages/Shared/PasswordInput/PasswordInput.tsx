import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
type PropsType = {
  reference: any;
  pHolder: string;
  isPasswordVisible: boolean;
  setIsPasswordVisible: (val: boolean) => void;
};
const PasswordInput = ({
  reference,
  pHolder,
  isPasswordVisible,
  setIsPasswordVisible,
}: PropsType) => {
  // const [showPas, setShowPas] = useState(false);
    return (
    <>
      <div className="InputFields">
        <input
          placeholder={pHolder}
          type={isPasswordVisible ? "text" : "password"}
          ref={reference}
          required
          className="ResetPasswordInput"
        />
        {isPasswordVisible ? (
          <AiFillEye
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="ShowPasswordLogin"
            role="button"
            data-testid="show-password"
          />
        ) : (
          <AiFillEyeInvisible
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="ShowPasswordLogin"
            role="button"
            data-testid="hide-password"
          />
        )}
      </div>
    </>
  );
};

export default PasswordInput;
