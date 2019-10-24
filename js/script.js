console.log("Script Loaded!");


const sources = ["audio/pudong.wav",
"audio/puxi.wav"];

const players = [];

let playSounds = document.createElement('button');
document.body.appendChild(playSounds);
playSounds.innerHTML = "PLAY"
playSounds.addEventListener('click', handlePlaySounds);

function handlePlaySounds() {
    for (let i = 0; i < players.length; i++) {
        players[i].play();
    }
}


for (let i = 0; i < sources.length; i++) {

    let plr = document.createElement('audio');
    document.body.appendChild(plr);
    players.push(plr);
    plr.src = sources[i];
    plr.loop = true;
    
    
}

window.addEventListener("mousemove", handleMouseMove);


function handleMouseMove(e) {

    let x = e.clientX;
    let y = e.clientY;

    let w = window.innerWidth;
    let h = window.innerHeight;

    let volume1 = x / w;
    let volume2 = y / h;

    players[0].volume = volume1;
    players[1].volume = volume2;
    
    let red = volume1 * 255;
    let green = volume2 * 255;

    document.body.style.backgroundColor = 'rgb(' + red + ', ' + green + ', 255)';



}

