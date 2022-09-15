import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client"
import { converHourStringToMinutes } from "./utils/conver-hour-string-to-minute-string";
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hours";


const app = express();
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ['query']
});

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })
  return res.json(games)
})

app.get('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;

  const ads = await prisma.ad.findMany({
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
  })

  return res.json(ads.map((ad) => ({
    ...ad,
    weekDays: ad.weekDays.split(','),
    hourStart: convertMinutesToHourString(ad.hourStart),
    hourEnd: convertMinutesToHourString(ad.hourEnd)
  })))
})

app.get('/ads/:id/discord', async (req, res) => {
  const adId = req.params.id;

  const ad = await prisma.ad.findFirstOrThrow({
    select: { discord: true, },
    where: {
      id: adId,
    }
  })

  return res.json({
    discord: ad.discord,
  })
})

app.post('/games/:id/ads', async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: converHourStringToMinutes(body.hourStart),
      hourEnd: converHourStringToMinutes(body.hourEnd),
      useVoiceChanlel: body.useVoiceChanlel,
    }
  })
  return res.json(ad)
})

app.listen(3333, () => {
  console.log(`Server started on 3333`);
});
