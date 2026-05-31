import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(0deg, #EEF1DA 0%, #EEF1DA 100%), #FDF8F8;
  font-family: "S-Core Dream", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 700px;
  background: #FFF;
  border-radius: 30px;
  padding: 56px 60px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
`;

const CardTitle = styled.h2`
  text-align: center;
  font-family: "S-Core Dream", sans-serif;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #000;
  margin: 0 0 10px 0;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const FieldLabel = styled.label`
  font-family: "S-Core Dream", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #000;
  white-space: nowrap;
  width: 120px;
  flex-shrink: 0;
`;

const FieldInput = styled.input`
  flex: 1;
  height: 52px;
  padding: 0 16px;
  border-radius: 15px;
  border: 2px solid #D5E5D5;
  background: #FFF;
  font-family: "S-Core Dream", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  color: #2A2A2A;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #ABABAB;
    font-weight: 300;
  }

  &:focus {
    border-color: #B0C8B0;
  }

  &:read-only {
    background: #F9F9F9;
    cursor: default;
  }
`;

const BtnGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

const SaveBtn = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 15px;
  background: #D5E5D5;
  border: none;
  cursor: pointer;
  font-family: "S-Core Dream", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #000;
  text-align: center;
  transition: opacity 0.15s;

  &:hover { opacity: 0.85; }
`;

const LogoutBtn = styled.button`
  width: 100%;
  height: 56px;
  border-radius: 15px;
  background: #DCDCDC;
  border: none;
  cursor: pointer;
  font-family: "S-Core Dream", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: #000;
  text-align: center;
  transition: opacity 0.15s;

  &:hover { opacity: 0.85; }
`;

const Toast = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: #444;
  color: #fff;
  padding: 12px 28px;
  border-radius: 20px;
  font-family: "S-Core Dream", sans-serif;
  font-size: 14px;
  font-weight: 400;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s;
  pointer-events: none;
`;

export default function MypageChange() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [toast, setToast] = useState(false);

  const handleSave = () => {
    if (!nickname.trim()) return;
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <PageWrapper>
      <Card>
        <CardTitle>계정관리</CardTitle>

        <FieldRow>
          <FieldLabel>현재 닉네임</FieldLabel>
          <FieldInput value={localStorage.getItem("nickname") || ""} readOnly />
        </FieldRow>

        <FieldRow>
          <FieldLabel>닉네임 변경</FieldLabel>
          <FieldInput
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="새로운 닉네임을 입력해주세요"
          />
        </FieldRow>

        <BtnGroup>
          <SaveBtn onClick={handleSave}>저장</SaveBtn>
          <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
        </BtnGroup>
      </Card>

      <Toast show={toast}>닉네임이 변경되었습니다!</Toast>
    </PageWrapper>
  );
}
