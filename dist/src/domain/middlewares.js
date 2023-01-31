"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secured = exports.adminRequired = void 0;
const express_jwt_1 = require("express-jwt");
const adminRequired = (req, res, next) => {
    if (req.auth.role === "ADMIN") {
        next();
    }
    else {
        res.status(403).send({ message: "You don't have permissions to access this resource" });
    }
};
exports.adminRequired = adminRequired;
const secured = () => {
    var _a;
    return (0, express_jwt_1.expressjwt)({
        secret: (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "development",
        algorithms: ["HS256"]
    });
};
exports.secured = secured;
//# sourceMappingURL=middlewares.js.map