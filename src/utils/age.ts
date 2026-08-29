// 생년월일 문자열 기준 만 나이 계산
export const calculateAge = (birthDate: string) => {
  if (!birthDate) return 0;

  const birth = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age -= 1;

  return age;
};
