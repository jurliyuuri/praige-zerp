type Dictionary = {
    readonly words: {
        readonly entry: {
            readonly id: number,
            readonly form: string
        },
        readonly translations: {
            readonly title: string,
            readonly forms: string[]
        }[],
        readonly tags: string[],
        readonly contents: {
            readonly title: string,
            readonly text: string
        }[],
        readonly variations: unknown[],
        readonly relations: {
            readonly title: string,
            readonly entry: {
                readonly id: number,
                readonly form: string
            }
        }[]
    }[],
    readonly zpdic: unknown,
    readonly snoj: string
}

const get_audio_names =  (word: {
    entry: {id: number, form: string},
    contents: {title: string, text: string}[]
}) => {
    if (word.entry.form.indexOf(" ") !== -1) {
        return []; // no pronunciation info will be given
    } else if (word.entry.form.charAt(0) !== "z") {
        return [word.entry.form];
    }

    const pronunciation_info = word.contents.filter(({title}) => title === "発音");
    if (pronunciation_info.length === 0) {
        return [word.entry.form + "_tx"]; // defaults to tx
    } 
    
    return pronunciation_info[0].text.split(", ").map(pronunciation => {
        if (pronunciation.slice(0, 2) === "ts") {
            return word.entry.form + "_tc"; 
        } else if (pronunciation.slice(0, 2) === "tɕ") {
            return word.entry.form + "_tx";
        } else {
            alert("Warning: unexpected pronunciation remark found in the word " + JSON.stringify(word.entry))
        }
    });
}

const get_word = (dictionary: Dictionary, id: number, image_getter: (l: string, precedence: string[], size: number, flag: boolean, path: string) => unknown) => {
    const [word] = dictionary.words.filter(a => a.entry.id === id);

    const word_form = `<div><div class="word_form">${word.entry.form}</div><div class="tags">${
        word.tags.map(a => '<span class="bordered_info">' + a + '</span>').join("")
    }</div></div>`;

    const translations = word.translations.map(t => '<p class="word_info"><span class="bordered_info">' + t.title + '</span>' + t.forms.join(", ") + '</p>').join("");

    const audio = get_audio_names(word)?.map(
        name => `<p class="word_info"><span class="bordered_info">音声</span><audio controls><source src="../audio/${name}.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio></p>`
    ).join("");

    const linzi_transcription = (() => {
        const transcription_arr = word.translations.filter(t => t.title === "漢字転写");
        if (transcription_arr.length == 0) { return ""; }
        if (transcription_arr.length > 1) { alert("Warning: multiple hanzi transcription entries found in the word " + JSON.stringify(word.entry) +" . Only the first one will be converted.") }
        const [ tr ] = transcription_arr;
        
        const ans = [];
        for (const form of tr.forms) {
            // convert all the chars to linzi
            const all_converted = Array.prototype.map.call(
                form, 
                (l) => image_getter(l, ["SY", "jv", "jv touch panel", "SY pua2 man1", "noborder", "border"], 30, false, "http://jurliyuuri.com/lin-marn")
            );

            let res = "";
            for (const linzi_html of all_converted) {
                if (typeof linzi_html !== "string") {
                    return "";
                } else {
                    res += linzi_html;
                }
            }
            ans.push(res);
        }
        return `<p class="word_info"><span class="bordered_info">燐字表記</span>${ans.join("、")}</p>`;
    })();

    const audio_linzi_and_translations = `<div class="word_infos">${audio + linzi_transcription + translations}</div>`;

    const contents = word.contents.map(({title, text}) => '<div class="word_infos"><p class="word_info"><span class="nonbordered_info">'+title+'</span>'+text+'</p></div>').join("");

    return `<div class="word">${word_form + audio_linzi_and_translations + contents}</div>`;
}

const encode_syllable = (str: string) => {
    const match = str.match(/^([pbmcsxztdnlkgh]?)([aeiouy]+)([ptkmn]?)([12]?)$/);
    if (match === null) {
        alert("Warning: unexpected syllable `" + str +"` was encountered while sorting.");
        return "";
    }
    const [whole, init, vowel, coda, tone] = match;

    const encoded_vowel = 
        vowel === "a" ? "00" :
        vowel === "ia" ? "01" :
        vowel === "ua" ? "02" :
        vowel === "ai" ? "03" :
        vowel === "uai" ? "04" :
        vowel === "au" ? "05" :
        vowel === "iau" ? "06" :
        vowel === "uau" ? "07" :
        vowel === "e" ? "10" :
        vowel === "ie" ? "11" :
        vowel === "ue" ? "12" :
        vowel === "ei" ? "13" :
        vowel === "iei" ? "14" :
        vowel === "o" ? "15" :
        vowel === "io" ? "16" :
        vowel === "uo" ? "17" :
        vowel === "i" ? "20" :
        vowel === "ui" ? "21" :
        vowel === "u" ? "30" :
        vowel === "y" ? "31" : (() => {
            alert("Warning: unexpected vowel `" + vowel + "` was encountered in the word `" + str + "` while sorting.");
            return "99"
        })();

    return {
        p: "00", b: "01", m: "02",
        c: "10", s: "11", x: "12", z: "13",
        t: "20", d: "21", n: "22", l: "23",
        k: "30", g: "31", h: "32", "": "33"
    }[init as "p" | "b" | "m" 
    | "c" | "s" | "x" | "z" 
    | "t" | "d" | "n" | "l"
    | "k" | "g" | "h" | ""] + encoded_vowel + {
        "": "0", p: "1", t: "2",
        k: "3", m: "4", n: "5"
    }[coda as "p" | "t" | "k" | "m" | "n" ] + {
        "": "0", "1": "1", "2": "2"
    }[tone as "" | "1" | "2"]
}

const encode_word = (str: string) => str.split(" ").map(syl => encode_syllable(syl)).join(" ");

const render = (dictionary: Dictionary, image_getter: (l: string, precedence: string[], size: number, flag: boolean, path: string) => unknown) => {
    const urlParams = new URLSearchParams(window.location.search);
    const sortBy = urlParams.get('sortBy')?.toLowerCase();

    let ids = dictionary.words.map(a => a.entry.id);

    if (sortBy === "random") {
        for (let i = ids.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ids[i], ids[j]] = [ids[j], ids[i]];
        }
    } else if (sortBy === "id") {
        ids = ids.sort((a, b) => a - b);
    } else if (sortBy === "ascii") {
        ids = ids.sort((a, b) => {
            const [w_a] = dictionary.words.filter(k => k.entry.id === a);
            const [w_b] = dictionary.words.filter(k => k.entry.id === b);
            return w_a.entry.form === w_b.entry.form ? 0 : w_a.entry.form > w_b.entry.form ? 1 : -1;
        })
    } else {
        ids = ids.sort((a, b) => {
            const [w_a] = dictionary.words.filter(k => k.entry.id === a);
            const [w_b] = dictionary.words.filter(k => k.entry.id === b);
            return encode_word(w_a.entry.form) === encode_word(w_b.entry.form) ? 0 : encode_word(w_a.entry.form) > encode_word(w_b.entry.form) ? 1 : -1;
        });
    }
    document.getElementById("outer")!.innerHTML = ids.map(id => get_word(dictionary, id, image_getter)).join("");
}