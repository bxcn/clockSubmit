const global = window || global || {};

class _ClockSubmit {
  constructor(sign, grapTimer) {
    this.grapTimer = grapTimer || 1000;
    this.sign = sign;
  }

  clock() {
    const sign = this.sign;
    if (global[sign + 'timer']) {
      // 第一次返回false
      return true;
    }
    // 添加定时器，定时器在1000毫秒内是status是关着的。1000毫秒后是再放开status
    global[sign + 'timer'] = window.setTimeout(() => {
      this.open();
    }, this.grapTimer);
    return false;
  }
  open() {
    const sign = this.sign;
    global[sign] = null; // 释放引用
    window.clearTimeout(global[sign + 'timer']);
    global[sign + 'timer'] = null;
  }
}

var clockSubmit = function(sign, grapTimer) {
  if (!global[sign]) {
    global[sign] = new _ClockSubmit(sign, grapTimer);
  }
  return global[sign].clock();
};
