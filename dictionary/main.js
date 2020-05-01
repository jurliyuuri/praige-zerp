"use strict";
var get_audio_name = function (word) {
    if (word.entry.form.charAt(0) !== "z") {
        return word.entry.form;
    }
    var pronunciation_info = word.contents.filter(function (_a) {
        var title = _a.title;
        return title === "発音";
    });
    if (pronunciation_info.length === 0) {
        return word.entry.form + "_tx"; // defaults to tx
    }
    else if (pronunciation_info[0].text.slice(0, 2) === "ts") {
        return word.entry.form + "_tc";
    }
    else {
        alert("Warning: unexpected pronunciation remark found in the word " + JSON.stringify(word.entry));
    }
};
var get_word = function (id) {
    var word = dictionary.words.filter(function (a) { return a.entry.id === id; })[0];
    var word_form = "<div><div class=\"word_form\">" + word.entry.form + "</div><div class=\"tags\">" + word.tags.map(function (a) { return '<span class="bordered_info">' + a + '</span>'; }).join("") + "</div></div>";
    var translations = word.translations.map(function (t) { return '<p class="word_info"><span class="bordered_info">' + t.title + '</span>' + t.forms.join(", ") + '</p>'; }).join("");
    var audio = word.entry.form.indexOf(" ") !== -1 ? "" : " <p class=\"word_info\"><span class=\"bordered_info\">\u97F3\u58F0</span><audio controls><source src=\"../audio/" + get_audio_name(word) + ".mp3\" type=\"audio/mpeg\">\n    Your browser does not support the audio element.\n    </audio></p>";
    var audio_and_translations = "<div class=\"word_infos\">" + (audio + translations) + "</div>";
    var contents = word.contents.map(function (_a) {
        var title = _a.title, text = _a.text;
        return '<div class="word_infos"><p class="word_info"><span class="nonbordered_info">' + title + '</span>' + text + '</p></div>';
    }).join("");
    return "<div class=\"word\">" + (word_form + audio_and_translations + contents) + "</div>";
};
var render = function () {
    document.getElementById("outer").innerHTML = [get_word(140), get_word(141), get_word(342), get_word(2), get_word(1)].join("");
};
