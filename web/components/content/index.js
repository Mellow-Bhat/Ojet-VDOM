var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "preact/jsx-runtime", "preact/hooks", "../product-card", "../../services/fakestore"], function (require, exports, jsx_runtime_1, hooks_1, product_card_1, fakestore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Content = Content;
    function Content() {
        const [products, setProducts] = (0, hooks_1.useState)([]);
        const [loading, setLoading] = (0, hooks_1.useState)(true);
        const [error, setError] = (0, hooks_1.useState)(null);
        const [cartById, setCartById] = (0, hooks_1.useState)({});
        const cartCount = (0, hooks_1.useMemo)(() => Object.values(cartById).reduce((sum, qty) => sum + qty, 0), [cartById]);
        (0, hooks_1.useEffect)(() => {
            const controller = new AbortController();
            (() => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    setLoading(true);
                    setError(null);
                    const data = yield (0, fakestore_1.fetchProducts)(controller.signal);
                    setProducts(data);
                }
                catch (e) {
                    if ((e === null || e === void 0 ? void 0 : e.name) !== "AbortError") {
                        setError((_a = e === null || e === void 0 ? void 0 : e.message) !== null && _a !== void 0 ? _a : "Failed to load products");
                    }
                }
                finally {
                    setLoading(false);
                }
            }))();
            return () => controller.abort();
        }, []);
        function handleAddToCart(p) {
            setCartById((prev) => { var _a; return (Object.assign(Object.assign({}, prev), { [p.id]: ((_a = prev[p.id]) !== null && _a !== void 0 ? _a : 0) + 1 })); });
        }
        return ((0, jsx_runtime_1.jsxs)("div", { class: "oj-web-applayout-max-width oj-web-applayout-content", children: [(0, jsx_runtime_1.jsxs)("div", { class: "ecom-header oj-flex oj-sm-align-items-center oj-sm-justify-content-space-between oj-sm-padding-4x", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { class: "oj-typography-heading-sm", children: "Fake Store" }), (0, jsx_runtime_1.jsx)("div", { class: "oj-typography-body-sm", children: "Products loaded from fakestoreapi.com" })] }), (0, jsx_runtime_1.jsxs)("div", { class: "ecom-cart-pill oj-typography-body-sm", title: "Cart item count", children: ["Cart: ", (0, jsx_runtime_1.jsx)("span", { class: "ecom-cart-count", children: cartCount })] })] }), loading && (0, jsx_runtime_1.jsx)("div", { class: "oj-sm-padding-4x", children: "Loading products\u2026" }), error && ((0, jsx_runtime_1.jsxs)("div", { class: "oj-sm-padding-4x", children: [(0, jsx_runtime_1.jsx)("div", { class: "oj-typography-heading-xs", children: "Could not load products" }), (0, jsx_runtime_1.jsx)("div", { class: "oj-typography-body-sm ecom-error", children: error })] })), !loading && !error && ((0, jsx_runtime_1.jsx)("section", { class: "ecom-grid", "aria-label": "Product list", children: products.map((p) => ((0, jsx_runtime_1.jsx)(product_card_1.ProductCard, { product: p, onAddToCart: handleAddToCart }, p.id))) }))] }));
    }
    ;
});
