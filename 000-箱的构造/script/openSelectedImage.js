// openSelectedImage.js by ProudBenzene
const { exec } = require('child_process');
const path = require("path");

// 获取笔记的基本路径
const filePath = app.workspace.getActiveFile().path;
const fileFullPath = app.vault.adapter.getFullPath(filePath)
const basePath = app.vault.adapter.getBasePath()
// 全局变量
let wikiPath1;
let wikiPath2;
let wikiPath3;
let IMPath;
let imagePath;
let imageAbPath;
// 获取选中的文本
const files = app.vault.getFiles(); // 获取库中文件
const selection = getSelection().toString(); // 将 selection 转换为字符串
console.log(selection)
// 分情况讨论（选中的是链接本身还是链接中的文件名）
let selectionEmbed;
if (selection.includes("[[") || selection.includes("]]")) { // 如果选中的是Wiki链接本身
    selectionEmbed = matchSelectionEmbed(selection);
} else { // 如果选中的是Wiki链接中的文件名
    selectionEmbed = selection;
}
console.log(selectionEmbed)
// 分情况讨论（wiki链接或是标准markdown链接）
if (!selection.includes("(")) {
    // Wiki: 获取库所有文件列表
    // 解码
    const decodedPath = decodeURIComponent(selectionEmbed); 
    // 尽可能简短的形式
    wikiPath1 = basePath + '/' + getFilePath(files, decodedPath); // 匹配Wiki链接
    console.log(wikiPath1);
    // 基于库的相对路径
    wikiPath2 = path.resolve(path.dirname(fileFullPath), decodedPath); // 根据相对路径得到绝对路径
    console.log(wikiPath2);
    // 基于库的绝对路径
    wikiPath3 = basePath + '/' + decodedPath; // 绝对路径
    console.log(wikiPath3);
} else {
    const regex1 = /\((.*?)\)/;
    const matches1 = regex1.exec(selection);
    const selectionPath1 = matches1[1]; //去掉嵌入语法后的图片路径
    console.log(selectionPath1);
    const decodedPath1 = decodeURIComponent(selectionPath1);
    console.log(decodedPath1);
    IMPath = basePath + '/' + getFilePath(files, decodedPath1); // 匹配Wiki链接basePath + '/' + getFilePath(files, decodedPath); // 匹配Wiki链接
    // 根据相对路径得到图片的绝对路径
    const regex = /\((.*?)\)/;
    const matches = regex.exec(selection);
    const selectionPath = matches[1]; //去掉嵌入语法后的图片路径
    console.log(selectionPath);
    const decodedPath = decodeURIComponent(selectionPath);
    console.log(decodedPath);
    imagePath = path.resolve(path.dirname(fileFullPath), decodedPath); // 根据相对路径得到绝对路径
    // 根据基于仓库的绝对路径得到图片的绝对路径
    const Abregex = /\((.*?)\)/;
    const Abmatches = Abregex.exec(selection);
    const selectionAbPath = Abmatches[1]; //去掉嵌入语法后的图片路径
    console.log(selectionAbPath);
    const decodedAbPath = decodeURIComponent(selectionAbPath);
    console.log(decodedAbPath);
    imageAbPath = basePath + "/" + decodedAbPath; // 绝对路径
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
	new Notice(`打开图片编辑器成功`, 5000);
};

// 使用默认应用打开文件
//Windows
/*
exec(`start "" "${imagePath}"`, (error, stdout, stderr) => { // 尝试如果将选中图片路径按相对路径处理能否打开图片
    if (error || stderr) {
        exec(`start "" "${imageAbPath}"`, (error, stdout, stderr) => { //如果不能，尝试将选中图片路径按绝对路径处理
            if (error || stderr) {
                exec(`start "" "${IMPath}"`, (error, stdout, stderr) => { //如果不能，尝试将选中图片路径按尽可能短的标准链接处理
                    if (error || stderr) {
                        exec(`start "" "${wikiPath1}"`, (error, stdout, stderr) => { //如果不能，尝试将选中图片路径按Wiki链接处理
                            if (error || stderr) {
                                exec(`start "" "${wikiPath2}"`, (error, stdout, stderr) => { //如果不能，尝试将选中图片路径按Wiki相对链接处理
                                    if (error || stderr) {
                                        exec(`start "" "${wikiPath3}"`, (error, stdout, stderr) => { //如果不能，尝试将选中图片路径按Wiki绝对路径链接处理
                                            if (stderr) {
                                                console.error(`打开文件时出错: ${stderr}`);
                                                return;
                                            }
                                            console.log(`文件已成功打开`);
                                        });
                                    }
                                    console.log(`文件已成功打开`);
                                });
                            }
                            console.log(`文件已成功打开`);
                        });
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
exec(`open  -a "Adobe Photoshop 2024" "${imagePath}"`, (error, stdout, stderr) => { // 尝试如果将选中图片路径按相对路径处理能否打开图片
    if (error || stderr) {
        exec(`open  -a "Adobe Photoshop 2022" "${imageAbPath}"`, (error, stdout, stderr) => { //如果不能，尝试将选中图片路径按绝对路径处理
            if (error || stderr) {
                exec(`open  -a "Adobe Photoshop 2022" "${IMPath}"`, (error, stdout, stderr) => { //如果不能，尝试将选中图片路径按尽可能短的标准链接处理
                    if (error || stderr) {
                        exec(`open  -a "Adobe Photoshop 2022" "${wikiPath1}"`, (error, stdout, stderr) => { //如果不能，尝试将选中图片路径按Wiki链接处理
                            if (error || stderr) {
                                exec(`open  -a "Adobe Photoshop 2022" "${wikiPath2}"`, (error, stdout, stderr) => { //如果不能，尝试将选中图片路径按Wiki相对链接处理
                                    if (error || stderr) {
                                        exec(`open  -a "Adobe Photoshop 2022" "${wikiPath3}"`, (error, stdout, stderr) => { //如果不能，尝试将选中图片路径按Wiki绝对路径链接处理
                                            if (stderr) {
                                                console.error(`打开文件时出错: ${stderr}`);
                                                return;
                                            }
                                            console.log(`文件已成功打开`);
                                        });
                                    }
                                    console.log(`文件已成功打开`);
                                });
                            }
                            console.log(`文件已成功打开`);
                        });
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
