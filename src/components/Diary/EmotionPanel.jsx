// 감정 기록 패널 - 이모지 선택, 감정 이유 드롭다운, 감정 메모 작성
import styled from "styled-components";
import happyEmoji from "../../assets/emoji/happy.png";
import smileEmoji from "../../assets/emoji/smile.png";
import neutralEmoji from "../../assets/emoji/neutral.png";
import sadEmoji from "../../assets/emoji/sad.png";
import angryEmoji from "../../assets/emoji/angry.png";
import CustomSelect from "./CustomSelect";

const EMOTION_REASONS = ["시험", "인간관계", "피곤", "심심", "스트레스"];
const EMOJIS = [happyEmoji, smileEmoji, neutralEmoji, sadEmoji, angryEmoji];

export default function EmotionPanel({ selectedEmotion, setSelectedEmotion, emotionReason, setEmotionReason, emotionMemo, setEmotionMemo }) {
  return (
    <Panel>
      <PanelTitle>오늘의 감정은 어떠셨나요?</PanelTitle>
      <EmojiRow>
        {EMOJIS.map((src, i) => (
          <EmojiBtn key={i} $selected={selectedEmotion === i} onClick={() => setSelectedEmotion(i)}>
            <EmojiImg src={src} alt={`emotion-${i}`} />
          </EmojiBtn>
        ))}
      </EmojiRow>
      <EmotionReasonRow>
        <ReasonSelectLabel>감정 이유 선택</ReasonSelectLabel>
        <CustomSelect value={emotionReason} onChange={setEmotionReason} options={EMOTION_REASONS} $width="158px" />
      </EmotionReasonRow>
      <MemoArea>
        <MemoLabel>감정 메모</MemoLabel>
        <MemoTextarea
          placeholder="자유롭게 표현해보세요."
          value={emotionMemo}
          onChange={(e) => setEmotionMemo(e.target.value)}
          maxLength={300}
        />
      </MemoArea>
    </Panel>
  );
}

const Panel = styled.div`
  width: 887px;
  height: 708px;
  border-radius: 29px;
  background: #fff;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  padding: 50px 66px;
  box-sizing: border-box;
  gap: 30px;
`;

const PanelTitle = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 32px;
  font-weight: 200;
  line-height: normal;
`;

const EmojiRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const EmojiBtn = styled.button`
  background: ${({ $selected }) => ($selected ? "rgba(213, 229, 213, 0.5)" : "none")};
  border: 2px solid ${({ $selected }) => ($selected ? "#d5e5d5" : "transparent")};
  border-radius: 50%;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmojiImg = styled.img`
  width: 90px;
  height: 90px;
`;

const EmotionReasonRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 28px;
`;

const ReasonSelectLabel = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 19px;
  font-weight: 300;
  line-height: normal;
`;

const MemoArea = styled.div`
  display: flex;
  width: 755px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

const MemoLabel = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 19px;
  font-weight: 300;
  line-height: normal;
`;

const MemoTextarea = styled.textarea`
  height: 246px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid #e8e2da;
  padding: 14px 16px;
  box-sizing: border-box;
  resize: none;
  outline: none;
  font-family: "S-Core Dream", sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: #000;

  &::placeholder {
    color: #e8e2da;
    font-family: "S-Core Dream", sans-serif;
    font-size: 16px;
    font-weight: 300;
  }
`;