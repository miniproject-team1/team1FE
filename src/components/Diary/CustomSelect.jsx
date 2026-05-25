// 공통 커스텀 드롭다운 컴포넌트 - 감정 이유 선택 및 카테고리 선택에서 사용
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineDown } from "react-icons/ai";

export default function CustomSelect({ value, onChange, options, placeholder = "선택", $width, $flex, $up }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <SelectWrapper ref={ref} $width={$width} $flex={$flex}>
      <SelectTrigger type="button" onClick={() => setOpen((o) => !o)}>
        <SelectValue $empty={!value}>{value || placeholder}</SelectValue>
        <AiOutlineDown size={13} />
      </SelectTrigger>
      {open && (
        <OptionsList $up={$up}>
          {options.map((opt) => (
            <OptionItem key={opt} $selected={value === opt} onClick={() => { onChange(opt); setOpen(false); }}>
              {opt}
            </OptionItem>
          ))}
        </OptionsList>
      )}
    </SelectWrapper>
  );
}

const SelectWrapper = styled.div`
  position: relative;
  width: ${({ $width }) => $width || "auto"};
  ${({ $flex }) => $flex && "flex: 1;"}
  height: 36px;
`;

const SelectTrigger = styled.button`
  width: 100%;
  height: 100%;
  border: 1px solid #d5e5d5;
  border-radius: 12px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 12px;
  box-sizing: border-box;
  cursor: pointer;
  gap: 6px;
`;

const SelectValue = styled.span`
  font-family: "S-Core Dream", sans-serif;
  font-size: 15px;
  font-weight: 300;
  color: ${({ $empty }) => ($empty ? "#bbb" : "#000")};
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const OptionsList = styled.ul`
  position: absolute;
  ${({ $up }) => ($up ? "bottom: calc(100% + 4px);" : "top: calc(100% + 4px);")}
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #d5e5d5;
  border-radius: 12px;
  overflow: hidden;
  z-index: 100;
  list-style: none;
  margin: 0;
  padding: 4px 0;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const OptionItem = styled.li`
  padding: 9px 14px;
  font-family: "S-Core Dream", sans-serif;
  font-size: 15px;
  font-weight: 300;
  color: #000;
  cursor: pointer;
  background: ${({ $selected }) => ($selected ? "rgba(213, 229, 213, 0.5)" : "transparent")};

  &:hover {
    background: rgba(213, 229, 213, 0.3);
  }
`;