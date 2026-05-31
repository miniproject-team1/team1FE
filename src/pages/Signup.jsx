import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://team1.z0.co.kr";

const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const LoginPage = styled.div`
  width: 1440px;
  min-height: 100vh;
  height: auto;
  background-color: #eef1da;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 208px 70px;
  box-sizing: border-box;
  overflow: visible;
`;

const LoginCard = styled.div`
  width: 1024px;
  min-height: 700px;
  height: auto;
  background-color: #ffffff;
  border-radius: 50px;
  padding: 69px 53px;
  align-items: center;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

const LoginTitle = styled.h1`
  text-align: center;
  margin-bottom: 5px;
  font-family: "S-Core Dream", sans-serif;
  font-size: 40px;
  font-weight: 500;
`;

const LoginForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 27px;
  padding: 50px 30px 0;
  align-items: center;
  box-sizing: border-box;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 87px;
  width: 100%;
`;

const Label = styled.label`
  width: 180px;
  flex-shrink: 0;
  font-family: "S-Core Dream", sans-serif;
  font-size: 25px;
  font-weight: 200;
  text-align: left;
`;

const Input = styled.input`
  height: 60px;
  width: 650px;
  border: 2px solid #d5e5d5;
  border-radius: 15px;
  background-color: #ffffff;
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 22px;
  font-weight: 200;
  padding: 15px 21px;
  box-sizing: border-box;
  outline: none;

  &::placeholder {
    color: rgba(162, 162, 162, 0.5);
    font-family: "S-Core Dream", sans-serif;
    font-size: 22px;
    font-weight: 200;
  }
`;

const CreateButton = styled.button`
  margin-top: 53px;
  border: none;
  background: #d5e5d5;
  color: #000000;
  border-radius: 15px;
  height: 60px;
  width: 800px;
  font-family: "S-Core Dream", sans-serif;
  font-size: 24px;
  font-weight: 200;
  cursor: pointer;
  &:active {
    transform: translateY(1px);
  }
`;

const ErrorModal = styled.div`
  margin-top: 16px;
  width: 800px;
  padding: 18px 24px;
  background: #fff0f0;
  border: 1px solid #f5c6c6;
  border-radius: 15px;
  color: #d00;
  font-family: "S-Core Dream", sans-serif;
  font-size: 20px;
  font-weight: 200;
  text-align: center;
`;

export default function Signup() {
  const navigate = useNavigate();
  const [NICKNAME, setNICKNAME] = useState("");
  const [ID, setID] = useState("");
  const [PASSWORD, setPASSWORD] = useState("");
  const [REPASSWORD, setREPASSWORD] = useState("");
  const [EMAIL, setEMAIL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (PASSWORD !== REPASSWORD) {
      setErrorMessage("비밀번호가 일치하지 않습니다");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/register`, {
        loginId: ID,
        password: PASSWORD,
        passwordConfirm: REPASSWORD,
        email: EMAIL,
        nickname: NICKNAME,
      });

      if (response.data.success) {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      }
    } catch (error) {
      const message = error.response?.data?.message || "";
      const lower = message.toLowerCase();
      if (lower.includes("아이디") || lower.includes("loginid")) {
        setErrorMessage("중복된 아이디입니다");
      } else if (lower.includes("이메일") || lower.includes("email")) {
        setErrorMessage("중복된 이메일입니다");
      } else {
        setErrorMessage(message || "회원가입에 실패했습니다");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <LoginPage>
        <LoginCard>
          <LoginTitle>SIGN UP</LoginTitle>
          <form onSubmit={handleSubmit}>
            <LoginForm>
              <FormRow>
                <Label>닉네임</Label>
                <Input
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  value={NICKNAME}
                  onChange={(e) => setNICKNAME(e.target.value)}
                />
              </FormRow>

              <FormRow>
                <Label>아이디</Label>
                <Input
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  value={ID}
                  onChange={(e) => { setID(e.target.value); setErrorMessage(""); }}
                />
              </FormRow>

              <FormRow>
                <Label>비밀번호</Label>
                <Input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={PASSWORD}
                  onChange={(e) => setPASSWORD(e.target.value)}
                />
              </FormRow>

              <FormRow>
                <Label>비밀번호 확인</Label>
                <Input
                  type="password"
                  placeholder="비밀번호를 한 번 더 입력해주세요"
                  value={REPASSWORD}
                  onChange={(e) => setREPASSWORD(e.target.value)}
                />
              </FormRow>

              <FormRow>
                <Label>이메일</Label>
                <Input
                  type="text"
                  placeholder="이메일을 입력해주세요"
                  value={EMAIL}
                  onChange={(e) => { setEMAIL(e.target.value); setErrorMessage(""); }}
                />
              </FormRow>

              <CreateButton type="submit" disabled={isLoading}>
                {isLoading ? "처리 중..." : "회원가입"}
              </CreateButton>

              {errorMessage && <ErrorModal>{errorMessage}</ErrorModal>}
            </LoginForm>
          </form>
        </LoginCard>
      </LoginPage>
    </LoginWrapper>
  );
}
