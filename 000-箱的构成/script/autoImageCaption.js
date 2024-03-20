let editor;
let activeLeaf = this.app.workspace.activeLeaf;
if (activeLeaf.view.getViewType() === 'markdown') {
	editor = activeLeaf.view.sourceMode.cmEditor;
}
// 现在你可以在这个作用域内使用editor对象了
const { exec } = require('child_process');
const path = require("path");

let QuickAdd;
module.exports = async function autoImageCaptions(params) {
	QuickAdd = params;
	new Notice(`题注自动生成完毕`, 5000);
};

// 获取笔记的基本路径
const basePath = app.vault.adapter.getBasePath()

// 获取选中的文本
const editors = app.workspace.activeLeaf.view.sourceMode.cmEditor;
const files = app.vault.getFiles(); // 获取库中文件
const selection = editors.getSelection();
console.log(selection);
// 分情况讨论（选中的是链接本身还是链接中的文件名）
let selectionEmbed;
if (selection.includes("[[")) { // 如果选中的是Wiki链接本身
    selectionEmbed = matchSelectionEmbed(selection);
} else { // 如果选中的是Wiki链接中的文件名
    selectionEmbed = selection;
}
console.log(selectionEmbed)
// 分情况讨论（wiki链接或是标准markdown链接）
if (!selection.includes("(")) {
    // Wiki: 获取库所有文件列表
    const wikiPath = getFilePath(files, selectionEmbed); // 匹配Wiki链接
    console.log(wikiPath);
	const regex = /\/([^\/]*?)\./g;
	const decodedSelection = decodeURIComponent(wikiPath);
	const matches = regex.exec(decodedSelection);
	let wikiName = '';
	if(matches) {
		wikiName = matches[1];
	}
	console.log(wikiName)
	// 用wikiName替换[]中的内容
	const newSelection = selection.replace(/\]\]/, `|${wikiName}]]`);
	editor.replaceSelection(newSelection);

} else {
    // 通过正则依次获取图片路径、图片名称并将其解码为文本
    const regex1 = /\((.*?)\)/;
    const matches1 = regex1.exec(selection);
    const selectionPath = matches1[1]; //去掉嵌入语法后的图片路径
    console.log(selectionPath);
	const regex = /.*\/(.*?)\./;
	const decodedSelection = decodeURIComponent(selectionPath);
	const matches2 = regex.exec(decodedSelection);
	let imageName = '';
	if (matches2 && matches2[1]) {
		imageName = matches2[1] + "|inlL|300";
	}
	console.log(imageName);
	// 用imageName替换[]中的内容
	const newSelection = selection.replace(/\[.*?\]/, `[${imageName}]`);
	editor.replaceSelection(newSelection);

}

// 获取Wiki路径
function getFilePath(files, link) {
    let files2 = files.filter(f => path.basename(f.path).endsWith(link.replace(/\[\[/, "").replace(/\|.*]]/, "").replace(/\]\]/, "")));
    let filePath = files2.map((f) => f.path)[0];
    console.log(filePath);
    return filePath;
}

function matchSelectionEmbed(text) {
    const regex = /(\[\[.*\]\])/;
    const matches = text.match(regex);
    return matches ? matches[1] : "";
}

