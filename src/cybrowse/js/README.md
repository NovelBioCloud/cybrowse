## 准备知识

* 语法
  
  项目中使用了 ES6 的语法， ES6 语法学习网站 http://es6.ruanyifeng.com/

* 服务
  
  项目中经常被使用的单例对象被提取为服务

* 事件
  
  程序中使用了事件注册机制，注册的事件需要通过注册方的 dispose 方法进行注销

* 设计模式

  http://www.cnblogs.com/guwei4037/p/5591183.html
  
  http://www.cnblogs.com/linzheng/archive/2011/03/12/1981960.html 
  
  主要关注 mvvm 模式，项目中多处使用该模式的简化版本，并使用了约定俗称的名称 (View, ViewModel)，详细说明如下：
  
  查看 propertyImporter.js 文件，该文件中包括三个类 PropertyImporter, View, ViewModel，PropertyImporter负责构造 View, ViewModel对象，View 对象通过ViewModel渲染视图，通过触发事件，修改ViewModel的数据

* 编码习惯

  类中一般不直接通过构造方法传递参数，一般手动调用 init 方法传递参数，并执行初始化
  
  init方法一般有 props 、 context 俩个参数。props 参数是该类使用的参数组成的对象， context 是用作传递全局服务用的对象
  
  dispose 方法是析构函数，通常在对象删除的时候，掉用该方法，注销该对象调用的事件

## 业务需求

  * 导入导出 cytoscape 数据、样式，调整 cytoscape 布局

  * 绘制 cytoscape 图
  
  * 修改节点和连线的数据

  * 展示被选择的节点连线数据信息

## 程序设计文档

  * 修改 cytoscape 样式，然后显示 cytoscape 的样式。
    
    修改 cytoscape 的样式数据通过 NodeStyleModel、 EdgeStyleModel 修改，然后主动出发 ViewPanelService 的 update 方法。
  * 修改 cytoscape 样式的数据
    
    NodeStyleModel、 EdgeStyleModel 中通过 CurrentStyleService 获取数据信息，通过 StyleDetail 类解析数据格式，修改数据
  * cytoscape 样式的数据格式
    
    请查看默认样式的数据，查看文件 BaseStyleService
  * 术语

    修改节点、连线样式有3大方式，默认传值，匹配传值和直接传值，其中匹配传值又分为间接匹配传值和直接匹配传值。
    查看 lineColor.js 文件，文件中的 DefaultValue 类是默认传值实现，Mapping 是匹配传值，Bypass 是直接传值。Mapping 中分俩种类型，直接匹配(passthrough)和间接匹配(discrete) 。
    其他文件中也有类似概念。

### 基础服务

* InstantiationService

  实例服务，该服务的作用是启动一个实例，当前项目中该实例暂时未做任何实际功能，只是简单地初始化对象

* CommandService

  命令服务，注册命令，所有的功能都可以注册为一个命令，任何时候都可以通过命令服务执行一个命令。每一个命令都有特定的id，通过该id执行命令

* KeybindingService

  键盘服务，注册绑定键盘事件。通过该服务可以注册全局的键盘事件，通常可以通过注册键盘事件，触发方法，方法中调用命令

* StorageService

  存储服务，使用 localStorage 存储信息。封装 localStorage

* NLService

  国际化服务。当前项目中没有国际化的功能设置，此处只是预留接口

### 核心服务

* WindowService

  界面服务，提供 document 对象。通过界面服务，渲染页面

* ViewPanelService

  cytoscape 对象包装类。

* ToolbarService

  工具栏服务。所有工具栏的功能通过该服务类接入

* MenubarService

  菜单栏服务。所有菜单栏的功能通过该服务类接入

* TableDatasourceService

  表格数据源服务。表格数据通过 ViewPanelService、CurrentDataService 服务获取，并通知 TablePanelService

* TablePanelService

  表格服务。 TableDatasourceService 数据发生变化以后，重新渲染页面

* CurrentDataService

  当前数据服务类。

* CurrentStyleService

  当前样式服务类。

* CurrentLayoutService

  cytoscape的布局类。

* BaseStyleService

  样式服务类，包括创建、删除、倒入、导出等服务

### 核心类

* StyleDetail

  样式数据包装类，将样式数据分解为低层需要的数据结构

* NodeStyleModel

  节点样式数据操作相关类，所有节点样式的修改，必须通过修改该类的对象修改

* EdgeStyleModel

  连线样式数据操作相关类。所有连线样式的修改，必须通过修改该类的对象修改


