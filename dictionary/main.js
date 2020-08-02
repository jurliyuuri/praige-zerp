"use strict";
var get_audio_names = function (word) {
    if (word.entry.form.indexOf(" ") !== -1) {
        return []; // no pronunciation info will be given
    }
    else if (word.entry.form.charAt(0) !== "z") {
        return [word.entry.form];
    }
    var pronunciation_info = word.contents.filter(function (_a) {
        var title = _a.title;
        return title === "発音";
    });
    if (pronunciation_info.length === 0) {
        return [word.entry.form + "_tx"]; // defaults to tx
    }
    return pronunciation_info[0].text.split(", ").map(function (pronunciation) {
        if (pronunciation.slice(0, 2) === "ts") {
            return word.entry.form + "_tc";
        }
        else if (pronunciation.slice(0, 2) === "tɕ") {
            return word.entry.form + "_tx";
        }
        else {
            alert("Warning: unexpected pronunciation remark found in the word " + JSON.stringify(word.entry));
        }
    });
};
var get_word = function (dictionary, id, image_getter) {
    var _a;
    var word = dictionary.words.filter(function (a) { return a.entry.id === id; })[0];
    var word_form = "<div><div class=\"word_form\">" + word.entry.form + "</div><div class=\"tags\">" + word.tags.map(function (a) { return '<span class="bordered_info">' + a + '</span>'; }).join("") + "</div></div>";
    var translations = word.translations.map(function (t) { return '<p class="word_info"><span class="bordered_info">' + t.title + '</span>' + t.forms.join(", ") + '</p>'; }).join("");
    var audio = (_a = get_audio_names(word)) === null || _a === void 0 ? void 0 : _a.map(function (name) { return "<p class=\"word_info\"><span class=\"bordered_info\">\u97F3\u58F0</span><audio controls><source src=\"../audio/" + name + ".mp3\" type=\"audio/mpeg\">\n    Your browser does not support the audio element.\n    </audio></p>"; }).join("");
    var linzi_transcription = (function () {
        var transcription_arr = word.translations.filter(function (t) { return t.title === "漢字転写"; });
        if (transcription_arr.length == 0) {
            return "";
        }
        if (transcription_arr.length > 1) {
            alert("Warning: multiple hanzi transcription entries found in the word " + JSON.stringify(word.entry) + " . Only the first one will be converted.");
        }
        var tr = transcription_arr[0];
        var ans = [];
        for (var _i = 0, _a = tr.forms; _i < _a.length; _i++) {
            var form = _a[_i];
            // convert all the chars to linzi
            var all_converted = Array.prototype.map.call(form, function (l) { return image_getter(l, ["SY", "jv", "jv touch panel", "SY pua2 man1", "noborder", "border"], 30, false, "http://jurliyuuri.com/lin-marn"); });
            var res = "";
            for (var _b = 0, all_converted_1 = all_converted; _b < all_converted_1.length; _b++) {
                var linzi_html = all_converted_1[_b];
                if (typeof linzi_html !== "string") {
                    return "";
                }
                else {
                    res += linzi_html;
                }
            }
            ans.push(res);
        }
        return "<p class=\"word_info\"><span class=\"bordered_info\">\u71D0\u5B57\u8868\u8A18</span>" + ans.join("、") + "</p>";
    })();
    var audio_linzi_and_translations = "<div class=\"word_infos\">" + (audio + linzi_transcription + translations) + "</div>";
    var contents = word.contents.map(function (_a) {
        var title = _a.title, text = _a.text;
        return '<div class="word_infos"><p class="word_info"><span class="nonbordered_info">' + title + '</span>' + text + '</p></div>';
    }).join("");
    return "<div class=\"word\">" + (word_form + audio_linzi_and_translations + contents) + "</div>";
};
var encode_syllable = function (str) {
    var match = str.match(/^([pbmcsxztdnlkgh]?)([aeiouy]+)([ptkmn]?)([12]?)$/);
    if (match === null) {
        alert("Warning: unexpected syllable `" + str + "` was encountered while sorting.");
        return "";
    }
    var whole = match[0], init = match[1], vowel = match[2], coda = match[3], tone = match[4];
    var encoded_vowel = vowel === "a" ? "00" :
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
                                                                                vowel === "y" ? "31" : (function () {
                                                                                    alert("Warning: unexpected vowel `" + vowel + "` was encountered in the word `" + str + "` while sorting.");
                                                                                    return "99";
                                                                                })();
    return {
        p: "00", b: "01", m: "02",
        c: "10", s: "11", x: "12", z: "13",
        t: "20", d: "21", n: "22", l: "23",
        k: "30", g: "31", h: "32", "": "33"
    }[init] + encoded_vowel + {
        "": "0", p: "1", t: "2",
        k: "3", m: "4", n: "5"
    }[coda] + {
        "": "0", "1": "1", "2": "2"
    }[tone];
};
var encode_word = function (str) { return str.split(" ").map(function (syl) { return encode_syllable(syl); }).join(" "); };
var render = function (dictionary, image_getter) {
    var _a;
    var _b;
    var urlParams = new URLSearchParams(window.location.search);
    var sortBy = (_b = urlParams.get('sortBy')) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    var ids = dictionary.words.map(function (a) { return a.entry.id; });
    if (sortBy === "random") {
        for (var i = ids.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [ids[j], ids[i]], ids[i] = _a[0], ids[j] = _a[1];
        }
    }
    else if (sortBy === "id") {
        ids = ids.sort(function (a, b) { return a - b; });
    }
    else if (sortBy === "ascii") {
        ids = ids.sort(function (a, b) {
            var w_a = dictionary.words.filter(function (k) { return k.entry.id === a; })[0];
            var w_b = dictionary.words.filter(function (k) { return k.entry.id === b; })[0];
            return w_a.entry.form === w_b.entry.form ? 0 : w_a.entry.form > w_b.entry.form ? 1 : -1;
        });
    }
    else {
        ids = ids.sort(function (a, b) {
            var w_a = dictionary.words.filter(function (k) { return k.entry.id === a; })[0];
            var w_b = dictionary.words.filter(function (k) { return k.entry.id === b; })[0];
            return encode_word(w_a.entry.form) === encode_word(w_b.entry.form) ? 0 : encode_word(w_a.entry.form) > encode_word(w_b.entry.form) ? 1 : -1;
        });
    }
    document.getElementById("outer").innerHTML = ids.map(function (id) { return get_word(dictionary, id, image_getter); }).join("");
};
