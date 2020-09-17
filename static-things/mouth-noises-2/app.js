// Create Pizzicato instances for playback
var longBoom_sound = new Pizzicato.Sound('audio-samples/long_boom.wav')
var shortBoom_sound = new Pizzicato.Sound('audio-samples/short_boom.wav')
var midLah_sound = new Pizzicato.Sound('audio-samples/mid_lah.wav')
var tap_sound = new Pizzicato.Sound('audio-samples/tap.wav')

// v2 Additions
var highLah_sound = new Pizzicato.Sound('audio-samples/high_lah.wav')
var lowLah_sound = new Pizzicato.Sound('audio-samples/low_lah.wav')

// Brewer Collection
var aha_sound = new Pizzicato.Sound('audio-samples/aha.wav')
var aoustynWayne_sound = new Pizzicato.Sound('audio-samples/aoustyn_wayne.wav')
var goodBeb_sound = new Pizzicato.Sound('audio-samples/good_beb.wav')
var highGoodBeb_sound = new Pizzicato.Sound('audio-samples/high_good_beb.wav')
var uwu_sound = new Pizzicato.Sound('audio-samples/uwu.wav')

// Beat groups
var beat1_group = new Pizzicato.Group()
var beat2_group = new Pizzicato.Group()
var beat3_group = new Pizzicato.Group()

// Effects
var lowPassFilter = new Pizzicato.Effects.LowPassFilter({
    frequency: 400,
    peak: 10
});

var effectOn = false


function toggleEffect() {
    effectOn = !effectOn
    if (effectOn) {
        document.getElementById('effect-toggle-status').innerHTML = 'Lo-Fi Effect On'
    } else {
        document.getElementById('effect-toggle-status').innerHTML = 'Lo-Fi Effect Off'
    }
}

function playLongBoom() {
    longBoom_sound.play()
}

function playShortBoom() {
    shortBoom_sound.play()
}

function playMidLah() {
    midLah_sound.play()
}

function playTap() {
    tap_sound.play()
}

function sync() {
    // Add sounds to group
    beat1_group.addSound(longBoom_sound)
    beat1_group.addSound(shortBoom_sound)
    beat1_group.addSound(midLah_sound)
    beat1_group.addSound(tap_sound)
    // Play sounds
    if (effectOn) {
        beat1_group.removeEffect(lowPassFilter)
        beat1_group.addEffect(lowPassFilter)
        console.log("adding effect")
    } else {
        beat1_group.removeEffect(lowPassFilter)
        console.log("removing effect")
    }
    beat1_group.play()
    // After group sounds are played, remove sounds from group for reuse
    beat1_group.on('end', function() {
        beat1_group.removeSound(longBoom_sound)
        beat1_group.removeSound(shortBoom_sound)
        beat1_group.removeSound(midLah_sound)
        beat1_group.removeSound(tap)
    })
}

function sync2() {
    beat2_group.addSound(lowLah_sound)
    beat2_group.addSound(highLah_sound)
    if (effectOn) {
        beat2_group.removeEffect(lowPassFilter)
        beat2_group.addEffect(lowPassFilter)
        console.log("adding effect")
    } else {
        beat2_group.removeEffect(lowPassFilter)
        console.log("removing effect")
    }
    beat2_group.play()
    beat2_group.on('end', function() {
        beat2_group.removeSound(lowLah_sound)
        beat2_group.removeSound(highLah_sound)
        if (effectOn) {
            beat2_group.removeEffect(lowPassFilter)
        }
    })
}

function sync3() {
    beat3_group.addSound(aha_sound)
    beat3_group.addSound(aoustynWayne_sound)
    beat3_group.addSound(goodBeb_sound)
    beat3_group.addSound(highGoodBeb_sound)
    beat3_group.addSound(uwu_sound)
    if (effectOn) {
        beat3_group.removeEffect(lowPassFilter)
        beat3_group.addEffect(lowPassFilter)
        console.log("adding effect")
    } else {
        beat3_group.removeEffect(lowPassFilter)
        console.log("removing effect")
    }
    beat3_group.play()
    beat3_group.on('end', function() {
        beat3_group.removeSound(aha_sound)
        beat3_group.removeSound(aoustynWayne_sound)
        beat3_group.removeSound(goodBeb_sound)
        beat3_group.removeSound(highGoodBeb_sound)
        beat3_group.removeSound(uwu_sound)
        if (effectOn) {
            beat3_group.removeEffect(lowPassFilter)
        }
    })
}