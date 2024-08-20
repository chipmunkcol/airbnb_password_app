// createPassword.test.js

const MAJIC_NUMBER = 1031; // MAJIC_NUMBER를 정의합니다. 실제 값에 따라 조정하세요.

function createPassword(date) {
  const today = formatKoreanDate(date);
  const _password = Number(today) * MAJIC_NUMBER * MAJIC_NUMBER;
  const password = getLastSixDigits(_password);
  return password;
}

function formatKoreanDate(date) {
  const options = {
    timeZone: "Asia/Seoul",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  };

  const formatter = new Intl.DateTimeFormat("ko-KR", options);
  const formattedDate = formatter.format(new Date(date));

  // '240819' 형식으로 변환
  const trimedCompactDate = formattedDate
    .split(" ")
    .join("")
    .split(".")
    .join("");
  return trimedCompactDate;
}

function getLastSixDigits(number) {
  // 숫자를 문자열로 변환한 후, 뒤의 6자리 추출
  const numberStr = String(number);
  const lastSixDigits = numberStr.slice(-6);
  return lastSixDigits;
}

// 테스트 코드

describe("createPassword 함수 테스트", () => {
  test("2024년 8월 20일일 때", () => {
    const result = createPassword("2024-08-20");
    expect(result).toBe("268020");
    jest.restoreAllMocks();
  });
  test("2024년 8월 19일일 때", () => {
    const result = createPassword("2024-08-19");
    expect(result).toBe("205059");
    jest.restoreAllMocks();
  });
  test("2024년 8월 21일일 때", () => {
    const result = createPassword("2024-08-21");
    expect(result).toBe("330981");
    jest.restoreAllMocks();
  });
  test("2024년 8월 22일일 때", () => {
    const result = createPassword("2024-08-22");
    expect(result).toBe("393942");
    jest.restoreAllMocks();
  });
});

// describe("formatKoreanDate 함수 테스트", () => {
//   test('2024년 8월 20일일 때 "240820"을 반환해야 한다.', () => {
//     const result = formatKoreanDate("2024-08-20");
//     expect(result).toBe("240820");
//     jest.restoreAllMocks();
//   });

//   test('2024년 8월 19일일 때 "240819"을 반환해야 한다.', () => {
//     const result = formatKoreanDate("2024-08-19");
//     expect(result).toBe("240819");
//     jest.restoreAllMocks();
//   });

//   test('2024년 8월 21일일 때 "240821"을 반환해야 한다.', () => {
//     const result = formatKoreanDate("2024-08-21");
//     expect(result).toBe("240821");
//     jest.restoreAllMocks();
//   });
// });
