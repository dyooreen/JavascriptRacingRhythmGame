let song;
let amp;
let button;
let volhistory = [];
let cameraX = 0;
let cameraY = 0;
let cameraZ = 0;
let car;
let enemies = []
let vinils = []
function preload() {
  song = loadSound("assets/tecno.mp3");
}

function setup() {
  createCanvas(500, 500, WEBGL);
  angleMode(DEGREES);
  button = createButton("play");
  button.mousePressed(toggleSong);
  song.play();

  amp = new p5.Amplitude();

  car = new Car(0)
}

// setInterval(() => {
//   vinils.push(new Vinil(100))
// }, 1000)

function calcTempo(buffer) {
  var audioData = [];
  // Take the average of the two channels
  if (buffer.numberOfChannels == 2) {
    var channel1Data = buffer.getChannelData(0);
    var channel2Data = buffer.getChannelData(1);
    var length = channel1Data.length;
    for (var i = 0; i < length; i++) {
      audioData[i] = (channel1Data[i] + channel2Data[i]) / 2;
    }
  } else {
    audioData = buffer.getChannelData(0);
  }
  var mt = new MusicTempo(audioData);

  return round(mt.tempo)
}

function toggleSong() {
  if (song.isPlaying()) {

    const bpm = calcTempo(song.buffer)
    // setInterval(() => {
    setInterval(() => {
      let pos = [-100, 0, 100]
      if (car.getX() === -110) {
        pos = pos[1]
      } else if (car.getX() === 0) {
        pos = random([-100, 100])
      } else {
        pos = pos[1]
      }
      enemies.push(new Enemy(pos, 150, -1000))
      console.log("x")
    }, 1000 * bpm / 60 / 4)
    // if (enemies.length < 3)
    // }, 1000)
    song.pause();
  } else {
    song.play();
  }
}

function draw() {
  ambientLight(255);
  pointLight(255, 255, 255, 0, mouseX, mouseY);

  background(0);

  push()
  noStroke()
  fill('green')
  rotateX(270)
  translate(0, 0, 200)
  plane(500, 20000)
  pop()
  car.draw()
  car.update()

  let vol = amp.getLevel();
  volhistory.push(vol);
  stroke(255);
  noFill();



  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }

  enemies.forEach(e => {
    e.draw()
    e.update()
    if (e.z > 1000) {
      enemies.splice(enemies.indexOf(e), 1)
    }
  })

  translate(0, 100, -5000)
  for (const vinil of vinils) {
    vinil.draw(volhistory)
    vinil.update()
    if (vinil.x > 5000) {
      vinils.splice(vinils.indexOf(vinil), 1)
    }
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    car.update('right')
  } else if (keyCode === LEFT_ARROW) {
    car.update('left')
  }
  if (keyCode === UP_ARROW) {
    car.update('up')
  } else if (keyCode === DOWN_ARROW) {
    car.update('down')
  }
}

