var mouth_noises_files = [
	["Original", [
		["long boom", "long_boom.wav"],
		["short boom", "short_boom.wav"],
		["mid lah", "mid_lah.wav"],
		["tap", "tap.wav"],
	]],
	["V2", [
		["high lah", "high_lah.wav"],
		["low lah", "low_lah.wav"],
	]],
	["BrewerV1", [
		["aha", "aha.wav"],
		["aoustyn wayne", "aoustyn_wayne.wav"],
		["good beb!", "good_beb.wav"],
		["good beb! [high]", "high_good_beb.wav"],
		["uwu", "uwu.wav"]
	]],
	["Marichi", [
		["beetbox", "marichi/beetbox.mp3"],
		["bp", "marichi/bp.mp3"],
		["duck", "marichi/duck.mp3"],
		["kh", "marichi/kh.mp3"],
		["kno", "marichi/kno.mp3"],
		["pff", "marichi/pff.mp3"],
		["ts", "marichi/ts.mp3"],
		["you", "marichi/you.mp3"],
	]],
	["Shreya" , [
		["hu", "shreya/audioclip-1599083362000-1997.mp4.mp3"],
		["huyy", "shreya/audioclip-1599083374000-2090.mp4.mp3"],
		["gwi", "shreya/audioclip-1599083666000-3483.mp4.mp3"],
        ]],
	["Austin", [
		["bad-at-math", "austin/bad-at-math.wav"],
		["bangkok-agent69", "austin/bangkok-agent69.wav"],
		["chaos", "austin/chaos.wav"],
		["ghost", "austin/ghost.wav"],
		["henrys-kitchen", "austin/henrys-kitchen.wav"],
		["jiraffe", "austin/jiraffe.wav"],
		["little-woodies", "austin/little-woodies.wav"],
		["magicka-apabaku1", "austin/magicka-apabaku1.wav"],
		["magicka-apabaku2", "austin/magicka-apabaku2.wav"],
		["magicka-rising", "austin/magicka-rising.wav"],
		["magicka-suprender1", "austin/magicka-suprender1.wav"],
		["magicka-suprender2", "austin/magicka-suprender2.wav"],
		["monica-dev", "austin/monica-dev.wav"],
		["potato", "austin/potato.wav"],
		["rohan", "austin/rohan.wav"],
		["rohan-yaknow", "austin/rohan-yaknow.wav"],
		["unit-sphere", "austin/unit-sphere.wav"],
		["vznrygamer", "austin/vznrygamer.wav"],
		["weerus", "austin/weerus.wav"],
		["we-in-taco", "austin/we-in-taco.wav"],
		["wya1", "austin/wya1.wav"],
		["wya2", "austin/wya2.wav"],
		["wya3", "austin/wya3.wav"],
	]],
	["Cynthia", [
		["cynthia-1", "cynthia/1.mp3"],
		["cynthia-2", "cynthia/2.mp3"],
		["cynthia-3", "cynthia/3.mp3"],
		["cynthia-4", "cynthia/4.mp3"],
		["cynthia-5", "cynthia/5.mp3"],
		["cynthia-6", "cynthia/6.mp3"],
	]],
	["Komal", [
 		["komal-1", "komal/1.mp3"],
 		["komal-2", "komal/2.mp3"],
 		["komal-3", "komal/3.mp3"],
 		["komal-4", "komal/4.mp3"],
 		["komal-5", "komal/5.mp3"],
 		["komal-6", "komal/6.mp3"],
 		["komal-7", "komal/7.mp3"],
	]]
]

let backgrounds = [
	"meme.png",
	"meme (1).png",
	"meme (2).png",
	"meme (3).png",
	"meme (4).png",
	"meme (5).png",
	"meme (6).png",
	"meme (7).png",
	"meme (8).png",
	"meme (9).png",
];

let total_number_of_assets = 58
let loaded_assets = 0
let loading_bar = document.getElementById("loading-bar");

let update_loading_bar = () => {
    if (loaded_assets >= total_number_of_assets) {
	loading_bar.innerHTML = "";
    }
    else {
        let loading_str = "[" + "=".repeat(loaded_assets) + ".".repeat(total_number_of_assets - loaded_assets) + "]";
        loading_bar.innerHTML = "<h2>Loading Sounds...</h2> <p>" + loading_str + "</p>";
    }
}

let asset_loaded = () => {
    loaded_assets += 1;
    console.log(loaded_assets);
    update_loading_bar();
    if (loaded_assets == total_number_of_assets) {
        main();
    }
}

let to_key = (section, sound) => { return section + "-" + sound }

var mouth_noises_sounds = {}
var mouth_noises_sounds_for_groups = {} // somehow these must be detached - load separately

mouth_noises_files.forEach(([section, data]) => {
    data.forEach(([sound, audio_file]) => {
        let full_path = "audio-samples/" + audio_file;
        mouth_noises_sounds[to_key(section, sound)] = new Pizzicato.Sound(full_path, () => asset_loaded());
        /*mouth_noises_sounds_for_groups[to_key(section, sound)] = new Pizzicato.Sound(
	{ source : "file",
          options: {
           detached : true,
           path : full_path
          }
        }, 
        () => { // callback on loading finishing!
            asset_loaded()
        })*/
    })
})

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

let filters = document.getElementById("filters");
let sound_room = document.getElementById("sound-room");
let sequencer = document.getElementById("sequencer");
let meme_div = document.getElementById("meme");

let populate_sound_room = () => {
    mouth_noises_files.forEach(([section, data]) => {
        let new_section = document.createElement("div");
        let section_name = document.createElement("p");
        section_name.innerHTML = "<b>" + section + "</b>";
        new_section.appendChild(section_name);
        sound_room.appendChild(new_section);
        sound_room.appendChild(document.createElement("hr"));

        data.forEach(([sound, audio_file]) => {
            let sound_button = document.createElement("a");
            sound_button.setAttribute("class", "btn");
            let associated_sound = mouth_noises_sounds[to_key(section, sound)];
            sound_button.onclick = () => {
                associated_sound.play();
                if (sequencing_idx != -1) {
                    let associated_sound_detached = mouth_noises_sounds_for_groups[to_key(section, sound)];
                    beat_groups[sequencing_idx].addSound(associated_sound_detached);
                    let label = document.createElement("li");
                    label.innerHTML = sound;
                    beat_labels[sequencing_idx].appendChild(label);
                }
                let random_meme = backgrounds[Math.floor(Math.random() * backgrounds.length)];
                document.body.style.backgroundImage = "url('" + "audio-samples/shreya/memes/" + random_meme + "')";
            }
            sound_button.innerHTML = sound;
            new_section.appendChild(sound_button);
        })
    })
}

let beat_groups = [];
let beat_labels = [];
let beat_names = [];
let sequencing_idx = -1;
let sequenceUI = document.getElementById("sequence");
let sequencing_idx_UI = document.getElementById("sequencing");
let highlighted_cell = 0;
let playing = false;
let bpm = 60;

let bpm_to_interval_ms = (bpm) => {
    return 1000 * 60 / bpm;
}

let mod = (n, m) => {
  return ((n % m) + m) % m;
}

let playback_loop = () => {
    setTimeout(() => {
        beat_names[mod(highlighted_cell - 1, beat_groups.length)].style.backgroundColor = "";
        beat_names[highlighted_cell].style.backgroundColor = "orange";
        let group = beat_groups[highlighted_cell];
        group.sounds.forEach((s) => {
            s.masterVolume.connect(group.mergeGainNode);
        });
        if (effectOn) {
            group.removeEffect(lowPassFilter)
            group.addEffect(lowPassFilter)
        } else {
            group.removeEffect(lowPassFilter)
            console.log("removing effect")
        }
        group.play();
        highlighted_cell = mod(highlighted_cell + 1, beat_groups.length);

        if (playing)
          playback_loop();
    }, bpm_to_interval_ms(bpm));
}

let play_sequenced = () => {
    playing = true;
    playback_loop();
}

let pause_sequenced = () => {
    playing = false;
}

let set_sequencing_idx = (idx) => {
    sequencing_idx_UI.innerHTML = idx;
    sequencing_idx = idx;
}

let add_sequence_box = () => {
    let row = document.createElement("tr");
    let group_name = document.createElement("td");
    let display_cell = document.createElement("td");
    let displayed_sounds = document.createElement("ul");
    let clear_cell = document.createElement("td");
    row.appendChild(group_name);
    display_cell.appendChild(displayed_sounds);
    row.appendChild(display_cell);
    row.appendChild(clear_cell);
    sequenceUI.appendChild(row);

    let row_idx = beat_groups.length;
    beat_groups.push(new Pizzicato.Group());
    beat_labels.push(displayed_sounds);
    beat_names.push(group_name);
    group_name.onclick = () => {
        set_sequencing_idx(row_idx);
    };

    clear_cell.innerHTML = "Clear";
    clear_cell.onclick = () => {
        beat_groups[row_idx] = new Pizzicato.Group();
        beat_labels[row_idx].innerHTML = "";
    };

    group_name.innerHTML = row_idx;
}



let main = () => { // too be called after all the assets have been loaded!
    filters.setAttribute("style", "visibility:visible");
    sound_room.setAttribute("style", "visibility:visible");
    sequencer.setAttribute("style", "visibility:visible");
    populate_sound_room();
    add_sequence_box();
    add_sequence_box();
    add_sequence_box();

    //// Beat groups
    //var beat1_group = new Pizzicato.Group()
    //var beat2_group = new Pizzicato.Group()
    //var beat3_group = new Pizzicato.Group()
    //
   
    //function playLongBoom() {
    //    longBoom_sound.play()
    //}
    //
    //function playShortBoom() {
    //    shortBoom_sound.play()
    //}
    //
    //function playMidLah() {
    //    midLah_sound.play()
    //}
    //
    //function playTap() {
    //    tap_sound.play()
    //}
    //
    //function sync() {
    //    // Add sounds to group
    //    beat1_group.addSound(longBoom_sound)
    //    beat1_group.addSound(shortBoom_sound)
    //    beat1_group.addSound(midLah_sound)
    //    beat1_group.addSound(tap_sound)
    //    // Play sounds
    //    if (effectOn) {
    //        beat1_group.removeEffect(lowPassFilter)
    //        beat1_group.addEffect(lowPassFilter)
    //        console.log("adding effect")
    //    } else {
    //        beat1_group.removeEffect(lowPassFilter)
    //        console.log("removing effect")
    //    }
    //    beat1_group.play()
    //    // After group sounds are played, remove sounds from group for reuse
    //    beat1_group.on('end', function() {
    //        beat1_group.removeSound(longBoom_sound)
    //        beat1_group.removeSound(shortBoom_sound)
    //        beat1_group.removeSound(midLah_sound)
    //        beat1_group.removeSound(tap)
    //    })
    //}
    //
    //function sync2() {
    //    beat2_group.addSound(lowLah_sound)
    //    beat2_group.addSound(highLah_sound)
    //    if (effectOn) {
    //        beat2_group.removeEffect(lowPassFilter)
    //        beat2_group.addEffect(lowPassFilter)
    //        console.log("adding effect")
    //    } else {
    //        beat2_group.removeEffect(lowPassFilter)
    //        console.log("removing effect")
    //    }
    //    beat2_group.play()
    //    beat2_group.on('end', function() {
    //        beat2_group.removeSound(lowLah_sound)
    //        beat2_group.removeSound(highLah_sound)
    //        if (effectOn) {
    //            beat2_group.removeEffect(lowPassFilter)
    //        }
    //    })
    //}
    //
    //function sync3() {
    //    beat3_group.addSound(aha_sound)
    //    beat3_group.addSound(aoustynWayne_sound)
    //    beat3_group.addSound(goodBeb_sound)
    //    beat3_group.addSound(highGoodBeb_sound)
    //    beat3_group.addSound(uwu_sound)
    //    if (effectOn) {
    //        beat3_group.removeEffect(lowPassFilter)
    //        beat3_group.addEffect(lowPassFilter)
    //        console.log("adding effect")
    //    } else {
    //        beat3_group.removeEffect(lowPassFilter)
    //        console.log("removing effect")
    //    }
    //    beat3_group.play()
    //    beat3_group.on('end', function() {
    //        beat3_group.removeSound(aha_sound)
    //        beat3_group.removeSound(aoustynWayne_sound)
    //        beat3_group.removeSound(goodBeb_sound)
    //        beat3_group.removeSound(highGoodBeb_sound)
    //        beat3_group.removeSound(uwu_sound)
    //        if (effectOn) {
    //            beat3_group.removeEffect(lowPassFilter)
    //        }
    //    })
    //}
}
