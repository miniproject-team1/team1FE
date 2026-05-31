import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import SummaryBar from "../components/Diary/SummaryBar";
import EmotionPanel from "../components/Diary/EmotionPanel";
import SpendingPanel from "../components/Diary/SpendingPanel";

const BASE_URL = "https://team1.z0.co.kr";
const EMOJI_KEYS = ["HAPPY", "SMILE", "NEUTRAL", "SAD", "ANGRY"];

export default function Diary() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [emotionReason, setEmotionReason] = useState("");
  const [emotionMemo, setEmotionMemo] = useState("");
  const [itemForms, setItemForms] = useState([{ name: "", amount: "", category: "" }]);
  const [currentReason, setCurrentReason] = useState("");
  const [currentStars, setCurrentStars] = useState(0);
  const [overallStars, setOverallStars] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [diaryExists, setDiaryExists] = useState(false);

  const rawDate = location.state?.date;
  const diaryDate = (() => {
    if (rawDate) {
      const [y, m, d] = rawDate.split("-");
      return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    }
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  })();

  const dateStr = diaryDate.replace(/-/g, ".");
  const DAY_NAMES = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const dayStr = DAY_NAMES[new Date(diaryDate).getDay()];

  const totalAmount = itemForms.reduce((sum, item) => {
    return sum + (parseInt(String(item.amount).replace(/,/g, "")) || 0);
  }, 0);

  useEffect(() => {
    async function fetchDiary() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${BASE_URL}/api/v1/diary/${diaryDate}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("일기 조회 성공", response.data);
        const data = response.data.data;
        setDiaryExists(true);

        if (data.emotion) {
          setSelectedEmotion(EMOJI_KEYS.indexOf(data.emotion.emoji));
          setEmotionReason(data.emotion.reason || "");
          setEmotionMemo(data.emotion.memo || "");
        }
        if (data.expenses?.length > 0) {
          setItemForms(data.expenses.map((e) => ({
            name: e.category,
            amount: e.amount.toLocaleString(),
            category: e.category,
            expenseId: e.expenseId,
          })));
          setCurrentReason(data.expenses[0].reason || "");
          const satisfaction = data.expenses[0].satisfaction || 0;
          setCurrentStars(satisfaction);
          setOverallStars(satisfaction);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          console.log("새 일기 작성 모드");
          setDiaryExists(false);
        } else {
          console.error("일기 조회 실패", error.response?.data || error.message);
        }
      }
    }
    fetchDiary();
  }, [diaryDate]);

  const handleDeleteDiary = async () => {
    if (!window.confirm("일기를 삭제하시겠습니까?")) return;
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${BASE_URL}/api/v1/diary/${diaryDate}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("일기 삭제 성공");
      navigate("/main");
    } catch (error) {
      console.error("일기 삭제 실패", error.response?.data || error.message);
      alert("일기 삭제에 실패했습니다");
    }
  };

  const handleDeleteItem = async (index) => {
    const item = itemForms[index];
    if (item.expenseId) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(`${BASE_URL}/api/v1/diary/${diaryDate}/expenses/${item.expenseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("소비 항목 삭제 성공");
      } catch (error) {
        console.error("소비 항목 삭제 실패", error.response?.data || error.message);
        alert("항목 삭제에 실패했습니다");
        return;
      }
    }
    setItemForms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetCurrentStars = (val) => {
    setCurrentStars(val);
    setOverallStars(val);
  };

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

  const handleSave = async () => {
    const token = localStorage.getItem("accessToken");
    const body = {
      diary_date: diaryDate,
      emotion: {
        emoji: selectedEmotion !== null ? EMOJI_KEYS[selectedEmotion] : "NEUTRAL",
        reason: emotionReason,
        tags: [],
        memo: emotionMemo,
      },
      expenses: itemForms
        .filter((item) => item.amount)
        .map((item) => ({
          amount: parseInt(String(item.amount).replace(/,/g, "")) || 0,
          category: item.category,
          reason: currentReason,
          satisfaction: currentStars,
        })),
    };

    try {
      let response;
      if (diaryExists) {
        response = await axios.put(`${BASE_URL}/api/v1/diary`, body, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("일기 수정 성공", response.data);
      } else {
        response = await axios.post(`${BASE_URL}/api/v1/diary`, body, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("일기 저장 성공", response.data);
        setDiaryExists(true);
      }
      setShowModal(true);
    } catch (error) {
      console.error("일기 저장 실패", error.response?.data || error.message);
      alert("저장에 실패했습니다");
    }
  };

  return (
    <PageWrapper>
      <SummaryBar
        dateStr={dateStr}
        dayStr={dayStr}
        totalAmount={totalAmount}
        overallStars={overallStars}
        setOverallStars={setOverallStars}
        onDeleteDiary={handleDeleteDiary}
        diaryExists={diaryExists}
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
          setCurrentStars={handleSetCurrentStars}
          handleSave={handleSave}
          handleDeleteItem={handleDeleteItem}
          handleDeleteDiary={handleDeleteDiary}
          diaryExists={diaryExists}
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