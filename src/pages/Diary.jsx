// 일기 페이지 - 상태 및 핸들러 관리, SummaryBar / EmotionPanel / SpendingPanel 조합
import { useState } from "react";
import styled from "styled-components";
import SummaryBar from "../components/Diary/SummaryBar";
import EmotionPanel from "../components/Diary/EmotionPanel";
import SpendingPanel from "../components/Diary/SpendingPanel";

export default function Diary() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [emotionReason, setEmotionReason] = useState("");
  const [emotionMemo, setEmotionMemo] = useState("");
  const [itemForms, setItemForms] = useState([{ name: "", amount: "", category: "" }]);
  const [currentReason, setCurrentReason] = useState("");
  const [currentStars, setCurrentStars] = useState(0);
  const [overallStars, setOverallStars] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const today = new Date();
  const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;
  const DAY_NAMES = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const dayStr = DAY_NAMES[today.getDay()];

  const totalAmount = itemForms.reduce((sum, item) => {
    return sum + (parseInt(String(item.amount).replace(/,/g, "")) || 0);
  }, 0);

  const handleAddItem = () => {
    setItemForms([...itemForms, { name: "", amount: "", category: "" }]);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...itemForms];
    updated[index] = { ...updated[index], [field]: value };
    setItemForms(updated);
  };

  const handleAmountChange = (index, e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    handleItemChange(index, "amount", raw ? Number(raw).toLocaleString() : "");
  };

  const handleSave = () => {
    console.log({ selectedEmotion, emotionReason, emotionMemo, itemForms, currentReason, currentStars, overallStars });
    setShowModal(true);
  };

  return (
    <PageWrapper>
      <SummaryBar
        dateStr={dateStr}
        dayStr={dayStr}
        totalAmount={totalAmount}
        overallStars={overallStars}
        setOverallStars={setOverallStars}
      />

      <ContentRow>
        <EmotionPanel
          selectedEmotion={selectedEmotion}
          setSelectedEmotion={setSelectedEmotion}
          emotionReason={emotionReason}
          setEmotionReason={setEmotionReason}
          emotionMemo={emotionMemo}
          setEmotionMemo={setEmotionMemo}
        />
        <SpendingPanel
          itemForms={itemForms}
          handleAddItem={handleAddItem}
          handleItemChange={handleItemChange}
          handleAmountChange={handleAmountChange}
          currentReason={currentReason}
          setCurrentReason={setCurrentReason}
          currentStars={currentStars}
          setCurrentStars={setCurrentStars}
          handleSave={handleSave}
        />
      </ContentRow>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalIcon>✓</ModalIcon>
            <ModalTitle>저장되었습니다</ModalTitle>
            <ModalCloseBtn onClick={() => setShowModal(false)}>확인</ModalCloseBtn>
          </ModalCard>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #eef1da;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
  gap: 24px;
`;

const ContentRow = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 8px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalCard = styled.div`
  width: 380px;
  background: #fff;
  border-radius: 29px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 40px;
  gap: 20px;
`;

const ModalIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #d5e5d5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  color: #fff;
`;

const ModalTitle = styled.p`
  font-family: "S-Core Dream", sans-serif;
  font-size: 26px;
  font-weight: 300;
  color: #000;
  margin: 0;
`;

const ModalCloseBtn = styled.button`
  width: 160px;
  height: 44px;
  background: #d5e5d5;
  border: none;
  border-radius: 12px;
  font-family: "S-Core Dream", sans-serif;
  font-size: 18px;
  font-weight: 300;
  color: #000;
  cursor: pointer;
  margin-top: 4px;
`;