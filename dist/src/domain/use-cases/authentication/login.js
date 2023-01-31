"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const user_entity_1 = require("../../entities/user.entity");
const utils_1 = require("../../../utils");
const jwt = require('jsonwebtoken');
class Login {
    constructor(dataSource) {
        this.userRepository = dataSource.getRepository(user_entity_1.User);
    }
    execute(email, password) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { email } });
            if (user) {
                if (yield (0, utils_1.verifyHash)(password, user.password)) {
                    const { name, email, id, role } = user;
                    return {
                        accessToken: jwt.sign({ name, email, id, role }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "development", { expiresIn: "90d" }),
                        user: { name, email, id, role },
                        authenticated: true
                    };
                }
            }
            return { authenticated: false };
        });
    }
}
exports.Login = Login;
//# sourceMappingURL=login.js.map