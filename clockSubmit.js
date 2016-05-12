/*
  Open Source
  https://github.com/bxcn/clockSubmit
*/
;var ClockSubmit = (function( ) {

  function Clock() {
    this._isOpen = true;//锁
    this.timer = null; // 定时器
  }
  Clock.prototype.init = function() {
    this._isOpen = false;
  }

  // 返回 true:锁是开着的，可以提交表单；false:销是关阗的，不可以提交表单；
  Clock.prototype.isOpen = function() {

    var that = this;
    /*
      1、判断锁是开着的
      2、把_isOpen开关给关闭false
      3、添加定时器，定时器在1000毫秒内是_isOpen是关着的。1000毫秒后是再放开_isOpen
    */
    if ( that._isOpen ) {
      that._isOpen = false;
      that.timer = window.setTimeout(function(){
        that.timer = null;
        that._isOpen = true;
      }, 1000);

      // 这里返回的true是说明这是第一次提交表单当然是可以提交的，所以会返回true.
      // 连续点提交就不会再执行这里了，原因第一次进到这个语句块后，就改变了_isOpen的状态；
      return true;
    }

    // 在定时器未销毁之前，返回的都是false;
    return that._isOpen;
  }

  var _clock = null;


  // this is a Singleton Pattern
  return {
    init: function() {

      if ( _clock ) {
        return _clock;
      } else {
        return new Clock();
      }
    }
  };

})();
