// @ts-ignore
import MusicTempo from 'music-tempo';

export const calcTempo = (buffer: AudioBuffer) => {
  let audioData = buffer.getChannelData(0);

  if (buffer.numberOfChannels === 2) {
    const channel1Data = buffer.getChannelData(0);
    const channel2Data = buffer.getChannelData(1);
    const { length } = channel1Data;

    for (let i = 0; i < length; i++) {
      audioData[i] = (channel1Data[i] + channel2Data[i]) / 2;
    }
  }
  return new MusicTempo(audioData);
};