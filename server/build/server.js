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
const client_1 = require("@prisma/client");
const conver_hour_string_to_minute_1 = require("./utils/conver-hour-string-to-minute");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient({
    log: ['query']
});
app.get('/games', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });
    return res.json(games);
}));
app.get('/games/:id/ads', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = req.params.id;
    const ads = yield prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChanlel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return res.json(ads.map((ad) => (Object.assign(Object.assign({}, ad), { weekDays: ad.weekDays.split(',') }))));
}));
app.get('/ads/:id/discord', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adId = req.params.id;
    const ad = yield prisma.ad.findFirstOrThrow({
        select: { discord: true, },
        where: {
            id: adId,
        }
    });
    return res.json({
        discord: ad.discord,
    });
}));
app.post('/games/:id/ads', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = req.params.id;
    const body = req.body;
    const ad = yield prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: (0, conver_hour_string_to_minute_1.converHourStringToMinutes)(body.hourStart),
            hourEnd: (0, conver_hour_string_to_minute_1.converHourStringToMinutes)(body.hourEnd),
            useVoiceChanlel: body.useVoiceChanlel,
        }
    });
    return res.json(ad);
}));
app.listen(3333, () => {
    console.log(`Server started on 3333`);
});
