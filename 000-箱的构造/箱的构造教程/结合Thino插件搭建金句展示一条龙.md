# 金句展示

## 搭建效果

```dataviewjs
let files = dv.pages('"000-箱的构造/箱中memos" and #金句').file;
if (files.length === 0) {
  dv.paragraph("没有找到任何文件");
} else {
  let randomFile = files[Math.floor(Math.random() * files.length)];
  let fileContent = await app.vault.readRaw(dv.page(randomFile.path).file.path)
  let lines = fileContent.split('\n');
  if (lines.length < 10) {
    dv.paragraph("选中的文件没有足够的行");
  } else {
    let line1 = lines[9];
    if (line1.startsWith("#金句")) {
      let sentence = "——" + line1.substring(4);
      dv.span("<center>" + sentence + "</center>");
    }
  }
}
```

## 需求阐述

在《重返未来：1999》中，有许多令人印象深刻的台词。它们或深刻、或押韵、或