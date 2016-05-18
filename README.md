clockSubmit
=======================
这是一个防止重复提交Form表单的小插件;

```
<script src="clockSubmit.js"></script>
```
调用方式：
```
//多次点击添加按钮
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
