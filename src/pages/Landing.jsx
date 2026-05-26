import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/background.png";
import pigImg from "../assets/pig.png";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <ContentArea>
        <TextBlock>
          <SubText>지갑보다 마음을 먼저 털어볼 시간,</SubText>
          <MainText>기분값</MainText>
        </TextBlock>
        <PigImage src={pigImg} alt="pig" />
        <ButtonRow>
          <Button onClick={() => navigate("/login")}>로그인</Button>
          <Button onClick={() => navigate("/signup")}>회원가입</Button>
        </ButtonRow>
      </ContentArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: url(${backgroundImg}) center / cover no-repeat;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ContentArea = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  gap: 70px;
  padding-right: 40px;
  box-sizing: border-box;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SubText = styled.p`
  color: #7a9f7a;
  text-align: center;
  font-family: "S-Core Dream", sans-serif;
  font-size: 44px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
`;

const MainText = styled.p`
  color: #000;
  text-align: right;
  font-family: "S-Core Dream", sans-serif;
  font-size: 60px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
`;

const PigImage = styled.img`
  width: 400px;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 46px;
`;

const Button = styled.button`
  display: flex;
  width: 250px;
  padding: 15px 0;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 1px solid #c7d9dd;
  background: #d5e5d5;
  color: #000;
  text-align: center;
  font-family: "S-Core Dream", sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  cursor: pointer;
`;
