# Youtube-to-BPM

#### Requirements ####
Node >= 12\
Yarn\
ffmpeg\
MongoDB

#### Instructions ####
1) Edit the .env files according to your needs
    (development.env, production.env)
2) Dev: `yarn install && yarn start:dev`
3) Prod `yarn install && yarn build && yarn:prod`

#### Usage ####
***POST*** - /api/video\
`id<string>: the id of a youtube video.`

#### Behaviour ####
The app will first check if this given ID was already processed in the past, if so it will reutrn the BPM right away, based on the value stored on the DB, otherwise it will:
1) Download the video
2) Stream it to AudioContextApi as a buffer
3) Pass this buffer to music-tempo
4) Get the bpm
5) save on the DB
6) Return the entity with the bpm
7) Deletes the .mp3 used to yield the stream
