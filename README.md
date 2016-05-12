ClockSubmitV1.0
=======================
这是一个防止重复提交Form表单的小插件;

```
<script src="clockSubmit.js"></script>
```
调用方式：
```
// 初始化ClockSubmit组件
var c = ClockSubmit.init();
//多次点击添加按钮
$("add").click(function(){
  // true：表示锁是开着的可以提交表单
  if ( c.isOpen() ) {
    // 把提交的代码放到这里.....
    console.log("解锁");
  } else {
    console.log("锁定");
  }
});
