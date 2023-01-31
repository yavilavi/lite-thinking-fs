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
exports.GetUserById = void 0;
const user_entity_1 = require("../../entities/user.entity");
class GetUserById {
    constructor(dataSource) {
        this.userRepository = dataSource.getRepository(user_entity_1.User);
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findOne({ where: { id: userId } });
        });
    }
}
exports.GetUserById = GetUserById;
//# sourceMappingURL=get-user-by-id.js.map