import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Card({ image, title = "Ecommerce" }) {
    return (_jsxs("div", { className: "card", children: [_jsx("img", { src: image, alt: title, className: "card-image" }), _jsx("h2", { className: "card-title", children: title })] }));
}
//# sourceMappingURL=card.js.map