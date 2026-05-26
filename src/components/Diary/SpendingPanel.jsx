// 소비 기록 패널 - 소비 항목 입력, 소비 이유 선택, 만족도 별점, 저장 버튼
import { useState, useRef } from "react";
import styled from "styled-components";
import { AiOutlineStar, AiFillStar, AiOutlinePlus } from "react-icons/ai";
import CustomSelect from "./CustomSelect";

const CATEGORIES = ["식비", "쇼핑", "교통", "주거,생활", "문화,여가", "건강", "자기계발"];
const SPEND_REASONS = ["필요", "충동", "스트레스", "보상", "습관"];

export default function SpendingPanel({ itemForms, handleAddItem, handleItemChange, handleAmountChange, currentReason, setCurrentReason, currentStars, setCurrentStars, handleSave }) {
  const [reasonScrollRatio, setReasonScrollRatio] = useState(0);
  const reasonRef = useRef(null);

  const handleReasonScroll = () => {
    const el = reasonRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setReasonScrollRatio(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
  };

  const handleIndicatorMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startRatio = reasonScrollRatio;
    const track = e.currentTarget.parentElement;
    const indicatorWidth = 117;

    const handleMouseMove = (moveE) => {
      const maxTravel = track.clientWidth - indicatorWidth;
      const delta = moveE.clientX - startX;
      const newRatio = Math.max(0, Math.min(1, startRatio + delta / maxTravel));
      setReasonScrollRatio(newRatio);
      const el = reasonRef.current;
      if (el) {
        el.scrollLeft = newRatio * (el.scrollWidth - el.clientWidth);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <Panel>
      <AmountRowBox>
        <AmountRowInner>
          <PanelTitle>소비 항목</PanelTitle>
          {itemForms.map((form, index) => (
            <ItemFormGroup key={index}>
              {index > 0 && <ItemFormDivider />}
              <ItemInput
                type="text"
                placeholder="소비명을 입력하세요"
                value={form.name}
                onChange={(e) => handleItemChange(index, "name", e.target.value)}
              />
              <AmountLine>
                <FieldLabel>금액 입력</FieldLabel>
                <AmountInputBox
                  type="text"
                  placeholder="₩"
                  value={form.amount}
                  onChange={(e) => handleAmountChange(index, e)}
                />
              </AmountLine>
              <CategoryLine>
                <FieldLabel>카테고리 선택</FieldLabel>
                <CustomSelect value={form.category} onChange={(val) => handleItemChange(index, "category", val)} options={CATEGORIES} $flex $up />
              </CategoryLine>
            </ItemFormGroup>
          ))}
          <AddButton onClick={handleAddItem}>
            <AiOutlinePlus size={20} />
            <span>항목 추가</span>
          </AddButton>
        </AmountRowInner>
      </AmountRowBox>

      <ReasonRowBox>
        <SpendReasonTitle>소비 이유 선택</SpendReasonTitle>
        <ReasonScrollRow ref={reasonRef} onScroll={handleReasonScroll}>
          {SPEND_REASONS.map((r) => (
            <ReasonBox key={r} $selected={currentReason === r} onClick={() => setCurrentReason(r)}>
              {r}
            </ReasonBox>
          ))}
        </ReasonScrollRow>
        <ScrollTrack>
          <ScrollIndicator $ratio={reasonScrollRatio} onMouseDown={handleIndicatorMouseDown} />
        </ScrollTrack>
        <SatisfactionRow>
          <SatText>만족도</SatText>
          <ItemStarContainer>
            {[1, 2, 3, 4, 5].map((i) => (
              <StarBtn key={i} onClick={() => setCurrentStars(i)}>
                {i <= currentStars ? <AiFillStar size={34} color="#000" /> : <AiOutlineStar size={34} color="#000" />}
              </StarBtn>
            ))}
          </ItemStarContainer>
        </SatisfactionRow>
      </ReasonRowBox>

      <SaveButton onClick={handleSave}>저장</SaveButton>
    </Panel>
  );
}

const Panel = styled.div`
  width: 433px;
  border-radius: 29px;
  background: #fff;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 8px;
  box-sizing: border-box;
  gap: 12px;
`;

const PanelTitle = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 24px;
  font-weight: 200;
  line-height: normal;
  align-self: flex-start;
`;

const ItemFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 13px;
  width: 100%;
`;

const ItemFormDivider = styled.div`
  width: 100%;
  height: 1px;
  background: #e8e2da;
  margin-bottom: 4px;
`;

const ItemInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #e8e2da;
  border-radius: 8px;
  padding: 0 12px;
  box-sizing: border-box;
  outline: none;
  font-family: "S-Core Dream", sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: #000;

  &::placeholder {
    color: #e8e2da;
  }
`;

const AddButton = styled.button`
  width: 100%;
  height: 34px;
  background: #d5e5d5;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;

  span {
    color: #000;
    font-family: "S-Core Dream", sans-serif;
    font-size: 20px;
    font-weight: 300;
    line-height: normal;
  }
`;

const AmountRowBox = styled.div`
  width: 417px;
  background: #fff;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.1));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
`;

const AmountRowInner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  gap: 13px;
`;

const AmountLine = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: flex-end;
`;

const CategoryLine = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  align-self: stretch;
  justify-content: flex-end;
`;

const FieldLabel = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 18px;
  font-weight: 300;
  line-height: normal;
  white-space: nowrap;
`;

const AmountInputBox = styled.input`
  width: 264px;
  height: 36px;
  padding: 8px 15px;
  border-radius: 8px;
  border: 1px solid #e8e2da;
  box-sizing: border-box;
  outline: none;
  font-family: "S-Core Dream", sans-serif;
  font-size: 16px;
  font-weight: 300;
  color: #000;

  &::placeholder {
    color: #e8e2da;
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 400;
  }
`;

const ReasonRowBox = styled.div`
  width: 100%;
  background: #fff;
  filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.1));
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  gap: 12px;
`;

const SpendReasonTitle = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 20px;
  font-weight: 300;
  line-height: normal;
  align-self: flex-start;
`;

const ReasonScrollRow = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ReasonBox = styled.button`
  display: flex;
  height: 36px;
  padding: 7px 20px 5px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #e8e2da;
  background: ${({ $selected }) => ($selected ? "#d5e5d5" : "none")};
  cursor: pointer;
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 20px;
  font-weight: 300;
  line-height: normal;
  white-space: nowrap;
  flex-shrink: 0;
`;

const ScrollTrack = styled.div`
  width: 100%;
  height: 5px;
  background: #e8e2da;
  border-radius: 3px;
  position: relative;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  left: calc(${({ $ratio }) => ($ratio * 100).toFixed(2)}% - ${({ $ratio }) => ($ratio * 117).toFixed(2)}px);
  width: 117px;
  height: 100%;
  background: #d5e5d5;
  border-radius: 3px;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const SatisfactionRow = styled.div`
  display: flex;
  align-self: stretch;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SatText = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 20px;
  font-weight: 300;
`;

const ItemStarContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 10px;
  align-items: center;
  gap: 4px;
`;

const StarBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

const SaveButton = styled.button`
  width: 100%;
  height: 34px;
  background: #d5e5d5;
  margin-top: 16px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 20px;
  font-weight: 300;
  line-height: normal;
`;