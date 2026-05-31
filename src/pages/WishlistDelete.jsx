import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteWishlist } from "../api/wishlist";

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
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TrashIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(213, 229, 213, 0.50);
  border: 1px solid #D5E5D5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`;

const HeaderTitle = styled.h2`
  font-family: "S-Core Dream", sans-serif;
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 500;
  color: #000;
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
  padding: 28px 24px 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ItemCard = styled.div`
  background: rgba(213, 229, 213, 0.50);
  border-radius: 16px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ItemIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  border: 1px solid #D5E5D5;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  flex-shrink: 0;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
`;

const ItemName = styled.div`
  font-family: "S-Core Dream", sans-serif;
  font-size: clamp(15px, 1.8vw, 18px);
  font-weight: 500;
  color: #000;
`;

const ItemPrice = styled.div`
  font-family: "S-Core Dream", sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: #444;
`;

const ItemUrl = styled.a`
  font-family: "S-Core Dream", sans-serif;
  font-size: 13px;
  font-weight: 300;
  color: #5599CC;
  text-decoration: none;
  background: rgba(200, 220, 240, 0.30);
  padding: 3px 10px;
  border-radius: 6px;
  display: inline-block;
  width: fit-content;

  &:hover { text-decoration: underline; }
`;

const BtnRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CancelBtn = styled.button`
  flex: 1;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #D5E5D5;
  background: #F0EDE4;
  cursor: pointer;
  font-family: "S-Core Dream", sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #555;
  transition: opacity 0.15s;
  &:hover { opacity: 0.8; }
`;

const DeleteBtn = styled.button`
  flex: 1;
  height: 48px;
  border-radius: 12px;
  border: none;
  background: #F4A7A7;
  cursor: pointer;
  font-family: "S-Core Dream", sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  transition: opacity 0.15s;
  &:hover { opacity: 0.8; }
`;

const ErrorMsg = styled.div`
  font-size: 12px;
  color: #E84B6A;
  text-align: center;
`;

export default function WishlistDelete() {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state?.item;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!item) {
    navigate('/wishlist');
    return null;
  }

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await deleteWishlist(item.id);
      if (res.success) {
        navigate('/wishlist');
      } else {
        setError(res.message || "삭제에 실패했습니다.");
      }
    } catch (err) {
      console.error("삭제 실패:", err);
      setError("삭제에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Container>
        {/* 헤더 */}
        <Header>
          <HeaderLeft>
            <TrashIcon>🗑️</TrashIcon>
            <HeaderTitle>항목을 삭제할까요?</HeaderTitle>
          </HeaderLeft>
          <CloseBtn onClick={() => navigate('/wishlist')}>X</CloseBtn>
        </Header>

        {/* 내부 카드 */}
        <InnerCard>
          <ItemCard>
            <ItemIcon>🛍️</ItemIcon>
            <ItemInfo>
              <ItemName>{item.itemName || item.name}</ItemName>
              <ItemPrice>
                ₩{(item.price || 0).toLocaleString()}
              </ItemPrice>
              {item.url && (
                <ItemUrl href={item.url} target="_blank" rel="noreferrer">
                  🔗{item.url}
                </ItemUrl>
              )}
            </ItemInfo>
          </ItemCard>

          {error && <ErrorMsg>{error}</ErrorMsg>}

          {/* 버튼 */}
          <BtnRow>
            <CancelBtn onClick={() => navigate('/wishlist')}>취소</CancelBtn>
            <DeleteBtn onClick={handleDelete} disabled={loading}>
              {loading ? "삭제 중..." : "삭제하기"}
            </DeleteBtn>
          </BtnRow>
        </InnerCard>
      </Container>
    </PageWrapper>
  );
}
