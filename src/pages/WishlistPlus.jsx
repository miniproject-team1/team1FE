import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #EEF1DA;
  font-family: "S-Core Dream", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: clamp(20px, 4vw, 48px);
`;

const Container = styled.div`
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
`;

/* ── 헤더 영역 ── */
const Header = styled.div`
  background: rgba(213, 229, 213, 0.50);
  border: 1px solid #D5E5D5;
  border-bottom: none;
  border-radius: 20px 20px 0 0;
  padding: 20px 24px 16px 24px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PlusCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #D5E5D5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #2a5a2a;
  font-weight: 300;
  flex-shrink: 0;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: left;
`;

const ModalTitle = styled.h2`
  font-family: "S-Core Dream", sans-serif;
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 500;
  color: #000;
  margin: 0;
  text-align: left;
`;

const SubTitle = styled.p`
  font-family: "S-Core Dream", sans-serif;
  font-size: 13px;
  font-weight: 300;
  color: #666;
  margin: 0;
  text-align: left;
`;

const CloseBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #D5E5D5;
  background: rgba(213, 229, 213, 0.50);
  cursor: pointer;
  font-size: 14px;
  font-family: "S-Core Dream", sans-serif;
  font-weight: 400;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.15s;
  flex-shrink: 0;
  &:hover { opacity: 0.7; }
`;

/* ── 입력 카드 ── */
const InnerCard = styled.div`
  background: #fff;
  border: 1px solid #D5E5D5;
  border-radius: 0 0 20px 20px;
  padding: 20px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
  width: 100%;
`;

const FieldLabel = styled.label`
  font-family: "S-Core Dream", sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #444;
  text-align: left;
`;

const FieldInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #D5E5D5;
  background: #fff;
  font-family: "S-Core Dream", sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: #222;
  outline: none;
  box-sizing: border-box;
  text-align: left;

  &::placeholder { color: #ABABAB; }
  &:focus { border-color: #7BAB7B; }
`;

/* 잔여예산 행 */
const BudgetRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #D5E5D5;
  background: #fff;
  font-family: "S-Core Dream", sans-serif;
  font-size: 13px;
  font-weight: 300;
  color: #444;
  box-sizing: border-box;
  text-align: left;
`;

/* 그라데이션 바 + 텍스트 */
const RatioBarWrap = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid #D5E5D5;
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
`;

const RatioBarFill = styled.div`
  height: 36px;
  width: ${({ pct }) => Math.min(pct, 100)}%;
  background: linear-gradient(90deg, rgba(213, 229, 213, 0.50) 0%, #C7D9DD 100%);
  display: flex;
  align-items: center;
  padding-left: 12px;
  font-family: "S-Core Dream", sans-serif;
  font-size: 13px;
  font-weight: 300;
  color: #2a5a2a;
  white-space: nowrap;
  min-width: fit-content;
  box-sizing: border-box;
`;

const UrlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const UrlInput = styled(FieldInput)`
  flex: 1;
  width: auto;
`;

const PasteBtn = styled.button`
  height: 40px;
  padding: 0 16px;
  border-radius: 8px;
  background: #D5E5D5;
  border: none;
  cursor: pointer;
  font-family: "S-Core Dream", sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #2a5a2a;
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity 0.15s;
  &:hover { opacity: 0.8; }
`;

const BtnRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
  width: 100%;
`;

const CancelBtn = styled.button`
  height: 44px;
  padding: 0 20px;
  border-radius: 10px;
  border: 1px solid #D5E5D5;
  background: #fff;
  cursor: pointer;
  font-family: "S-Core Dream", sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #666;
  white-space: nowrap;
  text-align: center;
  transition: opacity 0.15s;
  &:hover { opacity: 0.8; }
`;

const AddBtn = styled.button`
  flex: 1;
  height: 44px;
  border-radius: 10px;
  background: rgba(213, 229, 213, 0.50);
  border: 1px solid #D5E5D5;
  cursor: pointer;
  font-family: "S-Core Dream", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #2a5a2a;
  text-align: center;
  transition: opacity 0.15s;
  &:hover { opacity: 0.8; }
`;

const REMAINING = 256000;

export default function WishlistPlus() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");

  const priceNum = parseInt(price.replace(/,/g, "")) || 0;
  const ratio = REMAINING > 0 ? Math.round((priceNum / REMAINING) * 100) : 0;
  const surplus = REMAINING - priceNum;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      alert("클립보드 접근 권한이 필요합니다.");
    }
  };

  const handleAdd = () => {
    if (!name.trim() || !price.trim()) return;
    navigate('/wishlist');
  };

  return (
    <PageWrapper>
      <Container>
        {/* 헤더 */}
        <Header>
          <HeaderLeft>
            <PlusCircle>+</PlusCircle>
            <TitleGroup>
              <ModalTitle>새 항목 추가하기</ModalTitle>
              <SubTitle>갖고 싶은 것을 위시리스트에 담아보세요</SubTitle>
            </TitleGroup>
          </HeaderLeft>
          <CloseBtn onClick={() => navigate('/wishlist')}>X</CloseBtn>
        </Header>

        {/* 입력 카드 */}
        <InnerCard>

          {/* 이름 */}
          <FieldGroup>
            <FieldLabel>이름</FieldLabel>
            <FieldInput
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="블루투스 마우스"
            />
          </FieldGroup>

          {/* 가격 */}
          <FieldGroup>
            <FieldLabel>가격(₩)</FieldLabel>
            <FieldInput
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="₩120000"
            />
          </FieldGroup>

          {/* 예산 대비 비율 */}
          <FieldGroup>
            <FieldLabel>예산 대비 비율</FieldLabel>
            <BudgetRow>
              <span>잔여예산</span>
              <span>₩{REMAINING.toLocaleString()}</span>
            </BudgetRow>
            {priceNum > 0 && (
              <RatioBarWrap>
                <RatioBarFill pct={ratio}>
                  입력 금액의 {ratio}% · {surplus >= 0
                    ? `₩${surplus.toLocaleString()} 여유있음`
                    : `₩${Math.abs(surplus).toLocaleString()} 초과`}
                </RatioBarFill>
              </RatioBarWrap>
            )}
          </FieldGroup>

          {/* 상품 URL */}
          <FieldGroup>
            <FieldLabel>상품 URL</FieldLabel>
            <UrlRow>
              <UrlInput
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://www.apple.com/kr/"
              />
              <PasteBtn onClick={handlePaste}>붙여넣기</PasteBtn>
            </UrlRow>
          </FieldGroup>

          {/* 버튼 */}
          <BtnRow>
            <CancelBtn onClick={() => navigate('/wishlist')}>취소</CancelBtn>
            <AddBtn onClick={handleAdd}>+위시리스트에 추가하기</AddBtn>
          </BtnRow>

        </InnerCard>
      </Container>
    </PageWrapper>
  );
}
