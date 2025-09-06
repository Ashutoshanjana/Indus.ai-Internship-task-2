//Audio objects for each drum sound
const sounds = {
    kick: new Audio('kick-bass.mp3'),
    snare: new Audio('snare.mp3'),
    tom1: new Audio('tom-1.mp3'),
    tom2: new Audio('tom-2.mp3'),
    tom3: new Audio('tom-3.mp3'),
    tom4: new Audio('tom-4.mp3'),
    crash: new Audio('crash.mp3')
};

//Preload all the sounds and set volume

Object.values(sounds).forEach(audio => {
    audio.preload = 'auto';
    audio.volume = 0.7;
});

//Functions to play sound and add visual feedback

function playSound(soundName, drumPad) {
    const audio = sounds[soundName];
    if (audio) {
        //Reset audio to beginning for rapid key presses
        audio.currentTime = 0;
        audio.play().catch(e => {
            console.log('Audio play failed:', e);
        });

        //Add visual feedback
        if (drumPad) {
            drumPad.classlist.add('playing', 'hit');
            setTimeout(() => {
                drumPad.classlist.remove('playing', 'hit');
            }, 100);
        }
    }
}

//Keyboard event listener

document.addEventListener('keydown', function (event) {
    const keyCode = event.keyCode;
    const drumPad = document.querySelector('[data-key="${keyCode}"]');

    if (drumPad) {
        const soundName = drumPad.getAttribute('data-sound');
        playSound(soundName, drumPad);

        //Prevent default behavior for these keys
        event.preventDefault();
    }
});

//Click event listeners for drum pads

document.querySelectorAll('.drum-pad').forEach(pad => {
    pad.addEventListener('click', function () {
        const soundName = this.getAttribute('data-sound');
        playSound(soundName, this);
    });
});

//Add touch support for mobile devices

document.querySelectorAll('.drum-pad').forEach(pad => {
    pad.addEventListener('touchstart', function (e) {
        e.preventDefault();
        //Prevent double-tap zoom
        const soundName = this.getAttribute('data-sound');
        playSound(soundName, this);
    });
});

//Show a welcome message when page loads

window.addEventListener('load', function () {
    console.log('🥁Virtual Drum Kit loaded!Press A, S, D, F, G, H, J to play drums!');
});

//Handle audio loading errors gracefully

Object.entries(sounds).forEach(([name, audio]) => {
    audio.addEventListener('error', function () {
        console.warn('Failed to load ${name} sound. Please check your internet connection.');
    });
});