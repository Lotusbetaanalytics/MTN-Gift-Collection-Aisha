import * as React from "react";
import styles from "./card.module.scss";
var Card = function (_a) {
    var header = _a.header, children = _a.children;
    return (React.createElement("div", { className: styles.card__container },
        React.createElement("h1", null, header),
        children));
};
export default Card;
//# sourceMappingURL=index.js.map