import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addWishlist, getWishlist } from "../api/wishlist";

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

const ErrorMsg = styled.div`
  font-size: 12px;
  color: #E84B6A;
  text-align: center;
`;

export default function WishlistPlus() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 잔여예산 불러오기
  useEffect(() => {
    const fetchRemaining = async () => {
      try {
        const res = await getWishlist();
        if (res.success) {
          setRemaining(res.data.remainingBudget || 0);
        }
      } catch (err) {
        console.error("잔여예산 불러오기 실패:", err);
      }
    };
    fetchRemaining();
  }, []);

  const priceNum = parseInt(price.replace(/,/g, "")) || 0;
  const ratio = remaining > 0 ? Math.round((priceNum / remaining) * 100) : 0;
  const surplus = remaining - priceNum;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      alert("클립보드 접근 권한이 필요합니다.");
    }
  };

  // 추가하기 버튼
  const handleAdd = async () => {
    if (!name.trim() || !price.trim()) {
      setError("이름과 가격을 입력해주세요.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await addWishlist({
        itemName: name,
        price: priceNum,
        url: url || "",
      });
      if (res.success) {
        navigate('/wishlist');
      } else {
        setError(res.message || "추가에 실패했습니다.");
      }
    } catch (err) {
      console.error("추가 실패:", err);
      setError("추가에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Container>
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
              <span>₩{remaining.toLocaleString()}</span>
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

          {error && <ErrorMsg>{error}</ErrorMsg>}

          {/* 버튼 */}
          <BtnRow>
            <CancelBtn onClick={() => navigate('/wishlist')}>취소</CancelBtn>
            <AddBtn onClick={handleAdd} disabled={loading}>
              {loading ? "추가 중..." : "+위시리스트에 추가하기"}
            </AddBtn>
          </BtnRow>
        </InnerCard>
      </Container>
    </PageWrapper>
  );
}
