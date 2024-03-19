const { exec } = require('child_process');
const path = require("path");

// 获取笔记的基本路径
const filePath = app.workspace.getActiveFile().path;
const fileFullPath = app.vault.adapter.getFullPath(filePath)
const basePath = app.vault.adapter.getBasePath()
// 全局变量
let wikiName;
let imageName;
let imageAbName;
// 获取选中的文本
const files = app.vault.getFiles(); // 获取库中文件
const selection = getSelection().toString(); // 将 selection 转换为字符串
console.log(selection)
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
    const wikiPath = basePath + '/' + getFilePath(files, selectionEmbed); // 匹配Wiki链接
    console.log(wikiPath);
	const regex = /\/([^\/]*)\./;
	const decodedSelection = decodeURIComponent(wikiPath);
	const matches = regex.exec(decodedSelection);
	wikiName = matches[1];
} else {
    // 根据相对路径得到图片的绝对路径
    const regex1 = /\((.*?)\)/;
    const matches1 = regex1.exec(selection);
    const selectionPath = matches1[1]; //去掉嵌入语法后的图片路径
    console.log(selectionPath);
    const regex2 = /\/([^\/]*)\./;
	const decodedSelection = decodeURIComponent(selectionPath);
	const matches2 = regex2.exec(decodedSelection);
	imageName = matches2[1];
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

let QuickAdd;
module.exports = async function openSelectedImage(params) {
	QuickAdd = params;
	new Notice(`题注自动生成完毕`, 5000);
};

// 使用默认应用打开文件
//Windows
/*
exec(`start "" "${imageName}"`, (error, stdout, stderr) => {
    if (error || stderr) {
        exec(`start "" "${imageAbName}"`, (error, stdout, stderr) => { //如果不能，尝试将选中图片路径按绝对路径处理
            if (error || stderr) {
                exec(`start "" "${wikiName}"`, (error, stdout, stderr) => { //如果不能，尝试将选中图片路径按Wiki链接处理
                    if (error) {
                        console.error(`打开文件时出错: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.error(`打开文件时出错: ${stderr}`);
                        return;
                    }
                    console.log(`文件已成功打开`);
                });
            }
            console.log(`文件已成功打开`);
        });
    } else {
        console.log(`文件已成功打开`);
    }
});
*/
//macOS
exec(`open  -a "Adobe Photoshop 2022" "${imageName}"`, (error, stdout, stderr) => { // 尝试如果将选中图片路径按相对路径处理能否打开图片
    if (error || stderr) {
        exec(`open  -a "Adobe Photoshop 2022" "${imageAbName}"`, (error, stdout, stderr) => { //如果不能，尝试将选中图片路径按绝对路径处理
            if (error || stderr) {
                exec(`open  -a "Adobe Photoshop 2022" "${wikiName}"`, (error, stdout, stderr) => { //如果不能，尝试将选中图片路径按Wiki链接处理
                    if (error) {
                        console.error(`打开文件时出错: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.error(`打开文件时出错: ${stderr}`);
                        return;
                    }
                    console.log(`文件已成功打开`);
                });
            }
            console.log(`文件已成功打开`);
        });
    } else {
        console.log(`文件已成功打开`);
    }
});