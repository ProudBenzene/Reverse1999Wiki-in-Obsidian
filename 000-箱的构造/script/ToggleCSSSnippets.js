module.exports = async (params) => {
    const snippetName = "Mac主题代码框";
    const snippetPath = app.customCss.getSnippetPath(snippetName);
    if (!snippetPath) {
        new Notice(`Snippet ${snippetName} not found`);
    }

    const isSnippetsEnabled = app.customCss.enabledSnippets.has(snippetName)
        ? true
        : false;

    if (isSnippetsEnabled) {
        app.customCss.setCssEnabledStatus(snippetName, false);
        app.customCss.requestLoadSnippets();
    } else {
        console.log("fwefwef");
        app.customCss.setCssEnabledStatus(snippetName, true);
        app.customCss.requestLoadSnippets();
    }
};