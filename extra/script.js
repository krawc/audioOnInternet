/* * 
 * audio visualizer with html5 audio element
 *
 * v0.1.0
 * 
 * licenced under the MIT license
 * 
 * see my related repos:
 * - HTML5_Audio_Visualizer https://github.com/wayou/HTML5_Audio_Visualizer
 * - 3D_Audio_Spectrum_VIsualizer https://github.com/wayou/3D_Audio_Spectrum_VIsualizer
 * - selected https://github.com/wayou/selected
 * - MeowmeowPlayer https://github.com/wayou/MeowmeowPlayer
 * 
 * reference: https://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html
 */

window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

window.onload = function() {
    var audio = document.getElementById('audio');
    var ctx = new AudioContext();
    var analyser = ctx.createAnalyser();
    var audioSrc = ctx.createMediaElementSource(audio);
    // we have to connect the MediaElementSource with the analyser 
    audioSrc.connect(analyser);
    analyser.connect(ctx.destination);
    // we could configure the analyser: e.g. analyser.fftSize (for further infos read the spec)
    //analyser.fftSize = 32;
    // frequencyBinCount tells you how many values you'll receive from the analyser
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // we're ready to receive some data!
    var meterNum = 800 / (10 + 2); //count of the meters

    let bass = document.getElementById("headingBass");
    let mid1 = document.getElementById("headingMid1");
    let mid2 = document.getElementById("headingMid2");
    let treb = document.getElementById("headingTreble");

    // loop
    function renderFrame() {

        var soundRanges = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(soundRanges);


        var average = 0;
        var max = 255;
        for (var a of soundRanges) {
            average += a;
            max = Math.max(max, a);
        }

        average /= soundRanges.length;


        var step = Math.round(soundRanges.length / meterNum); //sample limited data from the total array

        var value = average / 100;
        

        let neons = document.getElementsByClassName("neon");

        for (let i = 0; i < neons.length; i++) {

            let neon = neons[i];
            let hue = neon.dataset.hue;
            let soundrange = neon.dataset.soundrange;
            let rangeVolume = soundRanges[soundrange] / 255;
            let lightness = 10 + (rangeVolume * 90);

            console.log(neon.dataset);

            if (rangeVolume > 0.5) {
                neons[i].style.textShadow = 'hsl(' + hue + ', 100%, 50%) 0px 0px 15px';
                neons[i].style.color = 'hsl(' + hue + ', 50%, ' + lightness + '%)';
            } else {
                neons[i].style.textShadow = '';
                neons[i].style.color = '';
            }
        }

        // if (array[2] > 100) {

        //     bass.style.textShadow = 'rgba(255,0,120,' + (array[2] / 255) + ') 0px 0px 15px';
        //     bass.style.color = 'rgba(255,235,255,' + (0.1 + ((array[2] / 255) * 0.9)) + ')';

        //     mid1.style.textShadow = 'rgba(255,100,0,' + (array[20] / 255) + ') 0px 0px 15px';
        //     mid1.style.color = 'rgba(255,255,235,' + (0.1 + ((array[20] / 255) * 0.9)) + ')';

        //     mid2.style.textShadow = 'rgba(225,255,30,' + (array[30] / 255) + ') 0px 0px 15px';
        //     mid2.style.color = 'rgba(255,255,225,' + (0.1 + ((array[30] / 255) * 0.9)) + ')';

        //     treb.style.textShadow = 'rgba(0,255,255,' + (array[65] / 255) + ') 0px 0px 15px';
        //     treb.style.color = 'rgba(235,235,235,' + (0.01 + ((array[65] / 255))) + ')';

        // } 

        // for (var i = 0; i < meterNum; i++) {
        //     var value = array[i * step];
        //     if (capYPositionArray.length < Math.round(meterNum)) {
        //         capYPositionArray.push(value);
        //     };
        //     ctx.fillStyle = capStyle;
        //     // //draw the cap, with transition effect
        //     // if (value < capYPositionArray[i]) {
        //     //     ctx.fillRect(i * 12, cheight - (--capYPositionArray[i]), meterWidth, capHeight);
        //     // } else {
        //     //     ctx.fillRect(i * 12, cheight - value, meterWidth, capHeight);
        //     //     capYPositionArray[i] = value;
        //     // };
        //     ctx.fillStyle = gradient; //set the filllStyle to gradient for a better look


        //     // ctx.fillRect(i * 12 /*meterWidth+gap*/ , cheight - value + capHeight, meterWidth, cheight); //the meter

        // }
        requestAnimationFrame(renderFrame);
    }
    renderFrame();
};

document.addEventListener("mousemove", playbackRate);

function playbackRate(e) {

    var sound = document.getElementById('audio');

    let x = e.clientX;
    sound.playbackRate = 0.1 + (x*0.002);

}
