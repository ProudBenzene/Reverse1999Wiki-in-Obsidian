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
sort 星级 desc
```



```dataview
CALENDAR 
生日
Where contains(file.path,"100-UTTU人物合辑") AND !contains(file.name,"100-UTTU人物合辑") AND !contains(file.name,"维尔汀")
```
## 索引

%% Begin Waypoint %%
- **超自然者｜Beyond**
	- [[洁西卡｜Changeling]]
	- [[星之眼｜aliEn T]]
	- [[远旅｜Voyager]]
- **人类｜Human**
	- [[爱兹拉｜Ezra Theodore]]
- **神秘学家｜Arcanists**
	- [[6｜Six]]
	- [[37｜Thirty-seven]]
	- [[阿夫西维｜Авксивий]]
	- [[埃里克｜Erick]]
	- [[爱宠｜Rabies]]
	- [[芭妮芭妮｜Bunny Bunny]]
	- [[百夫长｜Centurion]]
	- [[柏林以东｜Bkornblume]]
	- [[北方哨歌｜Windsong]]
	- [[贝蒂｜Bette]]
	- [[吵闹鬼｜Poltergeist]]
	- [[哒哒达利｜Darley Clatter]]
	- [[冬｜зима]]
	- [[讣告人｜Necrologist]]
	- [[葛天｜GeTian]]
	- [[和平乌鲁｜Ulu]]
	- [[红斗篷｜Mondlicht]]
	- [[红弩箭｜Lilya]]
	- [[槲寄生｜Druvis III]]
	- [[伽菈波那｜Black Dwarf]]
	- [[金蜜儿｜Blonney]]
	- [[喀嚓喀嚓｜Click]]
	- [[坎吉拉｜Kanjira]]
	- [[可燃点｜Spathodea]]
	- [[恐怖通｜Horropedia]]
	- [[拉拉泉｜La Source]]
	- [[丽莎&路易斯｜Twins Sleep]]
	- [[莉拉妮｜Leilani]]
	- [[罗蕾莱｜Lorelei]]
	- [[马库斯｜Marcus]]
	- [[玛蒂尔达｜Matilda Bouanich]]
	- [[玛丽莲｜Sweet heart]]
	- [[梅兰妮｜Melania]]
	- [[莫桑女士｜Moissan]]
	- [[尼克·波顿｜Nick Bottom]]
	- [[泥鯭的士｜An-an Lee]]
	- [[帕米埃｜Dikke]]
	- [[皮克勒斯｜Pickles]]
	- [[气球派对｜Balloon Party]]
	- [[铅玻璃｜Cristallo]]
	- [[沙丝绒｜Desert Flannel]]
	- [[十四行诗｜Sonetto]]
	- [[斯奈德｜Schneider]]
	- [[苏芙比｜Sotheby]]
	- [[坦南特｜Tennant]]
	- [[兔毛手袋｜Medicine Pocket]]
	- [[挖掘艺术｜Diggers]]
	- [[维拉｜Вила]]
	- [[未锈铠｜A Knight]]
	- [[温妮弗雷德｜Eternity]]
	- [[雾行者｜Oliver Fog]]
	- [[夏利｜Charlie]]
	- [[小春雀儿｜Eagle]]
	- [[小梅斯梅尔｜Mesmer Jr.]]
	- [[小叶尼塞｜Yenisei]]
	- [[新巴别塔｜Ms. NewBabel]]
	- [[星锑｜Regulus]]
	- [[牙仙｜Tooth Fairy]]
	- [[洋葱头｜ONiON]]
	- [[伊索尔德｜Isolde]]
	- [[婴儿蓝｜Baby Blue]]
	- [[约翰·提托｜John Titor]]
	- [[鬃毛沙砾｜Shamane]]
	- [[TTT｜TTT]]
	- [[X｜X]]
- **神秘学家感染种｜Infected**
	- [[塞梅尔维斯｜Semmelweis]]
- **神秘学家混血种｜Mixed**
	- [[狼群｜Pavia]]
	- [[曲娘｜Jiu Niangzi]]
	- [[五色月｜Satsuki]]
- [[维尔汀｜Vertin]]
- **意识唤醒者｜Awakened**
	- [[露西｜Lucy]]
	- [[斯普特尼克｜Sputnik]]
	- [[APPLe｜APPLe]]

%% End Waypoint %%