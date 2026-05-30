import { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import happyEmoji from "../assets/emoji/happy.png";
import smileEmoji from "../assets/emoji/smile.png";
import neutralEmoji from "../assets/emoji/neutral.png";
import sadEmoji from "../assets/emoji/sad.png";
import angryEmoji from "../assets/emoji/angry.png";

const BASE_URL = "https://team1.z0.co.kr";

const EMOJI_MAP = {
  HAPPY: happyEmoji,
  SMILE: smileEmoji,
  NEUTRAL: neutralEmoji,
  SAD: sadEmoji,
  ANGRY: angryEmoji,
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];

function getCalendarWeeks(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let startDow = firstDay.getDay();
  startDow = startDow === 0 ? 6 : startDow - 1;

  const days = [];
  for (let i = startDow; i > 0; i--) {
    days.push({ date: new Date(year, month, 1 - i), currentMonth: false });
  }
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push({ date: new Date(year, month, d), currentMonth: true });
  }
  const rem = days.length % 7;
  if (rem !== 0) {
    for (let i = 1; i <= 7 - rem; i++) {
      days.push({ date: new Date(year, month + 1, i), currentMonth: false });
    }
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export default function Main() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState(null);
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const weeks = getCalendarWeeks(year, month);
  const lastWeekIndex = weeks.length - 1;

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  useEffect(() => {
    async function fetchCalendar() {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`${BASE_URL}/api/v1/calendar/${year}/${month + 1}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("캘린더 조회 성공", response.data);
        setCalendarData(response.data.data);
      } catch (error) {
        console.error("캘린더 조회 실패", error.response?.data || error.message);
      }
    }
    fetchCalendar();
  }, [year, month]);

  const isToday = (date) =>
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const getDayData = (date) => {
    if (!calendarData?.days) return null;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return calendarData.days.find((d) => d.date === key) || null;
  };

  return (
    <PageWrapper>
      <TopSection>
        <LeftSection>
          <Greeting>Hello, 홍길동님</Greeting>
          <BudgetBar>
            <BudgetRow>
              <BudgetLabel>이번 달 예산 |</BudgetLabel>
              <BudgetAmount $over={calendarData && calendarData.totalSpending > calendarData.budgetAmount}>
                {calendarData
                  ? `${calendarData.totalSpending.toLocaleString()} / ${calendarData.budgetAmount.toLocaleString()}`
                  : "-"}
              </BudgetAmount>
              <BudgetAvailable $over={calendarData && calendarData.totalSpending > calendarData.budgetAmount}>
                {calendarData
                  ? calendarData.totalSpending > calendarData.budgetAmount
                    ? "예산초과!!!"
                    : `${calendarData.remainingBudget.toLocaleString()} 사용가능`
                  : ""}
              </BudgetAvailable>
            </BudgetRow>
          </BudgetBar>
        </LeftSection>

        <RightSection>
          <CalendarNav>
            <ArrowButton onClick={prevMonth}>
              <IoIosArrowBack />
            </ArrowButton>
            <NavText>{year}년 {month + 1}월</NavText>
            <ArrowButton onClick={nextMonth}>
              <IoIosArrowForward />
            </ArrowButton>
          </CalendarNav>

          <CalendarWrapper>
            <WeekdayRow>
              {WEEKDAYS.map((day, i) => (
                <WeekdayCell key={day} $isSunday={i === 6}>{day}</WeekdayCell>
              ))}
            </WeekdayRow>

            <CalendarBody>
              {weeks.map((week, wi) => (
                <WeekRow key={wi}>
                  {week.map((dayObj, di) => {
                    const todayFlag = isToday(dayObj.date);
                    const isBottomLeft = wi === lastWeekIndex && di === 0;
                    const isBottomRight = wi === lastWeekIndex && di === 6;
                    const dayData = getDayData(dayObj.date);
                    const dateStr = `${dayObj.date.getFullYear()}-${dayObj.date.getMonth() + 1}-${dayObj.date.getDate()}`;
                    return (
                      <DayCell
                        key={di}
                        $today={todayFlag}
                        $currentMonth={dayObj.currentMonth}
                        $isBottomLeft={isBottomLeft}
                        $isBottomRight={isBottomRight}
                        onClick={() => dayObj.currentMonth && navigate("/diary", { state: { date: dateStr } })}
                        style={{ cursor: dayObj.currentMonth ? "pointer" : "default" }}
                      >
                        <CellTopRow>
                          {dayObj.currentMonth && dayData?.emoji && (
                            <EmojiImg src={EMOJI_MAP[dayData.emoji]} alt="emoji" />
                          )}
                          <DateNumber>{dayObj.date.getDate()}</DateNumber>
                        </CellTopRow>
                        {dayData?.hasExpense && (
                          <EntryBox>
                            <EntryTextGroup>
                              <EntryAmount>₩{dayData.daySpending.toLocaleString()}</EntryAmount>
                            </EntryTextGroup>
                            <EntryDivider />
                          </EntryBox>
                        )}
                      </DayCell>
                    );
                  })}
                </WeekRow>
              ))}
            </CalendarBody>
          </CalendarWrapper>
        </RightSection>
      </TopSection>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(0deg, #eef1da 0%, #eef1da 100%), #fdf8f8;
`;

const TopSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 60px 40px;
  gap: 120px;
`;

const LeftSection = styled.div`
  display: flex;
  width: 25%;
  min-width: 220px;
  flex-direction: column;
  align-items: flex-start;
  gap: 26px;
`;

const Greeting = styled.h1`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 44px;
  font-weight: 500;
  line-height: normal;
  margin: 0;
`;

const BudgetBar = styled.div`
  display: flex;
  height: 35px;
  padding: 8px 20px 7px 11px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid #c7d9dd;
  background: linear-gradient(
      0deg,
      rgba(213, 229, 213, 0.5) 0%,
      rgba(213, 229, 213, 0.5) 100%
    ),
    #fff;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
`;

const BudgetRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
`;

const BudgetLabel = styled.span`
  color: #000;
  font-family: "S-Core Dream", sans-serif;
  font-size: 15px;
  font-weight: 300;
  line-height: normal;
`;

const BudgetAmount = styled.span`
  color: ${({ $over }) => ($over ? "#E84B6A" : "#000")};
  font-family: "S-Core Dream", sans-serif;
  font-size: 15px;
  font-weight: ${({ $over }) => ($over ? 600 : 300)};
  line-height: normal;
`;

const BudgetAvailable = styled.span`
  color: ${({ $over }) => ($over ? "#E84B6A" : "#9ba0aa")};
  font-family: "S-Core Dream", sans-serif;
  font-size: 15px;
  font-weight: ${({ $over }) => ($over ? 600 : 300)};
  line-height: normal;
`;

const RightSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const CalendarNav = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #000;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const NavText = styled.span`
  color: #000;
  text-align: center;
  font-family: "S-Core Dream", sans-serif;
  font-size: 25px;
  font-weight: 400;
  line-height: normal;
`;

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  align-self: stretch;
`;

const WeekdayRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 55px;
  align-self: stretch;
  border-radius: 50px 50px 0 0;
  background: rgba(213, 229, 213, 0.5);
  box-sizing: border-box;
`;

const WeekdayCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $isSunday }) => ($isSunday ? "#f00" : "#000")};
  text-align: center;
  font-family: "S-Core Dream", sans-serif;
  font-size: 25px;
  font-weight: 300;
  line-height: normal;
`;

const CalendarBody = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 1px;
  border-radius: 0 0 50px 50px;
  overflow: hidden;
  box-shadow: -3px 3px 2px 0 rgba(0, 0, 0, 0.05);
`;

const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-self: stretch;
`;

const DayCell = styled.div`
  display: flex;
  min-height: 111px;
  padding: 3px 5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  background: ${({ $today }) =>
    $today
      ? "linear-gradient(0deg, rgba(213, 229, 213, 0.20) 0%, rgba(213, 229, 213, 0.20) 100%), #FFF"
      : "#fff"};
  border: ${({ $today }) => ($today ? "1px solid #f00" : "none")};
  box-shadow: -1px -1px 2px 0 rgba(0, 0, 0, 0.1) inset;
  box-sizing: border-box;
  opacity: ${({ $currentMonth }) => ($currentMonth ? 1 : 0.35)};
`;

const CellTopRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const EmojiImg = styled.img`
  width: 18px;
  height: 18px;
`;

const DateNumber = styled.span`
  color: #000;
  text-align: center;
  font-family: "S-Core Dream", sans-serif;
  font-size: 17px;
  font-weight: 400;
  line-height: normal;
  margin-left: auto;
`;

const EntryBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 4px 6px;
  gap: 4px;
  align-self: stretch;
  border-radius: 5px;
  background: rgba(213, 229, 213, 0.5);
  cursor: pointer;
  &:hover { background: rgba(213, 229, 213, 0.8); }
`;

const EntryTextGroup = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`;

const EntryName = styled.span`
  color: #1e1e1e;
  text-align: right;
  font-family: "S-Core Dream", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: normal;
`;

const EntryAmount = styled.span`
  color: #000;
  text-align: right;
  font-family: "S-Core Dream", sans-serif;
  font-size: 11px;
  font-weight: 400;
  line-height: normal;
`;

const EntryDivider = styled.div`
  width: 1px;
  height: 34px;
  flex-shrink: 0;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    #d5e5d5;
`;
