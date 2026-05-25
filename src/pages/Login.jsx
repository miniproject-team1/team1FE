import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (!id || !password) {
      setError(true);
      return;
    }
    setError(false);
    navigate("/main");
  };

  return (
    <PageWrapper>
      <LoginCard>
        <CardTitle>Login</CardTitle>

        <FieldRow $gap={85}>
          <FieldLabel>아이디</FieldLabel>
          <FieldInput
            type="text"
            placeholder="아이디를 입력해주세요"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </FieldRow>

        <FieldRow $gap={63}>
          <FieldLabel>비밀번호</FieldLabel>
          <FieldInput
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FieldRow>

        <LoginButton onClick={handleLogin}>로그인하기</LoginButton>
        <SignupLink onClick={() => navigate("/signup")}>회원가입</SignupLink>
      </LoginCard>

      {error && (
        <ErrorBox>
          <ErrorText>
            아이디 또는 비밀번호가 일치하지 않습니다.<br />
            다시 확인해 주세요.
          </ErrorText>
        </ErrorBox>
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(0deg, #eef1da 0%, #eef1da 100%), #fdf8f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const LoginCard = styled.div`
  display: flex;
  width: 829px;
  padding: 69px 53px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 50px;
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
`;

const CardTitle = styled.h2`
  color: #000;
  text-align: center;
  font-family: "S-Core Dream", sans-serif;
  font-size: 40px;
  font-weight: 500;
  line-height: normal;
  align-self: stretch;
  margin: 0 0 20px 0;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ $gap }) => $gap}px;
  align-self: stretch;
  padding: 10px 0;
`;

const FieldLabel = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 25px;
  font-weight: 200;
  line-height: normal;
  white-space: nowrap;
`;

const FieldInput = styled.input`
  width: 570px;
  height: 60px;
  padding: 15px 21px;
  border-radius: 15px;
  border: 2px solid #d5e5d5;
  font-family: "S-Core Dream", sans-serif;
  font-size: 22px;
  font-weight: 200;
  color: #000;
  box-sizing: border-box;
  outline: none;

  &::placeholder {
    color: rgba(162, 162, 162, 0.5);
    font-family: "S-Core Dream", sans-serif;
    font-size: 22px;
    font-weight: 200;
  }
`;

const LoginButton = styled.button`
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 15px;
  border: none;
  background: #d5e5d5;
  color: #000;
  text-align: center;
  font-family: "S-Core Dream", sans-serif;
  font-size: 24px;
  font-weight: 200;
  line-height: normal;
  cursor: pointer;
  margin-top: 20px;
`;

const SignupLink = styled.span`
  color: #9ba0aa;
  text-align: center;
  font-family: "S-Core Dream", sans-serif;
  font-size: 20px;
  font-weight: 200;
  line-height: normal;
  align-self: stretch;
  cursor: pointer;
  margin-top: 4px;
`;

const ErrorBox = styled.div`
  display: flex;
  width: 649px;
  height: 117px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #fff;
  box-sizing: border-box;
`;

const ErrorText = styled.p`
  color: #f00;
  text-align: center;
  font-family: "S-Core Dream", sans-serif;
  font-size: 24px;
  font-weight: 200;
  line-height: normal;
  margin: 0;
`;
