let audioCtx: AudioContext | null = null;
let osc1: OscillatorNode | null = null;
let osc2: OscillatorNode | null = null;
let osc3: OscillatorNode | null = null;
let lfo: OscillatorNode | null = null;
let lfoGain: GainNode | null = null;
let delayNode: DelayNode | null = null;
let feedbackGain: GainNode | null = null;
let panner: StereoPannerNode | null = null;
let filter: BiquadFilterNode | null = null;
let gainNode: GainNode | null = null;
let melodyTimer: any = null;
let rainTimer: any = null;

// Wind Scenery Nodes
let noiseSource: AudioBufferSourceNode | null = null;
let windFilter: BiquadFilterNode | null = null;
let windGain: GainNode | null = null;
let windLfo: OscillatorNode | null = null;

const melodyNotes = [220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

const playRainDrop = () => {
    if (!audioCtx || audioCtx.state === 'suspended') return;
    try {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const dropGain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(900 + Math.random() * 1200, now);

        dropGain.gain.setValueAtTime(0, now);
        dropGain.gain.setValueAtTime(0.002, now); // Quiet, organic click
        dropGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02 + Math.random() * 0.04);

        osc.connect(dropGain);

        if (filter) {
            dropGain.connect(filter);
        } else {
            dropGain.connect(audioCtx.destination);
        }

        osc.start(now);
        osc.stop(now + 0.15);
    } catch (e) { }
};

const playMelodyNote = () => {
    if (!audioCtx || audioCtx.state === 'suspended') return;
    try {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();

        // Choose a harmonically aligned note from the A Minor Pentatonic scale
        const randomIndex = Math.floor(Math.random() * melodyNotes.length);
        const pitch = melodyNotes[randomIndex];

        osc.type = Math.random() > 0.4 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(pitch, now);

        // Soft linear attack/decay envelope
        noteGain.gain.setValueAtTime(0, now);
        noteGain.gain.linearRampToValueAtTime(0.012, now + 0.8);
        noteGain.gain.setTargetAtTime(0, now + 1.2, 1.6);

        if (filter) {
            osc.connect(noteGain);
            noteGain.connect(filter);
        } else {
            osc.connect(noteGain);
            noteGain.connect(audioCtx.destination);
        }

        osc.start(now);
        osc.stop(now + 8.0);
    } catch (e) {
        console.error(e);
    }
};

export const startAmbientSynth = () => {
    if (audioCtx) return;

    try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtx = new AudioContextClass();

        osc1 = audioCtx.createOscillator();
        osc2 = audioCtx.createOscillator();
        osc3 = audioCtx.createOscillator();
        lfo = audioCtx.createOscillator();
        lfoGain = audioCtx.createGain();
        delayNode = audioCtx.createDelay(2.0);
        feedbackGain = audioCtx.createGain();
        panner = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
        filter = audioCtx.createBiquadFilter();
        gainNode = audioCtx.createGain();

        // Cozy, low-harmonics analog waveforms
        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc3.type = 'triangle';

        // Fine-tuned aesthetic A chord structure (A minor 9): 
        // A3 (220.00Hz), C4 (261.63Hz), E4 (329.63Hz)
        osc1.frequency.setValueAtTime(220.00, audioCtx.currentTime);
        osc2.frequency.setValueAtTime(261.63, audioCtx.currentTime);
        osc3.frequency.setValueAtTime(329.63, audioCtx.currentTime);

        // Smooth lowpass filter configuration
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700, audioCtx.currentTime);
        filter.Q.setValueAtTime(0.8, audioCtx.currentTime);

        // Slow LFO to create a breathing filter effect (analog tape warmth)
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.1, audioCtx.currentTime); // 0.1Hz = 10 second cycle
        lfoGain.gain.setValueAtTime(120, audioCtx.currentTime);   // breath range of +/- 120Hz

        // Delay Line setup (dreamy spacey echo)
        delayNode.delayTime.setValueAtTime(0.5, audioCtx.currentTime); // 500ms delay delay
        feedbackGain.gain.setValueAtTime(0.38, audioCtx.currentTime); // 38% feedback loop

        // Smooth exponential gain fade-in to prevent pops/clicks
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.038, audioCtx.currentTime + 2.5); // soft cozy volume

        // Connections:
        // LFO -> LfoGain -> Filter Cutoff
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        // Oscillators -> Filter
        osc1.connect(filter);
        osc2.connect(filter);
        osc3.connect(filter);

        // Delay Feedback Loop: filter -> delayNode -> feedbackGain -> delayNode
        filter.connect(delayNode);
        delayNode.connect(feedbackGain);
        feedbackGain.connect(delayNode);

        // Send both clean (filter) and wet (delay) outputs to panner
        let lastNode: AudioNode = filter;
        if (panner) {
            filter.connect(panner);
            delayNode.connect(panner);
            lastNode = panner;
        } else {
            delayNode.connect(gainNode);
        }

        lastNode.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        // Activate synths & LFO
        osc1.start();
        osc2.start();
        osc3.start();
        lfo.start();

        // Generative melodic scheduler loop
        const scheduleNextNote = () => {
            const delay = 2000 + Math.random() * 3000;
            melodyTimer = setTimeout(() => {
                playMelodyNote();
                scheduleNextNote();
            }, delay);
        };
        scheduleNextNote();

        // Cozy Scenery Wind Synthesizer (realistic wind breeze noise)
        const sampleRate = audioCtx.sampleRate;
        const bufferSize = 2 * sampleRate;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, sampleRate);
        const channelData = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            channelData[i] = Math.random() * 2 - 1;
        }

        noiseSource = audioCtx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;

        windFilter = audioCtx.createBiquadFilter();
        windFilter.type = 'bandpass';
        windFilter.frequency.setValueAtTime(450, audioCtx.currentTime);
        windFilter.Q.setValueAtTime(2.5, audioCtx.currentTime);

        windGain = audioCtx.createGain();
        windGain.gain.setValueAtTime(0, audioCtx.currentTime);
        windGain.gain.linearRampToValueAtTime(0.005, audioCtx.currentTime + 3.0); // Soft ambient breeze

        windLfo = audioCtx.createOscillator();
        windLfo.type = 'sine';
        windLfo.frequency.setValueAtTime(0.04, audioCtx.currentTime); // slow swell

        const windLfoGain = audioCtx.createGain();
        windLfoGain.gain.setValueAtTime(150, audioCtx.currentTime); // +/- 150hz sweep

        windLfo.connect(windLfoGain);
        windLfoGain.connect(windFilter.frequency);

        noiseSource.connect(windFilter);
        windFilter.connect(windGain);

        if (panner) {
            windGain.connect(panner);
        } else {
            windGain.connect(audioCtx.destination);
        }
        windGain.connect(audioCtx.destination);

        noiseSource.start();
        windLfo.start();

        // Generative rain drops scheduler loop (organic drops pattering on leaves)
        const scheduleNextRain = () => {
            const delay = 140 + Math.random() * 320;
            rainTimer = setTimeout(() => {
                // 40% chance of rain drop click to keep it scattered and calming
                if (Math.random() > 0.6) {
                    playRainDrop();
                }
                scheduleNextRain();
            }, delay);
        };
        scheduleNextRain();

    } catch (error) {
        console.error('Failed to initialize Web Audio context:', error);
    }
};

export const updateAmbientSynth = (mouseXNormalized: number, mouseYNormalized: number) => {
    if (!audioCtx || audioCtx.state === 'suspended') return;

    // Stereo panning (-1.0 to 1.0)
    if (panner) {
        panner.pan.setTargetAtTime(mouseXNormalized, audioCtx.currentTime, 0.15);
    }

    // Dynamic Filter Base Cutoff driven by Mouse Y
    if (filter) {
        const targetFreq = 750 - (mouseYNormalized * 350);
        filter.frequency.setTargetAtTime(Math.max(300, Math.min(1450, targetFreq)), audioCtx.currentTime, 0.2);
    }
};

export const stopAmbientSynth = () => {
    if (melodyTimer) {
        clearTimeout(melodyTimer);
        melodyTimer = null;
    }
    if (rainTimer) {
        clearTimeout(rainTimer);
        rainTimer = null;
    }
    if (!audioCtx) return;

    try {
        const currentCtx = audioCtx;
        // Smooth linear volume ramp down
        if (gainNode) {
            gainNode.gain.setValueAtTime(gainNode.gain.value, currentCtx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0, currentCtx.currentTime + 0.5);
        }
        if (windGain) {
            windGain.gain.setValueAtTime(windGain.gain.value, currentCtx.currentTime);
            windGain.gain.linearRampToValueAtTime(0, currentCtx.currentTime + 0.5);
        }

        setTimeout(() => {
            if (osc1) { try { osc1.stop(); osc1.disconnect(); } catch (e) { } }
            if (osc2) { try { osc2.stop(); osc2.disconnect(); } catch (e) { } }
            if (osc3) { try { osc3.stop(); osc3.disconnect(); } catch (e) { } }
            if (lfo) { try { lfo.stop(); lfo.disconnect(); } catch (e) { } }
            if (lfoGain) { try { lfoGain.disconnect(); } catch (e) { } }
            if (delayNode) { try { delayNode.disconnect(); } catch (e) { } }
            if (feedbackGain) { try { feedbackGain.disconnect(); } catch (e) { } }
            if (filter) { try { filter.disconnect(); } catch (e) { } }
            if (panner) { try { panner.disconnect(); } catch (e) { } }
            if (gainNode) { try { gainNode.disconnect(); } catch (e) { } }
            if (currentCtx && currentCtx.state !== 'closed') { try { currentCtx.close(); } catch (e) { } }

            osc1 = null;
            osc2 = null;
            osc3 = null;
            lfo = null;
            lfoGain = null;
            delayNode = null;
            feedbackGain = null;
            panner = null;
            filter = null;
            gainNode = null;
            noiseSource = null;
            windLfo = null;
            windFilter = null;
            windGain = null;
            if (audioCtx === currentCtx) {
                audioCtx = null;
            }
        }, 600);
    } catch (error) {
        console.error('Error stopping Web Audio context:', error);
    }
};

export const playStartupChime = () => {
    try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        const now = ctx.currentTime;
        const notes = [174.61, 220.00, 261.63, 329.63, 392.00]; // F Major 9 / C Major harmonic tone

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.038, now + 0.35); // Fade in
        masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.4); // Long decay wash

        const delay = ctx.createDelay();
        delay.delayTime.setValueAtTime(0.35, now);
        const delayGain = ctx.createGain();
        delayGain.gain.setValueAtTime(0.25, now);

        notes.forEach((freq, index) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, now);

            // Arpeggiated startup sweep
            const startTime = now + index * 0.06;
            gain.gain.setValueAtTime(0, now);
            gain.gain.setValueAtTime(0.025, startTime);

            osc.connect(gain);
            gain.connect(masterGain);

            osc.start(startTime);
            osc.stop(now + 4.0);
        });

        // Delay loop connecting for spatial depth
        masterGain.connect(delay);
        delay.connect(delayGain);
        delayGain.connect(masterGain);

        masterGain.connect(ctx.destination);
    } catch (e) {
        console.error('Failed to play startup chime:', e);
    }
};
