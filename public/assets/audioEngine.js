/**
 * Imperial HVAC - Advanced Spatial Audio Engine
 * Uses native Web Audio API to synthesize haptic sounds and ambient industrial drones.
 */

class AudioEngine {
    constructor() {
        this.ctx = null;
        this.droneOscillator = null;
        this.droneGain = null;
        this.initialized = false;
        this.isMuted = true; // Default muted until user interacts or enables
    }

    init() {
        if (this.initialized) return;
        
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
        this.initialized = true;
        
        // Resume context if suspended
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    enableAudio() {
        this.init();
        this.isMuted = false;
        this.startAmbientDrone();
    }

    disableAudio() {
        this.isMuted = true;
        if (this.droneGain) {
            this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
        }
    }

    toggleAudio() {
        if (this.isMuted) {
            this.enableAudio();
        } else {
            this.disableAudio();
        }
    }

    playHover(freq = 400) {
        if (!this.initialized || this.isMuted) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        // Fast, clicky envelope
        gain.gain.setValueAtTime(0, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start();
        osc.stop(this.ctx.currentTime + 0.06);
    }

    playClick() {
        if (!this.initialized || this.isMuted) return;

        // Create a noise burst for a satisfying mechanical click
        const bufferSize = this.ctx.sampleRate * 0.1; // 100ms buffer
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        
        // Filter the noise to sound metallic/deep
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1200;
        filter.Q.value = 2;
        
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        
        noise.start();
        noise.stop(this.ctx.currentTime + 0.1);
    }

    startAmbientDrone() {
        if (!this.initialized || this.droneOscillator) return;

        // Base drone oscillator
        this.droneOscillator = this.ctx.createOscillator();
        this.droneOscillator.type = 'sawtooth';
        this.droneOscillator.frequency.value = 55; // Deep bass (close to A1)
        
        // Filter to muffle it
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 150;
        filter.Q.value = 5;
        
        // Gain (Volume control)
        this.droneGain = this.ctx.createGain();
        this.droneGain.gain.value = 0; // Start at 0, fade in
        if (!this.isMuted) {
            this.droneGain.gain.setTargetAtTime(0.03, this.ctx.currentTime, 2);
        }
        
        // LFO for throbbing effect
        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.2; // Very slow throb
        
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 20; // Modulate filter frequency by 20Hz
        
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        
        this.droneOscillator.connect(filter);
        filter.connect(this.droneGain);
        this.droneGain.connect(this.ctx.destination);
        
        this.droneOscillator.start();
        lfo.start();
    }

    bindInteractions() {
        // Bind to all buttons and links
        document.querySelectorAll('a, button, .blueprint-panel').forEach(el => {
            // Avoid double binding
            if (el.dataset.audioBound) return;
            el.dataset.audioBound = 'true';
            
            el.addEventListener('mouseenter', () => this.playHover(400 + Math.random() * 50));
            el.addEventListener('mousedown', () => this.playClick());
        });
    }
}

// Global instance
window.audioEngine = new AudioEngine();
