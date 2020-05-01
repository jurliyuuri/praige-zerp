"use strict";
var get_word = function (id) {
    var word = dictionary.words.filter(function (a) { return a.entry.id === id; })[0];
    return "<div class=\"word\">\n    <div><div class=\"word_form\">" + word.entry.form + "</div><div class=\"tags\">" + word.tags.map(function (a) { return '<span class="bordered_info">' + a + '</span>'; }).join("") + "</div></div><div class=\"word_infos\">" + word.translations.map(function (t) { return '<p class="word_info"><span class="bordered_info">' + t.title + '</span>' + t.forms.join(", ") + '</p>'; }).join("") + "</div>" + word.contents.map(function (_a) {
        var title = _a.title, text = _a.text;
        return '<div class="word_infos"><p class="word_info"><span class="nonbordered_info">' + title + '</span>' + text + '</p></div>';
    }).join("") + "</div>";
};
var render = function () {
    document.getElementById("outer").innerHTML = [get_word(342), get_word(2), get_word(1)].join("");
};
