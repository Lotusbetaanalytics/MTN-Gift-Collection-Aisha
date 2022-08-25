import * as React from 'react';
import { useEffect } from 'react';
import './modal.scss';
var Modal = function (_a) {
    var _b = _a.isVisible, isVisible = _b === void 0 ? false : _b, title = _a.title, content = _a.content, footer = _a.footer, onClose = _a.onClose, _c = _a.size, size = _c === void 0 ? "md" : _c;
    var keydownHandler = function (_a) {
        var key = _a.key;
        switch (key) {
            case 'Escape':
                onClose();
                break;
            default:
        }
    };
    useEffect(function () {
        document.addEventListener('keydown', keydownHandler);
        return function () { return document.removeEventListener('keydown', keydownHandler); };
    });
    return !isVisible ? null : (React.createElement("div", { className: "modal", onClick: onClose },
        React.createElement("div", { className: "modal-dialog " + size, onClick: function (e) { return e.stopPropagation(); } },
            React.createElement("div", { className: "modal-header" },
                React.createElement("h3", { className: "modal-title" }, title),
                React.createElement("span", { className: "modal-close", onClick: onClose }, "\u00D7")),
            React.createElement("div", { className: "modal-body" },
                React.createElement("div", { className: "modal-content" }, content)),
            footer && React.createElement("div", { className: "modal-footer" }, footer))));
};
export default Modal;
//# sourceMappingURL=index.js.map