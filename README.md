ClockSubmitV1.0
=======================
这是一个防止重复提交Form表单的小插件;

```
    <script src="ClockSubmit.js"></script>
```
调用方式：
```
// 初始化ClockSubmit组件
var c = ClockSubmit.init(false);
//多次点击添加按钮
$("add").click(function(){
  // true：表示锁定当前表单不能提交
  if ( c.clock() ) {
    console.log("锁定");
  } else {
    // 把提交的代码放到这里.....
    console.log("解锁");
  }
});
