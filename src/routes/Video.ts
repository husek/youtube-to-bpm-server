import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED } from 'http-status-codes';
import { paramMissingError, saveResults } from '@shared/constants';
import YoutubeMp3Downloader from 'youtube-mp3-downloader';
import { calcTempo } from '@shared/functions';
import fs from 'fs';
import Video from '../models/Video';

// @ts-ignore
import { AudioContext } from 'web-audio-api';

const router = Router();

const YD = new YoutubeMp3Downloader({
  'ffmpegPath': process.env.FFMPEG_PATH,
  'outputPath': `${__dirname}/_temp`,
  'youtubeVideoQuality': 'highest',
  'queueParallelism': 2,
  'progressTimeout': 30000
});


router.post('/', async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError
    });
  }

  if (saveResults) {
    const existingVideo = await Video.findOne({ videoId: id });

    if (existingVideo) {
      return res.status(CREATED).send(existingVideo).end();
    }
  }

  YD.download(id, `${id}.mp3`);

  YD.on('finished', async (err, data) => {
    const context = new AudioContext();
    context.decodeAudioData(fs.readFileSync(`${__dirname}/_temp/${id}.mp3`), async (buffer: AudioBuffer) => {
      const { tempo: bpm } = calcTempo(buffer);

      fs.unlink(`${__dirname}/_temp/${id}.mp3`, err => {
        if (err) console.error(err);
      });

      if (saveResults) {
        const newVideo = await Video.create({ bpm, videoId: id });
        res.status(CREATED).send(newVideo).end();
      } else {
        res.status(CREATED).send({ bpm, videoId: id }).end();
      }

    });
  });

  YD.on('error', (error) => {
    console.error(error);
    return res.status(BAD_REQUEST).send({ error }).end();
  });

});


export default router;
