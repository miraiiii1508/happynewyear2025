$(function () {
  $("body").sakura({
    newOn: 300,
  });
});
function getRandomItem(array) {
  if (array.length === 0) return null;
  const index = Math.floor(Math.random() * array.length);
  return array.splice(index, 1)[0];
}
function getWeightedRandom(items, weights) {
  let totalWeight = weights.reduce((acc, weight) => acc + weight, 0);
  let randomNum = Math.random() * totalWeight;
  for (let i = 0; i < items.length; i++) {
    if (randomNum < weights[i]) return items[i];
    randomNum -= weights[i];
  }
  return items[items.length - 1];
}

document.addEventListener("DOMContentLoaded", () => {
  const lixiItems = document.querySelectorAll(".lixi");

  const lixiImages = [
    "lixi-1.png",
    "lixi-2.png",
    "lixi-3.png",
    "lixi-4.png",
    "lixi-5.png",
    "lixi-6.png",
  ];

  const positions = [
    { left: 72.61, top: 17.0 },
    { left: 47.17, top: 29.9 },
    { left: 29.5, top: 37.9 },
    { left: 49.06, top: 72.2 },
    { left: 77.28, top: 65.0 },
    { left: 8.17, top: 61.4 },
  ];

  let availablePositions = [...positions];
  let availableImages = [...lixiImages];

  lixiItems.forEach((lixi) => {
    const img = lixi.querySelector("img");

    const randomPosition = getRandomItem(availablePositions);
    if (randomPosition) {
      lixi.style.left = `${randomPosition.left}%`;
      lixi.style.top = `${randomPosition.top}%`;
    }

    const randomImage = getRandomItem(availableImages);
    if (randomImage) {
      img.src = "./assets/img/" + randomImage;
    }
  });
});

function handleClickLixi() {
  const chucMungMessages = [
    "🎉 Chúc mừng năm mới! Chúc bạn một năm tràn đầy niềm vui, sức khỏe dồi dào và thành công vượt bậc! 🎆",
  ];

  const lixiMessages = [
    "Xin 10k nhé 💵",
    "Xin 20k nhé 💶",
    "Xin 1$ nhé 💲",
    "Xin 50k nhé 💸",
    "Xin 100k nhé 💷",
    "Chúc bạn may mắn lần sau !❤️",
    "Hụt rồi mừng quá hehe 🎊",
    "Đen thôi đợi lần sau đỏ nhé🍀",
  ];
  const moneyImages = {
    "Xin 10k nhé 💵": "10k.jpg",
    "Xin 20k nhé 💶": "20k.png",
    "Xin 1$ nhé 💲": "1do.jpg", // Bạn có thể đổi tên ảnh nếu cần
    "Xin 50k nhé 💸": "50k.jpg",
    "Xin 100k nhé 💷": "100k.jpg",
    "Chúc bạn may mắn lần sau !❤️": "maymanls.jpg",
    "Hụt rồi mừng quá hehe 🎊": "cay.png",
    "Đen thôi đợi lần sau đỏ nhé🍀": "denthoidoquendi.jpg",
  };
  const lixiWeights = [35, 25, 9, 0.9, 0.1, 10, 10, 10];
  const showQR = true;
  const lixiItems = document.querySelectorAll(".lixi");
  const card = document.querySelector(".card");
  const messageElement = document.getElementById("message");
  const imageElement = document.getElementById("image");

  function closeCurrentCard() {
    if (!card) return;
    card.style.display = "none";
    messageElement.style.display = "none";
    imageElement.style.display = "none";
  }

  function showCard(message, lixiMessage, hasQR, lixiId) {
    closeCurrentCard();

    card.style.display = "flex";
    messageElement.style.display = "block";
    messageElement.textContent = message;

    let moneyImage = null;
    if (lixiMessage) {
      messageElement.textContent = lixiMessage;
    }

    if (hasQR && moneyImages[lixiMessage]) {
      moneyImage = moneyImages[lixiMessage];
      imageElement.style.display = "block";
      imageElement.src = "./assets/qr/" + moneyImage;
    }

    // Lưu vào localStorage
    const lixiData = { lixiId, message, lixiMessage, moneyImage };
    localStorage.setItem("openedLixi", JSON.stringify(lixiData));

    // Khóa tất cả lì xì khác
    disableAllLixi();
  }

  // Kiểm tra nếu đã mở lì xì trước đó
  const openedLixiData = JSON.parse(localStorage.getItem("openedLixi"));
  if (openedLixiData) {
    disableAllLixi();
    showCard(
      openedLixiData.message,
      openedLixiData.lixiMessage,
      !!openedLixiData.moneyImage,
      openedLixiData.lixiId
    );
  }

  // Gán sự kiện click cho lì xì
  lixiItems.forEach((lixi, index) => {
    const lixiId = `lixi-${index}`;

    // Nếu đã mở lì xì, không cho mở thêm
    if (openedLixiData) {
      lixi.style.opacity = "0.5";
      lixi.style.pointerEvents = "none";
      return;
    }

    lixi.addEventListener("click", function () {
      // Kiểm tra lại nếu đã mở trước đó
      if (localStorage.getItem("openedLixi")) {
        alert("Bạn chỉ được mở một lì xì duy nhất!");
        return;
      }

      const message = chucMungMessages[0];
      const hasQR = showQR ? Math.random() < 0.9 : false;

      if (hasQR) {
        const lixiMessage = getWeightedRandom(lixiMessages, lixiWeights);
        showCard(message, lixiMessage, hasQR, lixiId);
      } else {
        showCard(message, null, hasQR, lixiId);
      }

      this.style.opacity = "0.5";
      this.style.pointerEvents = "none";
    });
  });

  function disableAllLixi() {
    lixiItems.forEach((lixi) => {
      lixi.style.opacity = "0.5";
      lixi.style.pointerEvents = "none";
    });
  }

  // Kiểm tra nếu đã mở lì xì trước đó
  const openedLixi = localStorage.getItem("openedLixi");
  if (openedLixi) {
    disableAllLixi();
  }
  document.addEventListener("click", function (event) {
    if (!card) return;
    if (!card.contains(event.target) && !event.target.closest(".lixi")) {
      closeCurrentCard();
    }
  });
}

function handleMusic() {
  const musicBtn = document.querySelector(".music-toggle");
  const audio = document.getElementById("bgMusic");

  if (!musicBtn || !audio) return;

  musicBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      musicBtn.textContent = "🔊";
    } else {
      audio.pause();
      musicBtn.textContent = "🔈";
    }
  });
}

handleClickLixi();
handleMusic();
