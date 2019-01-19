var mic, recorder, soundFile;

var state = 0; 

function setup() {
  createCanvas(400,400);
  background(200);
  fill(0);
  text('Enable mic and click the mouse to begin recording', 20, 20);

  // create an audio in
  mic = new p5.AudioIn();

  // users must manually enable their browser microphone for recording to work properly!
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();
}

function mousePressed() {
  // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
  if (state === 0 && mic.enabled) {

    // Tell recorder to record to a p5.SoundFile which we will use for playback
    recorder.record(soundFile);

    background(255,0,0);
    text('Recording now! Click to stop.', 20, 20);
    console.log('start recording')
    state++;
  }

  else if (state === 1) {
    recorder.stop(); // stop recorder, and send the result to soundFile
    console.log('stop recording')
    background(0,255,0);
    text('Recording stopped. Click to play & save', 20, 20);
    state++;
  }

  else if (state === 2) {
    let soundBlob = soundFile.getBlob();
    console.log(soundBlob)
     let formdata = new FormData() ; //create a from to of data to upload to the server
      formdata.append('soundBlob', soundBlob,  'myfiletosave.wav') ; 
      console.log(formdata)
    soundFile.play(); // play the result!
    saveSound(soundFile, 'mySound.wav'); // save file
    console.log(soundFile.saveBlob)
    state++;
  }
}
