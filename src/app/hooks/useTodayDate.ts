import { useMemo } from "react";

export const useTodayDate = () => {
  return useMemo(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const day = dayNames[today.getDay()];
    return `${month}월 ${date}일(${day}) 오늘의 미션`;
  }, []);
};
