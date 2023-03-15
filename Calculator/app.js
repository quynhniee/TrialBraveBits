const result = document.getElementById("result");
let reset = true;

const onClickHandle = (e) => {
  const text = result.innerText;
  if (text == "0" || text == "NaN" || text == "undefine" || reset == true) {
    result.innerText = "";
  }
  result.innerText += e.value;
  reset = false;
};

const clearHandle = () => {
  result.innerText = "0";
};

const deleteHandle = () => {
  result.innerText = result.innerText.slice(0, -1);
  if (result.innerText == "") result.innerText = "0";
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
  else if (x == "(") return 0;
  return -1;
};

const type = (x) => {
  if (x == "x" || x == "/" || x == "-" || x == "+") return 2;
  return 1;
};

const getResultHandle = () => {
  const string = result.innerText;
  //   const arr = string.split(/([-+x\/\(\)])/g);
  const arr = string.split(
    /(?<=[\(\)\+\-*\/\^A-Za-z])|(?=[\(\)\+\-*\/\^A-Za-z])/g
  );
  if (arr[0] == "") arr.shift();
  if (arr[arr.length - 1] == "") arr.pop();

  console.log(arr);
  const n = arr.length;
  let St = [];
  let Sh = [];
  for (let i = 0; i < n; i++) {
    if (type(arr[i]) == 1 && arr[i] != "(" && arr[i] != ")") {
      Sh.push(+arr[i]);
    }

    if (arr[i] == "(") St.push(arr[i]);

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

    if (arr[i] == ")") {
      while (St[St.length - 1] != "(") {
        let a = Sh[Sh.length - 1];
        Sh.pop();
        let x = St[St.length - 1];
        St.pop();
        let b = Sh[Sh.length - 1];
        Sh.pop();
        Sh.push(calculate(a, b, x));
      }
      St.pop();
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
  result.innerText = Sh[Sh.length - 1].toFixed(4).replace(/\.?0*$/, "");
  reset = true;
};

// class Calculator {
//     constructor(selector) {
//         this.el = document.querySelector(selector)
//         this.el.addEventListener('click', this.handleClick)
//     }
//     handleClick(e) {
//         e.target
//     }
// }
