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
const middlewares_1 = require("../../domain/middlewares");
function ItemRouter(upsertItemUseCase, getAllItemsUseCase, generateStockPDFUseCase) {
    const router = express_1.default.Router();
    router.post('/', middlewares_1.adminRequired, (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const item = yield upsertItemUseCase.execute(req.body);
            res.statusCode = 201;
            res.json(item);
        }
        catch (err) {
            res.status(500).send({ message: "Error saving data" });
        }
    }));
    router.get('/getAll', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield getAllItemsUseCase.execute();
            res.statusCode = 200;
            res.json(items);
        }
        catch (err) {
            res.status(404).send({ message: "Item not found" });
        }
    }));
    router.post('/generatePDFAndSendEmail', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const doc = yield generateStockPDFUseCase.execute(req.body.recipientEmail);
            res.statusCode = 200;
            res.json(doc);
        }
        catch (err) {
            console.log(err);
            // @ts-ignore
            res.status(500).send({ message: err.messge || "error uploading pdf to s3" });
        }
    }));
    return router;
}
exports.default = ItemRouter;
;
//# sourceMappingURL=item-router.js.map