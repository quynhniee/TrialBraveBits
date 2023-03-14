const calculation = document.getElementById("calculation");
const result = document.getElementById("result");

const onClickHandle = (e) => {
  calculation.innerText += e.value;
};

const calculate = (a, b, operator) => {
  switch (operator) {
    case "x":
      return a * b;
    case "-":
      return -a + b;
    case "+":
      return a + b;
    case "/":
      return b / a;
  }
};

const operatorPriority = (x) => {
  if (x == "x" || x == "/") return 2;
  else if (x == "-" || x == "+") return 1;
  return 0;
};

const type = (x) => {
  if (x == "x" || x == "/" || x == "-" || x == "+") return 2;
  return 1;
};

const getResultHandle = () => {
  const string = calculation.innerText;
  const arr = string.split(/([-+x\/])/g);
  const n = arr.length;
  let St = [];
  let Sh = [];
  for (let i = 0; i < n; i++) {
    if (type(arr[i]) == 1) {
      Sh.push(+arr[i]);
    }
    if (type(arr[i]) == 2) {
      while (
        St.length > 0 &&
        operatorPriority(arr[i]) <= operatorPriority(St[St.length - 1])
      ) {
        let a = Sh[Sh.length - 1];
        Sh.pop();
        let x = St[St.length - 1];
        St.pop();
        let b = Sh[Sh.length - 1];
        Sh.pop();
        Sh.push(calculate(a, b, x));
      }
      St.push(arr[i]);
    }
  }
  while (St.length > 0) {
    let a = Sh[Sh.length - 1];
    Sh.pop();
    let x = St[St.length - 1];
    St.pop();
    let b = Sh[Sh.length - 1];
    Sh.pop();
    Sh.push(calculate(a, b, x));
  }
  result.innerText = Sh;
  calculation.innerText = " ";
};
