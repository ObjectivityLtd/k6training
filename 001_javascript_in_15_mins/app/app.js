
const check = (value, condition) => {
  console.log(`Evaluating ${value}`);
  for (cond in condition) {
    const result = condition[cond].call(this, value);
    console.log(result);
  }
}

check("check", {
  "first": (res) => res === "check",
  "second": (res) => res === "uncheck"
})