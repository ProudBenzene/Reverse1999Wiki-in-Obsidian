const { exec } = require('child_process');
const path = require("path");

// 获取笔记的基本路径
const filePath = app.workspace.getActiveFile().path;
const fileFullPath = app.vault.adapter.getFullPath(filePath);
const basePath = (app.vault.adapter).getBasePath()
const fileName = path.parse(filePath).name;
let folderPath = '';
if (typeof filePath === 'string') {
    folderPath = filePath.substring(0, filePath.lastIndexOf('/'));
}
const assetsPath = folderPath + "/assets/" + fileName + ".assets";
console.log(fileFullPath);

// 调用QuickAdd
let QuickAdd;
module.exports = async function openExternalEditors(params) {
    QuickAdd = params;
    let editors = ['默认应用', 'VSCode', 'Sublime Text', '打开附件文件夹', '打开文件夹'];
    // 输入界面
    let inputText = await QuickAdd.quickAddApi.suggester(editors, editors);

    // 选择判断
    if (inputText === '默认应用') {
        // 使用默认应用程序打开文件
        app.openWithDefaultApp(filePath);
    } else if (inputText === '打开文件夹') {
        // 使用打开当前笔记文件夹
        app.showInFolder(filePath);
    } else if (inputText === '打开附件文件夹') {
        // 使用打开当前笔记文件夹
        app.showInFolder(assetsPath);
    } else if (inputText === 'VSCode') {
        // 使用 VSCode 打开文件
        const editorPath = "/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code"; // 替换为你的 VS Code 安装路径
        exec(`"${editorPath}" -n "${basePath}"`);
        setTimeout(() => {
            exec(`"${editorPath}" "${fileFullPath}"`);
        }, 1000); // 等待 1 秒
    } else if (inputText === 'Sublime Text') {
        const editorPath = "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl"; // 替换为你的 Cursor 安装路径
        // 使用 Sublime Text 打开文件
        exec(`"${editorPath}" -n "${basePath}"`);
        setTimeout(() => {
            exec(`"${editorPath}" "${fileFullPath}"`);
        }, 1000); // 等待 2 秒
    }
};