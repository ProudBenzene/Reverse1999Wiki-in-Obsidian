---
aliases: 
tags: 
cssclasses:
  - cards
  - 无序-卡片化阅览
  - 无序-四列
---
```dataview
Table without id
	embed(link(本色立绘)) AS "相片",
"<span style='display:flex; justify-content: center;'>" + "**" + Name+ "**" + "</span>" As 角色,
	"<span style='display:flex; justify-content: center;'>" + "*" + exonym + "*"  + "</span>" As 译名,
	"<span style='display:flex; justify-content: center; font-size: 14px;'>" + 星级 + "</span>" As 星级,
	"<span style='display:flex; justify-content: center;'>" + 参展时长 + "</span>" AS 年龄,
	"<span style='display:flex; justify-content: center;'>" + 诞生 + "</span>" AS 生日,
	"<font color='#e1b343'>" + 银行彩色相片 + "</font>" AS 简介,
	"<span style='display:flex; justify-content: center;'>" + "[[" + file.name + "]]" + "</span>" AS "双链"
Where contains(file.path,"100-UTTU人物合辑") AND !contains(file.name,"100-UTTU人物合辑") AND !contains(file.name,"维尔汀")
```


```dataview
CALENDAR 
生日
Where contains(file.path,"100-UTTU人物合辑") AND !contains(file.name,"100-UTTU人物合辑") AND !contains(file.name,"维尔汀")
```

%% W