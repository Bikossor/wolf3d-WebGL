import { TILEGLOBAL } from "./Wolf";

// Sound channels
// Channel 0 never willingly overrides
// Other channels (1-7) always override a playing sound on that channel
export const CHAN_AUTO: number = 0;
export const CHAN_WEAPON: number = 1;
export const CHAN_VOICE: number = 2;
export const CHAN_ITEM: number = 3;
export const CHAN_BODY: number = 4;
// Modifier flags
export const CHAN_NO_PHS_ADD: number = 8;	// Send to all clients, not just ones in PHS (ATTN 0 will also do this)
export const CHAN_RELIABLE: number = 16;	// Send by reliable message, not datagram
// Sound attenuation values
export const ATTN_NONE: number = 0;	// Full volume the entire level
export const ATTN_NORM: number = 1;
export const ATTN_IDLE: number = 2;
export const ATTN_STATIC: number = 3;	    // Diminish very rapidly with distance

export const MAX_PLAYSOUNDS: number = 128;
export const MAX_CHANNELS: number = 64;

export const MUSIC_VOLUME: number = 0.8;
export const MASTER_VOLUME: number = 0.6;

var sounds = {},
    audioElements: Array<HTMLAudioElement> = [],
    currentMusic: string,
    soundEnabled: boolean = true,
    musicEnabled: boolean = true,
    music: HTMLAudioElement,
    ext: string,
    exts: Array<string> = ["ogg", "mp3"];

let Modernizr: any; // TODO (al) Remove in the future.

export const getFileName = (file: string) => {
    if (!ext) {
        // look for a probably
        for (var i = 0; i < exts.length; i++) {
            if (Modernizr.audio[exts[i]] == "probably") {
                ext = exts[i];
                break;
            }
        }
        // look for a maybe
        if (!ext) {
            for (var i = 0; i < exts.length; i++) {
                if (Modernizr.audio[exts[i]] == "maybe") {
                    ext = exts[i];
                    break;
                }
            }
        }
    }
    return file.split(".")[0] + "." + ext
}

export const createAudioElement = () => {
    var audio = new Audio();
    audioElements.push(audio);
    return audio;
}

export const startSound = (
    posPlayer: { x: number; y: number; },
    posSound: { x: number; y: number; },
    file: string,
    volume: number
) => {
    let audio: HTMLAudioElement,
        dx: number,
        dy: number,
        dist: number;

    if (!sounds[file]) {
        sounds[file] = [];
    }
    for (var i = 0; i < sounds[file].length; i++) {
        if (sounds[file][i].ended || sounds[file][i].paused) {
            audio = sounds[file][i];
            break;
        }
    }
    if (!audio) {
        audio = createAudioElement();
        audio.src = getFileName(file);
        sounds[file].push(audio);
    }

    if (posPlayer && posSound) {
        dx = (posPlayer.x - posSound.x) / TILEGLOBAL;
        dy = (posPlayer.y - posSound.y) / TILEGLOBAL;
        dist = dx * dx + dy * dy;
        volume *= 1 / (1 + dist / 50);
    }

    audio.volume = volume * MASTER_VOLUME * (soundEnabled ? 1 : 0);
    audio.play();
}

export const startMusic = (file: string) => {
    if (!music) {
        music = createAudioElement();
        music.loop = true;
    }

    const filename = getFileName(file);

    if (currentMusic != filename) {
        music.src = currentMusic = filename;
        music.volume = MUSIC_VOLUME * MASTER_VOLUME * (musicEnabled ? 1 : 0);
        music.play();
    }
}

export const stopAllSounds = () => {
    for (var i = 0; i < audioElements.length; i++) {
        if (audioElements[i].currentTime > 0) {
            audioElements[i].currentTime = 0;
            audioElements[i].pause();
        }
    }
}

// TODO (al) Maybe remove and export 'musicEnabled' directly?
export const isMusicEnabled = () => musicEnabled;

// TODO (al) Maybe remove and export 'soundEnabled' directly?
export const isSoundEnabled = () => soundEnabled;

export const toggleMusic = (enable: boolean) => {
    if (typeof enable != "undefined") {
        musicEnabled = enable;
    } else {
        musicEnabled = !musicEnabled;
    }
    if (music) {
        music.volume = MUSIC_VOLUME * MASTER_VOLUME * (musicEnabled ? 1 : 0);
    }
}

export const pauseMusic = (enable: boolean) => {
    if (music) {
        if (enable) {
            music.pause();
        } else if (music.paused) {
            music.play();
        }
    }
}

export const toggleSound = (enable: boolean) => {
    if (typeof enable != "undefined") {
        soundEnabled = enable;
    } else {
        soundEnabled = !soundEnabled;
    }
}


