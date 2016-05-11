;var ClockSubmit = (function( ) {

  function Clock() {
    this._isClock = false;
    this._init = true; // 初始化clock锁
    this.timer = null; // 定时器
  }
  Clock.prototype.init = function() {
    this._isClock = false;
  }

  Clock.prototype.clock = function() {

    var that = this;
    // 是第一次请求吗？
    if ( that._init ) {
      that._init = false;
      that._isClock = true;
      that.timer = window.setTimeout(function(){
        that.timer = null;
        that._isClock = false;
      }, 1000);

      return that._init; //如果返回是false 说明这是第一次
    }

    return that._isClock;
  }

  return {
    init: function() {
      return new Clock();
    }
  };

})();
