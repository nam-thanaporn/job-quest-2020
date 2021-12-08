console.log("=============== 1. Fibonacci Sequence ===============");
const fib = (n) => {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
};

console.log(fib(1));
console.log(fib(3));
console.log(fib(12));

console.log("================= 2. Array shift =================");
const arrRotateRight = (a, n) => {
  while (n > 0) {
    a.unshift(a.pop());
    n--;
  }
  return a;
};

const arrRotateLeft = (a, n) => {
  while (n > 0) {
    a.push(a.shift());
    n--;
  }
  return a;
};

const shift = (arr, direction, n) => {
  let result = [];
  if (direction === "left") {
    result = arrRotateLeft(arr, n);
  } else if (direction === "right") {
    result = arrRotateRight(arr, n);
  } else {
    return "Error";
  }

  return result;
};

console.log(shift(["john", "jane", "sarah", "alex"], "left", 2));
console.log(shift([1, 2, 3, 4, 5], "right", 3));

console.log("=================== 3. Second max ===================");
const secondMax = (n) => {
  if (n.length === 0) return "Error!";

  const unique = n.filter((el, i, a) => i === a.indexOf(el));

  if (unique.length === 1) return n[0];

  const sort = unique.sort();

  return sort[n.length - 2];
};

console.log(secondMax([2, 3, 4, 5]));
console.log(secondMax([9, 2, 21, 21]));
console.log(secondMax([4, 4, 4, 4]));
console.log(secondMax([4123]));
console.log(secondMax([]));

console.log("=================== 4. FizzBuzz ===================");
const fizzBuzz = (n) => {
  let result = "";

  switch (true) {
    case n % 5 == 0 && n % 3 == 0:
      result = "FizzBuzz";
      break;
    case n % 3 == 0:
      result = "Fizz";
      break;
    case n % 5 == 0:
      result = "Buzz";
      break;
    default:
      break;
  }

  return result;
};

console.log(fizzBuzz(21));
console.log(fizzBuzz(25));
console.log(fizzBuzz(45));
