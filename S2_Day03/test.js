let idSccess = "false";
let pwRangeSccess = "false";
let pwSccess = "false";

// 생년월일 select
$(document).ready(function () {
  var now = new Date();
  var year = now.getFullYear();

  for (var i = 1900; i <= year; i++) {
    $("#year").append('<option value="' + i + '">' + i + "</option>");
  }
  for (var i = 1; i < 13; i++) {
    $("#month").append('<option value="' + i + '">' + i + "</option>");
  }
  for (var i = 1; i < 32; i++) {
    $("#day").append('<option value="' + i + '">' + i + "</option>");
  }
});

// 아이디 중복체크
function idCheck() {
  let id = document.getElementById("userId").value;

  if (id == "") {
    alert("아이디를 입력하세요");
    return false;
  }

  $.ajax({
    url: "/idCheck",
    data: {
      id: id,
    },
    type: "POST",
    dataType: "json",
    success: function (result) {
      if (result == true) {
        alert("사용 가능한 ID입니다");
        idSccess = "true";
      } else {
        alert("사용이 불가능한 ID입니다");
        document.getElementById("userId").value = "";
        idSccess = "false";
        return false;
      }
    },
  });
}

// 비밀번호 설정 범위 확인
function pwRange() {
  let pw = document.getElementById("userPw");
  let pwRange =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,12}$/;
  let rangeMsg = document.getElementById("rangeMsg");
  let red = "#ff0000";

  setTimeout(() => {
    if (!pwRange.test(pw.value)) {
      rangeMsg.style.color = red;
      rangeMsg.innerHTML = "영문, 숫자, 특수문자 8~12자 사이로 조합해주세요";
      pwRangeSccess = "false";
    } else {
      rangeMsg.innerHTML = null;
      pwRangeSccess = "ture";
    }
  }, 0);
}

// 실시간 비밀번호 확인
function pwCheck() {
  let pw = document.getElementById("userPw");
  let pwCheck = document.getElementById("checkPw");
  let checkMsg = document.getElementById("checkMsg");
  let blue = "#1273E4";
  let red = "#ff0000";

  // setTimeout() : 지정된 시간 후 스크립트가 실행되게 하는 함수
  setTimeout(() => {
    if (pw.value == pwCheck.value) {
      checkMsg.style.color = blue;
      checkMsg.innerHTML = "비밀번호 일치";
      pwSccess = "ture";
    } else {
      checkMsg.style.color = red;
      checkMsg.innerHTML = "비밀번호 불일치";
      pwSccess = "false";
    }
  }, 0);
}

// 회원가입
function save(e) {
  if (idSccess == "false") {
    alert("아이디 중복 확인을 해주세요");
  }

  if (pwRangeSccess == "false") {
    alert("영문, 숫자, 특수문자 8~12자 사이로 조합해주세요");
  }

  if (pwSccess == "false") {
    alert("비밀번호가 일치하지 않습니다");
  }
}
