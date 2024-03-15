import React from "react";
const AuthLeft = () => {
  const loginLeftStyle = `
  .loginLeft{
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
 }
 .loginLogo{
    font-size: 60px;
    font-weight: 800;
    color: #1775ee;
    margin-bottom: 10px;
}
.loginDesc{
    font-size: 20px;
}
  `;
  return (
    <>
      <style>{loginLeftStyle}</style>
      <div className="loginLeft">
        <h3 className="loginLogo">ConnectMazjid Portal</h3>
        <span className="loginDesc">
          The Admin Portal of Masjid App to work with masjid's and Events.
        </span>
      </div>
    </>
  );
};

export default AuthLeft;
