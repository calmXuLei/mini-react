
function workLoop(deadLine) {
  console.log(deadLine.timeRemaining());

  let shouldYield = false;
  while(!shouldYield) {
    requestIdleCallback(workLoop)
    shouldYield = deadLine.timeRemaining() < 1
  }
}

requestIdleCallback(workLoop);