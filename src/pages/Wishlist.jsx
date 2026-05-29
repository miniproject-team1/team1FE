import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWishlist, purchaseWishlist } from "../api/wishlist";

/* ── Styled Components ── */
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #EEF1DA;
  font-family: "S-Core Dream", sans-serif;
  box-sizing: border-box;
  padding: clamp(20px, 4vw, 48px);
`;

const DateText = styled.div`
  font-family: "S-Core Dream", sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #888;
  letter-spacing: 1px;
  margin-bottom: 2px;
  text-align: left;
`;

const PageTitle = styled.h1`
  font-family: "S-Core Dream", sans-serif;
  font-size: clamp(24px, 3vw, 36px);
  font-style: normal;
  font-weight: 200;
  color: #000;
  margin: 0 0 clamp(16px, 2vw, 28px) 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    display: flex;
    align-items: center;
  }

  span { color: #14752C; }
`;

const AddBtn = styled.button`
  font-family: "S-Core Dream", sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #000;
  background: #C7D9C7;
  border: none;
  border-radius: 20px;
  padding: 8px 18px;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.15s;
  &:hover { opacity: 0.8; }
`;

const SummaryCard = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 20px;
  padding: clamp(16px, 2vw, 28px) clamp(20px, 2.5vw, 32px);
  box-sizing: border-box;
  margin-bottom: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
`;

const SummaryLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 400;
  color: #555;
  margin-bottom: 6px;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #E84B6A;
    flex-shrink: 0;
  }
`;

const SummaryAmount = styled.div`
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 700;
  color: #000;
  margin-bottom: 4px;
`;

const SummaryCount = styled.div`
  font-size: 12px;
  color: #888;
  margin-bottom: 12px;
`;

const BarLabel = styled.div`
  font-size: 11px;
  color: #888;
  margin-bottom: 4px;
`;

const BarBg = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: #EEF1DA;
  overflow: hidden;
  margin-bottom: 4px;
`;

const BarFill = styled.div`
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, #A8C8A8 0%, #7BAB7B 100%);
  width: ${({ pct }) => pct}%;
`;

const BarPct = styled.div`
  font-size: 12px;
  color: #888;
  text-align: right;
`;

const CardRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
`;

const MiniCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: clamp(14px, 2vw, 22px) clamp(16px, 2vw, 24px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  box-sizing: border-box;
`;

const MiniLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 400;
  color: #555;
  margin-bottom: 8px;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ color }) => color || '#7BAB7B'};
    flex-shrink: 0;
  }
`;

const MiniAmount = styled.div`
  font-size: clamp(18px, 2.5vw, 28px);
  font-weight: 700;
  color: #000;
  margin-bottom: 4px;
`;

const MiniSub = styled.div`
  font-size: 12px;
  color: #888;
`;

const TableCard = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 20px;
  padding: clamp(16px, 2vw, 24px);
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
`;

const TableHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`;

const TableTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #000;
`;

const CountBadge = styled.div`
  background: #C7D9C7;
  color: #3a6a3a;
  font-size: 12px;
  font-weight: 600;
  border-radius: 20px;
  padding: 2px 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: clamp(12px, 1.2vw, 14px);
`;

const Th = styled.th`
  text-align: left;
  font-weight: 500;
  color: #888;
  padding: 8px 10px;
  border-bottom: 1px solid #F0F0F0;
  white-space: nowrap;
`;

const Tr = styled.tr`
  &:not(:last-child) td {
    border-bottom: 1px solid #F5F5F5;
  }
  opacity: ${({ done }) => done ? 0.45 : 1};
`;

const Td = styled.td`
  padding: 12px 10px;
  color: #222;
  vertical-align: middle;
  text-decoration: ${({ done }) => done ? 'line-through' : 'none'};
`;

const ItemName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${({ status }) => status === '완료' ? '#D5E5D5' : '#FFD6D6'};
  color: ${({ status }) => status === '완료' ? '#3a6a3a' : '#c0392b'};
`;

const ActionBtn = styled.button`
  font-family: "S-Core Dream", sans-serif;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s;
  &:hover { opacity: 0.8; }

  background: ${({ variant }) =>
    variant === 'buy' ? '#C7D9C7' :
    variant === 'delete' ? '#E8C8C8' : '#ddd'};
  color: ${({ variant }) =>
    variant === 'buy' ? '#2a5a2a' :
    variant === 'delete' ? '#8b2a2a' : '#444'};
  margin-left: 4px;
`;

const LoadingText = styled.div`
  text-align: center;
  color: #888;
  font-size: 14px;
  padding: 40px 0;
`;

/* ── 컴포넌트 ── */
export default function Wishlist() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [remaining, setRemaining] = useState(0);

  // 위시리스트 목록 불러오기
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await getWishlist();
      if (res.success) {
        const data = res.data;
        setItems(data.wishItems || []);
        setRemaining(data.remainingBudget || 0);
      }
    } catch (err) {
      console.error("위시리스트 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // 구매 완료 처리
  const handlePurchase = async (id) => {
    try {
      const res = await purchaseWishlist(id);
      if (res.success) {
        // 구매 완료 후 목록 새로고침
        fetchWishlist();
      }
    } catch (err) {
      console.error("구매 처리 실패:", err);
    }
  };

  const waitingItems = items.filter(i => !i.purchased);
  const doneItems = items.filter(i => i.purchased);
  const allItems = [...waitingItems, ...doneItems];

  const total = waitingItems.reduce((sum, i) => sum + (i.price || 0), 0);
  const barPct = remaining > 0 ? Math.min(Math.round((total / remaining) * 100), 100) : 0;
  const purchasedAmount = doneItems.reduce((sum, i) => sum + (i.price || 0), 0);
  const surplus = remaining - total;

  const now = new Date();
  const monthStr = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const yearStr = now.getFullYear();

  return (
    <PageWrapper>
      <DateText>{monthStr} {yearStr}</DateText>
      <PageTitle>
        <div className="title">나의<span> 위시리스트</span></div>
        <AddBtn onClick={() => navigate('/wishlist-plus')}>+ 새 항목 추가</AddBtn>
      </PageTitle>

      {/* 위시리스트 합계 카드 */}
      <SummaryCard>
        <SummaryLabel>위시리스트 합계</SummaryLabel>
        <SummaryAmount>₩{total.toLocaleString()}</SummaryAmount>
        <SummaryCount>{waitingItems.length}개 항목</SummaryCount>
        <BarLabel>잔여예산대비</BarLabel>
        <BarBg>
          <BarFill pct={barPct} />
        </BarBg>
        <BarPct>{barPct}%</BarPct>
      </SummaryCard>

      {/* 이번 달 잔여 예산 + 구매 완료 */}
      <CardRow>
        <MiniCard>
          <MiniLabel color="#7BAB7B">이번 달 잔여 예산</MiniLabel>
          <MiniAmount>₩{remaining.toLocaleString()}</MiniAmount>
          <MiniSub>₩{surplus.toLocaleString()} 여유 있음</MiniSub>
        </MiniCard>
        <MiniCard>
          <MiniLabel color="#F5C842">구매 완료</MiniLabel>
          <MiniAmount>{doneItems.length}개</MiniAmount>
          <MiniSub>₩{purchasedAmount.toLocaleString()} 소비</MiniSub>
        </MiniCard>
      </CardRow>

      {/* 대기 중인 항목 테이블 */}
      <TableCard>
        <TableHeader>
          <TableTitle>대기 중인 항목</TableTitle>
          <CountBadge>{waitingItems.length}</CountBadge>
        </TableHeader>

        {loading ? (
          <LoadingText>불러오는 중...</LoadingText>
        ) : allItems.length === 0 ? (
          <LoadingText>위시리스트가 비어있어요!</LoadingText>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>#</Th>
                <Th>항목</Th>
                <Th>가격</Th>
                <Th>상태</Th>
                <Th>선택</Th>
              </tr>
            </thead>
            <tbody>
              {allItems.map((item, idx) => {
                const done = item.purchased;
                const status = done ? '완료' : '대기중';
                return (
                  <Tr key={item.id} done={done}>
                    <Td done={done}>
                      {done
                        ? <span style={{ color: '#7BAB7B', fontSize: 16 }}>●</span>
                        : idx + 1}
                    </Td>
                    <Td done={done}>
                      <ItemName>
                        {item.itemName}
                      </ItemName>
                    </Td>
                    <Td done={done}>₩{(item.price || 0).toLocaleString()}</Td>
                    <Td>
                      <StatusBadge status={status}>{status}</StatusBadge>
                    </Td>
                    <Td>
                      {!done && (
                        <ActionBtn
                          variant="buy"
                          onClick={() => handlePurchase(item.id)}
                        >
                          구매
                        </ActionBtn>
                      )}
                      <ActionBtn
                        variant="delete"
                        onClick={() => navigate('/wishlist-delete', { state: { item } })}
                      >
                        삭제
                      </ActionBtn>
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </TableCard>
    </PageWrapper>
  );
}
