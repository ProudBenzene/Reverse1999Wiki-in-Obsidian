var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// src/main.ts
__markAsModule(exports);
__export(exports, {
  default: () => main_default
});
var import_obsidian = __toModule(require("obsidian"));
var CodeTab = class extends import_obsidian.Plugin {
  async onload() {
    this.registerMarkdownCodeBlockProcessor("tab", (source, element, context) => {
      element.className = "tab-container";
      let tabsTag = document.createElement("div");
      tabsTag.className = "tabs";
      let contentsTag = document.createElement("div");
      contentsTag.className = "tab-contents";
      element.appendChild(tabsTag);
      element.appendChild(contentsTag);
      let codeTagText = source;
      let codeTagTextArray = codeTagText.split("tab:");
      for (let i = 1; i < codeTagTextArray.length; i++) {
        let language = codeTagTextArray[i].substring(0, codeTagTextArray[i].indexOf("\n"));
        let tabItemTag = document.createElement("div");
        tabItemTag.className = "tab-item";
        tabItemTag.innerHTML = language;
        if (i === 1)
          tabItemTag.addClass("tab-item--active");
        tabItemTag.onclick = (e) => handler(e);
        tabsTag.appendChild(tabItemTag);
        let codeText = codeTagTextArray[i].substring(codeTagTextArray[i].indexOf("\n") + 1);
        let tabContentTag = document.createElement("div");
        tabContentTag.className = "tab-content";
        import_obsidian.MarkdownRenderer.renderMarkdown(codeText, tabContentTag, context.sourcePath);
        if (i === 1)
          tabContentTag.addClass("tab-content--active");
        contentsTag.appendChild(tabContentTag);
      }
      let tabItemTags = element.getElementsByClassName("tab-item");
      let tabContentTags = element.getElementsByClassName("tab-content");
      const handler = (e) => {
        for (let i = 0; i < tabItemTags.length; i++) {
          if (tabItemTags[i] === e.srcElement) {
            tabItemTags[i].classList.add("tab-item--active");
            tabContentTags[i].classList.add("tab-content--active");
          } else {
            tabItemTags[i].classList.remove("tab-item--active");
            tabContentTags[i].classList.remove("tab-content--active");
          }
        }
      };
    });
  }
};
var main_default = CodeTab;
