'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const reKey = /\[\^(.+?(?=\]))\]/gi;
const reDefinition = /\[\^(.+)\]\:/;
// https://stackoverflow.com/a/1830844
function isNumeric(value) {
    return !isNaN(value - parseFloat(value));
}
function tidyFootnotes(editor) {
    let markers = [];
    let definitions = new Map();
    let firstDefinitionLine = -1;
    let definitionsIndexed = new Map();
    // Iterate through each line
    const lineCount = editor.lineCount();
    let prevKey = '';
    for (let i = 0; i < lineCount; i++) {
        const line = editor.getLine(i);
        let isDefinition = false;
        let match;
        if (prevKey.length) {
            const hasIndent = /^[ \t]/.test(line);
            const isLastLine = i === (lineCount - 1);
            if (hasIndent || (line.length === 0 && !isLastLine)) {
                // Append line to the previous footnote definition
                const value = definitions.get(prevKey);
                definitions.set(prevKey, value + "\n" + line);
                markers[markers.length - 1].length++;
                continue;
            }
            else {
                prevKey = '';
            }
        }
        // Look for footnote definition
        while ((match = reDefinition.exec(line)) !== null) {
            if (match.length < 1)
                return;
            isDefinition = true;
            // Remember definition and where it is
            let key = match[1];
            let value = line.substring(match[0].length);
            definitions.set(key, value);
            prevKey = key;
            let marker = {
                key,
                line: i,
                index: 0,
                length: 0,
                isDefinition: true
            };
            markers.push(marker);
            // Remember first definition line to insert combined list later
            if (firstDefinitionLine === -1) {
                firstDefinitionLine = i;
            }
            break;
        }
        if (isDefinition)
            continue;
        // Look for footnote key
        while ((match = reKey.exec(line)) !== null) {
            if (match.length < 1)
                return;
            // Remember where footnote key is
            let key = match[1];
            let marker = {
                key,
                line: i,
                index: match.index,
                length: match[0].length,
                isDefinition: false
            };
            markers.push(marker);
            if (!definitionsIndexed.has(key)) {
                // Add key into index
                definitionsIndexed.set(key, {
                    key,
                    newKey: key,
                    isNumber: isNumeric(key),
                    value: ''
                });
            }
        }
    }
    // Assign definition to key in index
    // If definition has no key, it will be appended with its current key
    definitions.forEach((value, key) => {
        definitionsIndexed.set(key, {
            key,
            newKey: key,
            isNumber: isNumeric(key),
            value
        });
    });
    // Re-index numbers and construct combined definitions output
    let count = 1;
    let definitionsStr = '';
    definitionsIndexed.forEach((definition, marker) => {
        let key = definition.key;
        if (definition.isNumber) {
            const current = definitionsIndexed.get(marker);
            key = count.toString();
            definitionsIndexed.set(marker, Object.assign(Object.assign({}, current), { newKey: key }));
            count++;
        }
        definitionsStr += `[^${key}]:${definition.value}\n`;
    });
    const markersCount = markers.length;
    for (let i = markersCount - 1; i >= 0; i--) {
        const marker = markers[i];
        const markerLine = marker.line;
        if (marker.isDefinition) {
            let rangeStart, rangeEnd;
            const lineEnd = markerLine + 1 + marker.length;
            if (lineEnd === editor.lineCount()) {
                // Replace from previous to current line to fix CodeMirror 6 error
                rangeStart = { line: markerLine, ch: 0 };
                rangeEnd = { line: lineEnd - 1, ch: Infinity };
            }
            else {
                // Replace from current to next line
                rangeStart = { line: markerLine, ch: 0 };
                rangeEnd = { line: lineEnd, ch: 0 };
            }
            if (markerLine === firstDefinitionLine) {
                // Replace first definition line with list of indexed definitions
                editor.replaceRange(definitionsStr, rangeStart, rangeEnd);
                continue;
            }
            // Remove line(s)
            editor.replaceRange('', rangeStart, rangeEnd);
            continue;
        }
        // Check if key has changed
        const definition = definitionsIndexed.get(marker.key);
        const newKey = definition.newKey;
        if (marker.key === newKey)
            continue;
        // Replace footnote key in line with the new one
        const line = editor.getLine(markerLine);
        const prefix = line.substring(0, marker.index);
        const newMarker = `[^${newKey}]`;
        const suffix = line.substr(marker.index + marker.length);
        const newLine = prefix + newMarker + suffix;
        editor.replaceRange(newLine, { line: markerLine, ch: 0 }, { line: markerLine, ch: Infinity });
    }
    if (firstDefinitionLine == -1) {
        // If there are no definitions, add definitions list at the end
        const lineCount = editor.lineCount();
        editor.replaceRange("\n\n" + definitionsStr, { line: lineCount, ch: 0 }, { line: lineCount, ch: Infinity });
    }
    // console.log(markers, definitions, definitionsIndexed, definitionsStr);
}

class TidyFootnotes extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addCommand({
                id: 'tidy-footnotes',
                name: 'Tidy Footnotes',
                checkCallback: (checking) => {
                    // Ensure the active view is a Markdown editor
                    const view = this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                    if (checking)
                        return !!view;
                    if (!view || view.sourceMode == undefined)
                        return false;
                    let editor = view.editor;
                    tidyFootnotes(editor);
                }
            });
        });
    }
}

module.exports = TidyFootnotes;
