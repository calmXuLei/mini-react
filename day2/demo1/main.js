
let taskId = 1
function workLoop (idleDeadline) {
  taskId ++;
  // console.log(idleDeadline);
  /**
   * {
   *    didTimeout: 回调是否在超时时间前已经执行的状态
   *    [[prototype]]: {
   *      timeRemaining: fn () {} 可以获取当前空闲时间
   *    }
   * }
   */
  // console.log(idleDeadline.timeRemaining()); // 获取空闲时间
  let shouldYield = false

  while (!shouldYield) {
    // run task
    console.log(`Task ${taskId}: is running`);
    
    shouldYield = idleDeadline.timeRemaining() < 1;
  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);