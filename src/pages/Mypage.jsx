import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import happyEmoji from '../assets/emoji/happy.png';
import smileEmoji from '../assets/emoji/smile.png';
import neutralEmoji from '../assets/emoji/neutral.png';
import sadEmoji from '../assets/emoji/sad.png';
import angryEmoji from '../assets/emoji/angry.png';

const BASE_URL = "https://team1.z0.co.kr";

const EMOJI_MAP = {
  HAPPY: happyEmoji,
  SMILE: smileEmoji,
  NEUTRAL: neutralEmoji,
  SAD: sadEmoji,
  ANGRY: angryEmoji,
};

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #EEF1DA;
  font-family: "S-Core Dream", sans-serif;
  box-sizing: border-box;
  padding: clamp(20px, 4vw, 50px);
`;

const MainCard = styled.div`
  width: 100%;
  background: transparent;
  padding: 0;
  box-sizing: border-box;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: clamp(20px, 3vw, 40px);
`;

const Title = styled.h1`
  color: #E84B6A;
  font-family: "S-Core Dream", sans-serif;
  font-size: clamp(20px, 3vw, 36px);
  font-weight: 600;
  margin: 0;
  span { color: #000; }
`;

const SettingBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: clamp(8px, 1vw, 14px) clamp(16px, 1.5vw, 24px);
  border-radius: 20px;
  background: #D5E5D5;
  border: none;
  cursor: pointer;
  font-family: "S-Core Dream", sans-serif;
  transition: opacity 0.15s;
  white-space: nowrap;
  &:hover { opacity: 0.85; }

  span {
    color: #000;
    font-size: clamp(14px, 1.2vw, 20px);
    font-weight: 500;
    font-family: "S-Core Dream", sans-serif;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 28% 1fr;
  gap: clamp(20px, 3vw, 40px);
  align-items: start;
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(15px, 2vw, 25px);
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(15px, 2vw, 25px);
`;

const SmallCard = styled.div`
  width: 100%;
  padding: clamp(16px, 2vw, 24px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 30px;
  background: #FFF;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const SmallCardAlt = styled(SmallCard)``;

const CardLabel = styled.div`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: clamp(20px, 2vw, 30px);
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 10px;
`;

const AmountBox = styled.div`
  display: flex;
  height: clamp(40px, 4vw, 55px);
  padding: 4px 16px;
  align-items: center;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #C7D9DD;
  background: rgba(213, 229, 213, 0.50);
  font-size: clamp(14px, 1.5vw, 20px);
  font-weight: 600;
  color: #2A2A2A;
  font-family: "S-Core Dream", sans-serif;
  box-sizing: border-box;
`;

const AmountBoxAlt = styled(AmountBox)`
  border: 1px solid #D5E5D5;
`;

const BudgetInput = styled.input`
  display: flex;
  height: clamp(40px, 4vw, 55px);
  padding: 4px 16px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #C7D9DD;
  background: rgba(213, 229, 213, 0.50);
  font-size: clamp(14px, 1.5vw, 20px);
  font-weight: 600;
  color: #2A2A2A;
  font-family: "S-Core Dream", sans-serif;
  box-sizing: border-box;
  outline: none;
  &::placeholder { color: #aaa; font-weight: 400; }
`;

const SaveBtn = styled.button`
  padding: 8px 20px;
  background: #D9DCC8;
  border: none;
  border-radius: 8px;
  font-size: clamp(12px, 1vw, 15px);
  font-weight: 500;
  color: #444;
  cursor: pointer;
  font-family: "S-Core Dream", sans-serif;
  align-self: center;
  margin-top: 5px;
  &:hover { background: #C8CBB5; }
`;

const MonthNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 5px;
`;

const MonthNavBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(24px, 3vw, 36px);
  height: clamp(24px, 3vw, 36px);
  flex-shrink: 0;
  svg { width: 100%; height: 100%; }
`;

const SideMonth = styled.span`
  color: #D5E5D5;
  font-family: "S-Core Dream", sans-serif;
  font-size: clamp(11px, 1.2vw, 18px);
  font-weight: 200;
`;

const BigCard = styled.div`
  width: 100%;
  padding: clamp(24px, 3vw, 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(15px, 2vw, 20px);
  border-radius: 30px;
  background: #FFF;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const BarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const BarWrap = styled.div`
  flex: 1;
  height: clamp(40px, 5vw, 60px);
  border-radius: 12px;
  border: 3px solid #D5E5D5;
  background: #EEF1DA;
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(90deg, rgba(213, 229, 213, 0.50) 0%, #C7D9DD 100%);
  width: ${({ pct }) => pct}%;
`;

const PctLabel = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: clamp(14px, 1.5vw, 20px);
  font-weight: 600;
  white-space: nowrap;
  width: 60px;
  text-align: right;
  flex-shrink: 0;
`;

const EmojiBoxContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #D5E5D5;
  background: rgba(213, 229, 213, 0.50);
`;

const EmojiItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-family: "S-Core Dream", sans-serif;

  .emoji {
    width: 61px;
    height: 60px;
    object-fit: contain;
    flex-shrink: 0;
  }

  .count {
    font-weight: 600;
    color: #2A2A2A;
    font-size: clamp(16px, 1.8vw, 26px);
  }
`;

export default function Mypage() {
  const navigate = useNavigate();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [budgetInput, setBudgetInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [summary, setSummary] = useState(null);
  const year = new Date().getFullYear();
  const period = `${year}${String(month).padStart(2, '0')}`;

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("accessToken");
      const headers = { Authorization: `Bearer ${token}` };
      try {
        const [budgetRes, summaryRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/v1/budgets/${year}/${month}`, { headers }),
          axios.get(`${BASE_URL}/api/v1/analytics/summary`, { headers, params: { period } }),
        ]);
        console.log("예산 조회 성공", budgetRes.data);
        const amount = budgetRes.data.data?.budgetAmount;
        setBudgetInput(amount != null ? String(amount) : "");

        console.log("분석 조회 성공", summaryRes.data);
        setSummary(summaryRes.data.data);
      } catch (error) {
        console.error("데이터 조회 실패", error.response?.data || error.message);
      }
    }
    fetchData();
  }, [month]);

  const handleSaveBudget = async () => {
    if (!budgetInput) {
      alert("예산을 입력해주세요");
      return;
    }
    setIsSaving(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `${BASE_URL}/api/v1/budgets/${year}/${month}`,
        { budgetAmount: Number(budgetInput) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("예산 저장 성공", response.data);
      alert("예산이 저장되었습니다!");
    } catch (error) {
      console.error("예산 저장 실패", error.response?.data || error.message);
      alert("예산 저장에 실패했습니다");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <PageWrapper>
      <MainCard>
        <CardHeader>
          <Title><span>홍길동</span>님의 소비 리포트</Title>
          <SettingBtn onClick={() => navigate('/mypage-change')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 25 27" fill="none">
              <path d="M24.5215 16.4605L22.6025 14.8198C22.6934 14.2632 22.7402 13.6948 22.7402 13.1265C22.7402 12.5581 22.6934 11.9897 22.6025 11.4331L24.5215 9.79248C24.6662 9.66857 24.7698 9.50354 24.8185 9.31933C24.8672 9.13512 24.8586 8.94046 24.794 8.76123L24.7676 8.68506C24.2393 7.20857 23.4482 5.83985 22.4326 4.64502L22.3799 4.5835C22.2567 4.43863 22.0925 4.33449 21.9089 4.28481C21.7253 4.23512 21.531 4.24222 21.3516 4.30518L18.9697 5.15185C18.0908 4.43115 17.1094 3.86279 16.0488 3.46436L15.5889 0.974121C15.5542 0.786745 15.4633 0.614363 15.3283 0.479876C15.1933 0.34539 15.0205 0.255166 14.833 0.221191L14.7539 0.206543C13.2275 -0.0688477 11.6221 -0.0688477 10.0957 0.206543L10.0166 0.221191C9.8291 0.255166 9.65636 0.34539 9.52135 0.479876C9.38634 0.614363 9.29545 0.786745 9.26075 0.974121L8.79786 3.47607C7.74577 3.87459 6.76602 4.44265 5.89747 5.15771L3.49805 4.30518C3.31866 4.24172 3.1242 4.23437 2.94052 4.28408C2.75684 4.33379 2.59264 4.43823 2.46973 4.5835L2.417 4.64502C1.40258 5.8407 0.611654 7.20919 0.0820372 8.68506L0.05567 8.76123C-0.076166 9.12744 0.0322325 9.5376 0.328131 9.79248L2.27051 11.4507C2.17969 12.0015 2.13575 12.564 2.13575 13.1235C2.13575 13.686 2.17969 14.2485 2.27051 14.7964L0.328131 16.4546C0.183392 16.5785 0.0798002 16.7435 0.0311309 16.9277C-0.0175385 17.1119 -0.0089795 17.3066 0.05567 17.4858L0.0820372 17.562C0.612311 19.0386 1.39747 20.4009 2.417 21.6021L2.46973 21.6636C2.59294 21.8084 2.75715 21.9126 2.94072 21.9623C3.12428 22.0119 3.3186 22.0048 3.49805 21.9419L5.89747 21.0894C6.77051 21.8071 7.7461 22.3755 8.79786 22.771L9.26075 25.2729C9.29545 25.4603 9.38634 25.6327 9.52135 25.7672C9.65636 25.9017 9.8291 25.9919 10.0166 26.0259L10.0957 26.0405C11.6361 26.3174 13.2135 26.3174 14.7539 26.0405L14.833 26.0259C15.0205 25.9919 15.1933 25.9017 15.3283 25.7672C15.4633 25.6327 15.5542 25.4603 15.5889 25.2729L16.0488 22.7827C17.1089 22.3853 18.0959 21.8151 18.9697 21.0952L21.3516 21.9419C21.531 22.0053 21.7254 22.0127 21.9091 21.963C22.0928 21.9133 22.257 21.8088 22.3799 21.6636L22.4326 21.6021C23.4522 20.398 24.2373 19.0386 24.7676 17.562L24.794 17.4858C24.9258 17.1255 24.8174 16.7153 24.5215 16.4605ZM20.5225 11.7788C20.5957 12.2212 20.6338 12.6753 20.6338 13.1294C20.6338 13.5835 20.5957 14.0376 20.5225 14.48L20.3291 15.6548L22.5176 17.5269C22.1858 18.2912 21.767 19.0147 21.2695 19.6831L18.5508 18.7192L17.6309 19.4751C16.9307 20.0493 16.1514 20.5005 15.3076 20.8169L14.1914 21.2358L13.667 24.0776C12.8396 24.1714 12.0042 24.1714 11.1768 24.0776L10.6523 21.23L9.54493 20.8052C8.70997 20.4888 7.9336 20.0376 7.23926 19.4663L6.31934 18.7075L3.58301 19.6802C3.08497 19.0093 2.66895 18.2856 2.33497 17.5239L4.54688 15.6343L4.35645 14.4624C4.28614 14.0259 4.24805 13.5747 4.24805 13.1294C4.24805 12.6812 4.28321 12.2329 4.35645 11.7964L4.54688 10.6245L2.33497 8.73486C2.66602 7.97021 3.08497 7.24951 3.58301 6.57861L6.31934 7.55127L7.23926 6.79248C7.9336 6.22119 8.70997 5.77002 9.54493 5.45361L10.6553 5.03467L11.1797 2.18701C12.0029 2.09326 12.8438 2.09326 13.6699 2.18701L14.1943 5.02881L15.3106 5.44775C16.1514 5.76416 16.9336 6.21533 17.6338 6.78955L18.5537 7.54541L21.2725 6.58154C21.7705 7.25244 22.1865 7.97607 22.5205 8.73779L20.332 10.6099L20.5225 11.7788ZM12.4277 7.68018C9.58008 7.68018 7.27149 9.98877 7.27149 12.8364C7.27149 15.6841 9.58008 17.9927 12.4277 17.9927C15.2754 17.9927 17.584 15.6841 17.584 12.8364C17.584 9.98877 15.2754 7.68018 12.4277 7.68018ZM14.7481 15.1567C14.4437 15.4619 14.0821 15.704 13.6838 15.8689C13.2856 16.0338 12.8587 16.1183 12.4277 16.1177C11.5518 16.1177 10.7285 15.7749 10.1074 15.1567C9.80222 14.8524 9.5602 14.4907 9.39529 14.0925C9.23037 13.6943 9.14582 13.2674 9.14649 12.8364C9.14649 11.9604 9.48926 11.1372 10.1074 10.5161C10.7285 9.89502 11.5518 9.55518 12.4277 9.55518C13.3037 9.55518 14.127 9.89502 14.7481 10.5161C15.0533 10.8204 15.2953 11.1821 15.4602 11.5803C15.6251 11.9785 15.7097 12.4054 15.709 12.8364C15.709 13.7124 15.3662 14.5356 14.7481 15.1567Z" fill="black"/>
            </svg>
            <span>계정관리</span>
          </SettingBtn>
        </CardHeader>

        <Grid>
          <LeftCol>
            <SmallCard>
              <CardLabel>{month}월 예산</CardLabel>
              <BudgetInput
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                placeholder="예산을 입력해주세요"
              />
              <SaveBtn onClick={handleSaveBudget} disabled={isSaving}>
                {isSaving ? "저장 중..." : "저장"}
              </SaveBtn>
            </SmallCard>

            <SmallCardAlt>
              <MonthNav>
                <SideMonth>{month - 1}월</SideMonth>
                <MonthNavBtn onClick={() => setMonth(m => Math.max(1, m - 1))}>
                  <svg viewBox="0 0 30 30" fill="none"><path d="M12.7676 14.9998L20.2149 7.55835C20.7656 7.00757 20.7656 6.11695 20.2149 5.57202C19.6641 5.02124 18.7734 5.0271 18.2227 5.57202L9.78516 14.0037C9.25196 14.5369 9.24024 15.3923 9.74415 15.9431L18.2168 24.4334C18.4922 24.7087 18.8555 24.8435 19.2129 24.8435C19.5703 24.8435 19.9336 24.7087 20.209 24.4334C20.7598 23.8826 20.7598 22.9919 20.209 22.447L12.7676 14.9998Z" fill="#D5E5D5"/></svg>
                </MonthNavBtn>
                <CardLabel style={{ margin: 0 }}>{month}월 총 소비</CardLabel>
                <MonthNavBtn onClick={() => setMonth(m => Math.min(12, m + 1))}>
                  <svg viewBox="0 0 30 30" fill="none"><path d="M17.2324 15.0005L9.78516 7.55908C9.23438 7.0083 9.23438 6.11768 9.78516 5.57275C10.3359 5.02783 11.2266 5.02783 11.7773 5.57275L20.2148 14.0044C20.748 14.5376 20.7598 15.3931 20.2559 15.9438L11.7832 24.4341C11.5078 24.7095 11.1445 24.8442 10.7871 24.8442C10.4297 24.8442 10.0664 24.7095 9.79102 24.4341C9.24023 23.8833 9.24023 22.9927 9.79102 22.4478L17.2324 15.0005Z" fill="#D5E5D5"/></svg>
                </MonthNavBtn>
                <SideMonth>{month + 1}월</SideMonth>
              </MonthNav>
              <AmountBox>
                {summary != null ? `₩ ${summary.totalSpending.toLocaleString()}` : "-"}
              </AmountBox>
            </SmallCardAlt>

            <SmallCardAlt>
              <MonthNav>
                <SideMonth>{month - 1}월</SideMonth>
                <MonthNavBtn onClick={() => setMonth(m => Math.max(1, m - 1))}>
                  <svg viewBox="0 0 30 30" fill="none"><path d="M12.7676 14.9998L20.2149 7.55835C20.7656 7.00757 20.7656 6.11695 20.2149 5.57202C19.6641 5.02124 18.7734 5.0271 18.2227 5.57202L9.78516 14.0037C9.25196 14.5369 9.24024 15.3923 9.74415 15.9431L18.2168 24.4334C18.4922 24.7087 18.8555 24.8435 19.2129 24.8435C19.5703 24.8435 19.9336 24.7087 20.209 24.4334C20.7598 23.8826 20.7598 22.9919 20.209 22.447L12.7676 14.9998Z" fill="#D5E5D5"/></svg>
                </MonthNavBtn>
                <CardLabel style={{ margin: 0 }}>{month}월 후회 소비</CardLabel>
                <MonthNavBtn onClick={() => setMonth(m => Math.min(12, m + 1))}>
                  <svg viewBox="0 0 30 30" fill="none"><path d="M17.2324 15.0005L9.78516 7.55908C9.23438 7.0083 9.23438 6.11768 9.78516 5.57275C10.3359 5.02783 11.2266 5.02783 11.7773 5.57275L20.2148 14.0044C20.748 14.5376 20.7598 15.3931 20.2559 15.9438L11.7832 24.4341C11.5078 24.7095 11.1445 24.8442 10.7871 24.8442C10.4297 24.8442 10.0664 24.7095 9.79102 24.4341C9.24023 23.8833 9.24023 22.9927 9.79102 22.4478L17.2324 15.0005Z" fill="#D5E5D5"/></svg>
                </MonthNavBtn>
                <SideMonth>{month + 1}월</SideMonth>
              </MonthNav>
              <AmountBoxAlt>
                {summary != null ? `₩ ${summary.regretSpending.toLocaleString()}` : "-"}
              </AmountBoxAlt>
            </SmallCardAlt>
          </LeftCol>

          <RightCol>
            <BigCard>
              <CardLabel>충동 소비 비율</CardLabel>
              <BarRow>
                <BarWrap>
                  <BarFill pct={summary ? Math.round(summary.impulseRatio * 100) : 0} />
                </BarWrap>
                <PctLabel>{summary ? `${Math.round(summary.impulseRatio * 100)}%` : "-"}</PctLabel>
              </BarRow>
            </BigCard>

            <BigCard>
              <CardLabel>예산 달성률</CardLabel>
              <BarRow>
                <BarWrap>
                  <BarFill pct={summary ? Math.round(summary.budgetUsedRatio * 100) : 0} />
                </BarWrap>
                <PctLabel>{summary ? `${Math.round(summary.budgetUsedRatio * 100)}%` : "-"}</PctLabel>
              </BarRow>
            </BigCard>

            <BigCard>
              <CardLabel>감정별 소비 횟수</CardLabel>
              <EmojiBoxContainer>
                {summary?.emotionCounts?.length > 0 ? (
                  summary.emotionCounts.map((item) => (
                    <EmojiItem key={item.emoji}>
                      <img src={EMOJI_MAP[item.emoji]} alt={item.emoji} className="emoji" />
                      <span className="count">{item.count}회</span>
                    </EmojiItem>
                  ))
                ) : (
                  <span style={{ color: "#aaa", fontSize: "16px" }}>소비 기록이 없습니다</span>
                )}
              </EmojiBoxContainer>
            </BigCard>
          </RightCol>
        </Grid>
      </MainCard>
    </PageWrapper>
  );
}
