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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
function UserRouter(createUserUseCase, getUserByIdUseCase) {
    const router = express_1.default.Router();
    router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield createUserUseCase.execute(req.body);
            res.statusCode = 201;
            res.json(user);
        }
        catch (err) {
            res.status(500).send({ message: "Error saving data" });
        }
    }));
    router.get('/me', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const user = yield getUserByIdUseCase.execute(Number(req.auth.id));
            res.statusCode = !user ? 404 : 200;
            res.json(!user ? { message: "User not found" } : {
                role: user.role,
                name: user.name,
                email: user.email,
                id: user.id
            });
        }
        catch (err) {
            res.status(404).send({ message: "User not found me" });
        }
    }));
    router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield getUserByIdUseCase.execute(Number(req.params.id));
            res.statusCode = !user ? 404 : 200;
            res.json(!user ? { message: "User not found" } : user);
        }
        catch (err) {
            res.status(404).send({ message: "User not found" });
        }
    }));
    return router;
}
exports.default = UserRouter;
;
//# sourceMappingURL=user-router.js.map