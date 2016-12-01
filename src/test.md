/*
  Open Source
  https://github.com/bxcn/clockSubmit
*/
;
(function() {
  // 核心
  function Clocked() {
    this._clockStatus = true; //锁
    this.timer = null; // 定时器
    this.grapTimer = 1000; // 锁定后，1秒钟后解锁
  }
  Clocked.prototype.init = function(grapTimer) {
    this.setTimer( grapTimer );
    return this.clock();
  }
  Clocked.prototype.setTimer = function(grapTimer) {
    this.grapTimer = grapTimer || this.grapTimer;
  }
  // 方法返回 false:锁是开着的，可以提交表单；true:锁是关着的，不可以提交表单；
  Clocked.prototype.clock = function() {

    var that = this;
    /*
      1、判断锁是开着的
      2、把_clockStatus开关给关闭false
      3、添加定时器，定时器在1000毫秒内是_clockStatus是关着的。1000毫秒后是再放开_clockStatus
    */
    if (that._clockStatus) {

      // 锁住
      that.isClose(true);

      that.timer = window.setTimeout(function() {
        that.timer = null;
        // 打开锁
        that.isOpen(true);
      }, that.grapTimer);

      // 连续点提交就不会再执行这里了，原因第一次进到这个语句块后，就改变了_clockStatus的状态；
      return false;
    }

    // 在定时器未销毁之前，返回的都是true;
    return that.isClose();
  }

  // 返回 true:锁是开着的;
  Clocked.prototype.isOpen = function(b) {
    if (arguments.length == 1) {
      this._clockStatus = b;
    }
    return this._clockStatus;
  }

  // 返回 true:锁是关着的;
  Clocked.prototype.isClose = function(b) {
    if (arguments.length == 1) {
      this._clockStatus = !b;
    }
    return !this._clockStatus;
  }

  // var _clocked = null;

/*  // this is a Singleton Pattern
  window.clock = {
    init: function(grapTimer) {
      if (!_clocked) {
        _clocked = new Clocked();
      }

      _clocked.setTimer(grapTimer);

      // false是没有锁定 true表示已经锁定不能提交了
      var isClock = _clocked.clock();

      return isClock;
    }
  }*/
  /**
  虚拟代理(virtual proxy)是最有用的类型之一，虚拟代理是用于控制对那种创建开销很大的本体的访问。
  它会把本体的实例化推迟到有方法被调用的时候，有时候还会提供关于实例化状态的反馈。
  它还可以在本体被加载之前扮演其替身的角色。
  如果有些类或对象的开销较大，而且不需要在实例化完成后立即访问其数据，那么应该使用远程代理。
  */
  function clockSubmitProxy() {
    this._clocked = null;
  }

  clockSubmitProxy.prototype.init = function(grapTimer) {
    if (!this._clocked) {
      this._clocked = new Clocked();
    }
    return this._clocked.init(grapTimer);
  };
  clockSubmitProxy.prototype.setTimer = function( grapTimer ) {
    return this._clocked.setTimer( grapTimer );
  };
  clockSubmitProxy.prototype.clock = function() {
    return this._clocked.clock();
  };
  clockSubmitProxy.prototype.isOpen = function(b) {
    return this._clocked.isOpen(b);
  };
  clockSubmitProxy.prototype.isClose = function(b) {
    return this._clocked.isClose(b);
  };

  window.clockSubmit =  new clockSubmitProxy();



  /*
    // 扩展
    window.clockSubmit = function () {
      // 单例模式共享一个实例对象
      var c = c = Clock.init();
      return {
        init: function( grapTimer ) {
          Clock.setTimer( grapTimer );
          // false是没有锁定 true表示已经锁定不能提交了
          var isClock = c.clock();
          return isClock;
        },
        isOpen: function( b ) {
          return c.isOpen(b);
        },
        isClose: function( b ) {
          return c.isClose(b);
        }

      }
    }();*/

})();

/*
第一版：
var isSend = false;
sureSendSMS = function() {
  if ( isSend ) {
    return;
  }
  isSend = true;
  window.setTimeout(function(){
    isSend = false;
  },3000);
}

第二版：

var clockSubmit = Clock.init();
sureSendSMS = function() {
  if ( clockSubmit.click()  ) {
    return;
  }
}

第三版：
$("add").click(function(){
  if ( clockSubmit() ) {
    return false;
  };
  // 在这里写提交的Ajax数据...
  console.log("解锁");
});

第四版：
$("add").click(function(){
  // 表示锁定1000毫秒，填写默认也是1000毫秒
  if ( clockSubmit.init(1000) ) {
    return false;
  };

  // 在这里写提交的Ajax数据...
  console.log("解锁");
  // 可选的，ajax执行完可以手动打开锁，如果不手动打开，1000毫秒后会自动打开
  clockSubmit.isOpen(true);
});

*/

/*
DEMO:
  var timer = window.setInterval(function(){
   console.log(clockSubmit.init(1000));
  },50);

*/
