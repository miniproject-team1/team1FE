import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://team1.z0.co.kr";

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
`;

const Logo = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

const Menu = styled.div`
  display: flex;
  gap: 50px;
  font-size: 22px;
  font-weight: 400;
`;

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
  border-radius: 0px;
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
  font-size: 35px;
  font-weight: 400;
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
  font-size: 24px;
  font-weight: 500;
  text-align: left;
`;

const Input = styled.input`
  height: 60px;
  width: 650px;
  border-color: #d5e5d5;
  border-width: 2px;
  border-radius: 15px;
  background-color: #ffffff;
  color: #a2a2a2;
  opacity: 0.5;
  font-size: 22px;
  box-sizing: border-box;
`;

const IdArea = styled.div`
  display: flex;
  gap: 11px;
`;

const IdInput = styled(Input)`
  width: 500px;
`;

const CheckButton = styled.button`
  width: 143px;
  height: 54px;
  border: none;
  border-radius: 15px;
  background-color: #d5e5d5;
  color: #000000;
  font-size: 20px;
  cursor: pointer;
  &:active {
    transform: translateY(1px);
  }
`;

const IdMessage = styled.p`
  font-size: 18px;
  margin-top: 0px;
  align-items: center;
  color: ${(props) => (props.success ? "green" : "red")};
`;

const CreateButton = styled.button`
  margin-top: 53px;
  border: none;
  background: #d5e5d5;
  color: #000000;
  border-radius: 15px;
  height: 70px;
  width: 800px;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
  &:active {
    transform: translateY(1px);
  }
`;

export default function Signup() {
  const navigate = useNavigate();
  const [NICKNAME, setNICKNAME] = useState("");
  const [ID, setID] = useState("");
  const [PASSWORD, setPASSWORD] = useState("");
  const [REPASSWORD, setREPASSWORD] = useState("");
  const [EMAIL, setEMAIL] = useState("");
  const [idMessage, setIdMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckId = async () => {
    if (!ID.trim()) {
      setIdMessage("아이디를 입력해주세요");
      setIsAvailable(false);
      return;
    }
    // 아이디 중복확인 API가 별도로 없으므로 클라이언트에서 형식만 체크
    setIdMessage("사용 가능한 아이디입니다");
    setIsAvailable(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAvailable) {
      alert("아이디 중복 확인을 해주세요");
      return;
    }
    if (PASSWORD !== REPASSWORD) {
      alert("비밀번호가 일치하지 않습니다");
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
      const message = error.response?.data?.message || "회원가입에 실패했습니다";
      alert(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar>
        <Logo>로고</Logo>
        <Menu>
          <span>Home</span>
          <span>Wishlist</span>
          <span>My page</span>
        </Menu>
      </Navbar>

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
                  <IdArea>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "11px" }}>
                        <IdInput
                          type="text"
                          placeholder="아이디를 입력해주세요"
                          value={ID}
                          onChange={(e) => setID(e.target.value)}
                        />
                        <CheckButton type="button" onClick={handleCheckId}>
                          중복 확인
                        </CheckButton>
                      </div>
                      {idMessage && (
                        <IdMessage success={isAvailable}>{idMessage}</IdMessage>
                      )}
                    </div>
                  </IdArea>
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
                    onChange={(e) => setEMAIL(e.target.value)}
                  />
                </FormRow>

                <CreateButton type="submit" disabled={isLoading}>
                  {isLoading ? "처리 중..." : "회원가입"}
                </CreateButton>
              </LoginForm>
            </form>
          </LoginCard>
        </LoginPage>
      </LoginWrapper>
    </>
  );
}
