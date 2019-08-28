"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getNodeText(ele) {
    return ele.children
        .map(item => item.data)
        .join('')
        .trim();
}
exports.getNodeText = getNodeText;
//# sourceMappingURL=util.js.map