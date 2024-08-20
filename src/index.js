import { getDB, uploadDB } from "./firebase.js";

const passwords = await getDB();
const MAJIC_NUMBER = 1031;

const $currentPasswordTxt = document.getElementById("current-password-txt");
const $oldPasswordTxt = document.getElementById("old-password-txt");

if (passwords.length > 0 && $currentPasswordTxt && $oldPasswordTxt) {
  const currentPassword = passwords[0]?.value;
  const oldPassword = passwords[1]?.value;
  $currentPasswordTxt.innerHTML = currentPassword;
  if (oldPassword) {
    $oldPasswordTxt.innerHTML = oldPassword;
  } else {
    $oldPasswordTxt.innerHTML = "이전 비밀번호가 없습니다.";
  }
}

const $createPasswordBox = document.getElementById("create-password");
const $createPasswordTxt = document.getElementById("create-password-txt");
const $createPasswordBtn = document.getElementById("create-password-btn");

$createPasswordBtn.addEventListener("click", () => {
  const newPassword = createPassword();
  $createPasswordTxt.innerHTML = newPassword;
  $createPasswordTxt.style.opacity = 1;
  $createPasswordBtn.style.opacity = 0;
  $createPasswordBtn.style.pointerEvents = "none";
  createBtnToUploadDB();
});

function createBtnToUploadDB() {
  const $uploadDBBtn = document.createElement("button");
  $uploadDBBtn.innerText = "현재 비밀번호 바꾸기";
  $uploadDBBtn.addEventListener("click", async () => {
    const newPassword = createPassword();
    const today = formatKoreanDate();
    await uploadDB(today, newPassword);
    alert("비밀번호가 변경되었습니다✨");
    window.location.reload();
  });
  $createPasswordBox.appendChild($uploadDBBtn);
}

function createPassword() {
  const today = formatKoreanDate();
  const _password = Number(today) * MAJIC_NUMBER * MAJIC_NUMBER; // MAJIC_NUMBER: 1031
  const password = getLastSixDigits(_password);
  return password;
}

function formatKoreanDate() {
  const options = {
    timeZone: "Asia/Seoul",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  };

  const formatter = new Intl.DateTimeFormat("ko-KR", options);
  const formattedDate = formatter.format(new Date());

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
