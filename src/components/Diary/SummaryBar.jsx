// 일기 페이지 상단 요약 바 - 날짜, 오늘의 총 소비 금액, 만족도 별점 표시
import styled from "styled-components";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export default function SummaryBar({ dateStr, dayStr, totalAmount, overallStars, setOverallStars }) {
  return (
    <Bar>
      <InnerBox>
        <SummaryContent>
          <DateSection>
            <DateText>{dateStr}</DateText>
            <DayText>{dayStr}</DayText>
          </DateSection>
          <Divider />
          <SpendingSection>
            <SpendingLabel>오늘의 총 소비 금액</SpendingLabel>
            <SpendingAmount>₩{totalAmount.toLocaleString()}</SpendingAmount>
            <SpendingAvg>최근 7일 평균 ₩13,600</SpendingAvg>
          </SpendingSection>
          <Divider />
          <SatisfactionSection>
            <SatLabel>오늘의 만족도</SatLabel>
            <StarRow>
              {[1, 2, 3, 4, 5].map((i) => (
                <StarBtn key={i} onClick={() => setOverallStars(i)}>
                  {i <= overallStars ? <AiFillStar size={36} color="#000" /> : <AiOutlineStar size={36} color="#000" />}
                </StarBtn>
              ))}
            </StarRow>
          </SatisfactionSection>
        </SummaryContent>
      </InnerBox>
    </Bar>
  );
}

const Bar = styled.div`
  border-radius: 29px;
  background: #fff;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08);
  width: 1328px;
  height: 182px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerBox = styled.div`
  width: 1236px;
  height: 114px;
  border-radius: 29px;
  border: 1px solid #000;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SummaryContent = styled.div`
  display: flex;
  align-items: center;
  gap: 118px;
`;

const Divider = styled.div`
  width: 1px;
  height: 60px;
  background: #000;
`;

const DateSection = styled.div`
  display: flex;
  width: 177px;
  flex-direction: column;
  align-items: center;
`;

const DateText = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 32px;
  font-weight: 200;
  line-height: normal;
`;

const DayText = styled.span`
  color: #000;
  text-align: center;
  font-family: "S-Core Dream", sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: normal;
`;

const SpendingSection = styled.div`
  display: flex;
  width: 194px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const SpendingLabel = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: normal;
`;

const SpendingAmount = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 40px;
  font-weight: 200;
  line-height: 1;
`;

const SpendingAvg = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: normal;
`;

const SatisfactionSection = styled.div`
  display: flex;
  width: 226px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const SatLabel = styled.span`
  color: #000;
  text-align: center;
  font-family: "S-Core Dream", sans-serif;
  font-size: 16px;
  font-weight: 300;
  line-height: normal;
`;

const StarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  align-self: stretch;
`;

const StarBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;