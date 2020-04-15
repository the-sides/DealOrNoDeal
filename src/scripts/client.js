const checkStage = document.querySelector(".checks");
const caseStage = document.querySelector(".cases");
const offerStage = document.querySelector(".banker input");
const cash = [0.01, 1, 5, 10, 100, 1000, 10000, 100000, 500000, 1000000];
let newGame = true;
let handleNewGame;

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const makeOffer = () => {
  let sum = 0;
  let total = 0;
  const check = checkStage.querySelectorAll("input");
  check.forEach((elm) => {
    if (elm.checked == false) {
      sum += Number(elm.dataset.cash);
      total += 1;
    }
  });
  if (total == 1) {
    window.alert(`You won ${sum}, which was in your case this whole time!`);
    handleNewGame();
    return;
  }
  offerStage.value = formatNumber(((sum / total) * 0.9).toFixed(2));
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
  if (newGame) {
    newGame = false;
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
  makeOffer();
};

const generateCase = (stage, caseNum, value, disable = false) => {
  const caseElm = document.createElement("button");
  caseElm.textContent = caseNum;
  caseElm.dataset.cash = value;
  caseElm.classList.add("case");
  caseElm.classList.add("btn");
  if (disable) caseElm.disabled = true;
  caseElm.addEventListener("mouseup", handleOpen);
  stage.appendChild(caseElm);
};

const generateCases = (cash, disable = false) => {
  const cashArr = [...cash];

  while (cashArr.length > 0) {
    generateCase(
      caseStage,
      11 - cashArr.length,
      cashArr.splice(Math.round(Math.random() * (cashArr.length - 1)), 1),
      disable
    );
  }
};

const generateChecks = (cashVal) => {
  const checkRawHTML = `<span class="check" data-cash=${cashVal}>
  <input type="checkbox" readonly onclick="return false;" data-cash=${cashVal}>
  <p>$${formatNumber(cashVal)}</p>
</span>`;
  const checkElm = document.createElement("div");
  checkElm.innerHTML = checkRawHTML;
  checkStage.appendChild(checkElm);
};

cash.forEach(generateChecks);

generateCases(cash, true);

handleNewGame = () => {
  newGame = true;
  caseStage.innerHTML = "";
  checkStage.innerHTML = "";
  offerStage.value = 0;
  console.log(cash);
  generateCases(cash);
  cash.forEach(generateChecks);
};

const takeDeal = () => {
  const yourCaseValue = formatNumber(
    document.querySelector(".picked").dataset.cash
  );
  window.alert(`You took the offer of ${offerStage.value}.
  Your case had ${yourCaseValue}
  `);
  handleNewGame();
};

document.querySelector(".start").addEventListener("mouseup", handleNewGame);
document.querySelector(".takeDeal").addEventListener("mouseup", takeDeal);
