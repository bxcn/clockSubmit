/*
  Open Source
  https://github.com/bxcn/clockSubmit
*/
;(function( ) {
  window.console = console || {log: function() {}};
  // 核心
  function Clocked() {
    this._isOpen = true;//锁
    this.timer = null; // 定时器
  }
  Clocked.prototype.init = function() {
    //this._isOpen = true;
  }

  // 返回 true:锁是开着的，可以提交表单；false:销是关阗的，不可以提交表单；
  Clocked.prototype.clock = function() {

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

  // 返回 true:锁是开着的，可以提交表单；false:销是关阗的，不可以提交表单；
  Clocked.prototype.isOpen = function() {

    return this._isOpen;
  }

  // 返回 true:锁是开着的，可以提交表单；false:销是关阗的，不可以提交表单；
  Clocked.prototype.isClose = function() {
    return !this._isOpen;
  }

  var _clocked = null;

  // this is a Singleton Pattern
  window.Clock =  {
    init: function() {
      if ( !_clocked ) {
        _clocked = new Clocked();
      }
      return _clocked;
    }
  }


  // 扩展
  window.ClockSubmit = function () {
    // 单例模式共享一个实例对象
    var c = Clock.init();

    if ( c.isClose() ) {
      return function() {};
    }

    return function( callback, param ) {

      if ( c.clock() ) {
        callback.call(this, param);
      } else {
        console.log("锁定")
      }
    }

  }();

})();
