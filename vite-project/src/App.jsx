import React, { useState } from "react";
import "./login.css";

export default function Login() {
    const [NICKNAME, setNICKNAME] = useState("");
    const [ID, setID] = useState("");
    const [PASSWORD, setPASSWORD] = useState("");
    const [REPASSWORD, setREPASSWORD] = useState("");
    const [EMAIL, setEMAIL] = useState("");
    const existingIds =["fish, prince, style"];
    const [idMessage, setIdMessage] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);

    const handleCheckId = () => {
        if(existingIds.includes(ID)){
            setIdMessage("사용 불가능한 아이디입니다");
            setIsAvailable(false);
            
        }
        else{
            setIdMessage("사용 가능한 아이디입니다");
            setIsAvailable(true);
        }
        }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("NICKNAME", NICKNAME,"ID", ID, "PASSWORD", PASSWORD, "REPASSWORD", REPASSWORD, "EMAIL", EMAIL);
    };
  return (
    <>
    <div className="navbar">
      <div className="logo">로고</div>

      <div className="menu">
        <span>Home</span>
        <span>Wishlist</span>
        <span>My page</span>
      </div>
    </div>
    
    <div className="login-wrapper">
        
        <div className="login-page">
            
            <div className="login-card">
            <h1 className="login-title">SIGN UP</h1>
            <form className="login-form-warpper" onSubmit={handleSubmit}>
                <div className="login-form">
                    <div className="form-name">
                        <label className="login-label">닉네임</label>
                        <input
                         type="text"
                         placeholder="닉네임을 입력해주세요"
                         className="login-input"
                         value={NICKNAME}
                         onChange={(e) => setNICKNAME(e.target.value)}
                         />
                  </div>
                  <div className="form-ID">
                         <label className="login-label">아이디</label>
                         <div className="id-area">
                         <input
                         type="text"
                         placeholder="아이디를 입력해주세요"
                         className="login-input"
                         value={ID}
                         onChange={(e) => setID(e.target.value)}
                         />
                         {idMessage && ( <p className={`id-message ${isAvailable ? "success" : "error"}`}> {idMessage}</p>)}
                         <button type="button" 
                         className="check-button"
                         onClick={handleCheckId}>
                            중복 확인
                         </button>
                         </div>
                 </div>
                 <div className="form-password">
                         <label className="login-label">비밀번호</label>
                   
                         <input
                         type="password"
                         placeholder="비밀번호를 입력해주세요"
                         className="login-input"
                         value={PASSWORD}
                         onChange={(e) => setPASSWORD(e.target.value)}
                         />
                   </div>
                   <div className="form-repassword">
                         <label className="login-label">비밀번호 확인</label>
                         <input
                         type="password"
                         placeholder="비밀번호를 한 번 더 입력해주세요"
                         className="login-input"
                         value={REPASSWORD}
                         onChange={(e) => setREPASSWORD(e.target.value)}
                         />
                 </div>
                 <div className="form-email">
                         <label className="login-label">이메일</label>
                         <input
                         type="text"
                         placeholder="이메일을 입력해주세요"
                         className="login-input"
                         value={EMAIL}
                         onChange={(e) => setEMAIL(e.target.value)}
                         />
                 </div>
                         <button type="submit" className="create-button">
                            회원가입
                         </button>

                    
                  
                </div>
                </form>
            </div>
        </div>

    </div>
   </>
  );
}