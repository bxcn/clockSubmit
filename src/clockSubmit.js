const global = window || global || {};

class _ClockSubmit {
  constructor(sign, grapTimer) {
    this.grapTimer = grapTimer || 1000;
    this.sign = sign;
    this.signTimer = `${sign}timer`;
  }

  clock() {
    const sign = this.sign;
    const signTimer = this.signTimer;
    if (global[signTimer]) {
      // 第一次返回false
      return true;
    }
    // 添加定时器，定时器在1000毫秒内是status是关着的。1000毫秒后是再放开status
    global[signTimer] = window.setTimeout(() => {
      this.open();
    }, this.grapTimer);
    return false;
  }
  open() {
    const sign = this.sign;
    const signTimer = this.signTimer;
    window.clearTimeout(global[signTimer]);
    global[signTimer] = global[sign] = null; // 释放引用
  }
}

var clockSubmit = function(sign, grapTimer) {
  if (!global[sign]) {
    global[sign] = new _ClockSubmit(sign, grapTimer);
  }
  return global[sign].clock();
};
