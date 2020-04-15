const checkStage = document.querySelector(".checks");
const caseStage = document.querySelector(".cases");
const cash = [0.01, 1, 5, 10, 100, 1000, 10000, 100000, 500000, 1000000];
let gameState = {
  newGame: true,
  offer: 0,
};

const findAndCheck = (val) => {
  const checks = checkStage.querySelectorAll(".check");
  checks.forEach((elm) => {
    if (elm.dataset.cash === val) {
      elm.children[0].checked = true;
    }
  });
};

const handleOpen = (ev) => {
  if (gameState.newGame) {
    gameState.newGame = false;
    ev.srcElement.classList.add("picked");
    return;
  }
  if (ev.srcElement.classList.contains("picked")) {
    return;
  }

  ev.srcElement.classList.add("opened");
  const cash = ev.srcElement.dataset.cash;
  ev.srcElement.textContent = cash;
  findAndCheck(cash);
};

const generateCase = (stage, caseNum, value) => {
  const caseElm = document.createElement("button");
  caseElm.textContent = caseNum;
  caseElm.dataset.cash = value;
  caseElm.classList.add("case");
  caseElm.classList.add("btn");
  caseElm.addEventListener("mouseup", handleOpen);
  stage.appendChild(caseElm);
};

const generateCases = (cash) => {
  const cashArr = [...cash]

  while (cashArr.length > 0) {
    generateCase(
      caseStage,
      11 - cashArr.length,
      cashArr.splice(Math.round(Math.random() * (cashArr.length - 1)), 1)
    );
  }
}

const generateChecks = (cashVal) => {
  const checkRawHTML = `<span class="check" data-cash="${cashVal}">
  <input type="checkbox" readonly onclick="return false;">
  <p>$${cashVal}</p>
</span>`;
  const checkElm = document.createElement("div");
  checkElm.innerHTML = checkRawHTML;
  checkStage.appendChild(checkElm);
};

// const revealCase = (caseNum)

cash.forEach(generateChecks);

generateCases(cash)

const newGame = () => {
  gameState.newGame = true;
  caseStage.innerHTML = '';
  checkStage.innerHTML = '';
  console.log(cash)
  generateCases(cash)
  cash.forEach(generateChecks);
};

document.querySelector('.start').addEventListener('mouseup', newGame)