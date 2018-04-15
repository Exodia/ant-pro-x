导航
===

### 导航项配置：

1. 递归支持子导航项配置

2. 导航项配置支持以下属性：
    - icon：配置导航项icon
    - text：导航项文案
    - url：导航链接
    - target：链接目标窗口

### 导航状态树

```
{
   entities: Array<Object>,
   openItemKeys: Array<string>,
   selectedItemKeys: Array<string>,
   collapsed: bool
}
```
