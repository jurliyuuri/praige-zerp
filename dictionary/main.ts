const get_audio_name = (word: {
    entry: {id: number, form: string},
    contents: {title: string, text: string}[]
}) => {
    if (word.entry.form.charAt(0) !== "z") {
        return word.entry.form;
    } 
    const pronunciation_info = word.contents.filter(({title}) => title === "発音");
    if (pronunciation_info.length === 0) {
        return word.entry.form + "_tx"; // defaults to tx
    } else if (pronunciation_info[0].text.slice(0, 2) === "ts") {
        return word.entry.form + "_tc"; 
    } else {
        alert("Warning: unexpected pronunciation remark found in the word " + JSON.stringify(word.entry))
    }
}

const get_word = (id: number) => {
    const [word] = dictionary.words.filter(a => a.entry.id === id);

    const word_form = `<div><div class="word_form">${word.entry.form}</div><div class="tags">${
        word.tags.map(a => '<span class="bordered_info">' + a + '</span>').join("")
    }</div></div>`;

    const translations = word.translations.map(t => '<p class="word_info"><span class="bordered_info">' + t.title + '</span>' + t.forms.join(", ") + '</p>').join("");

    const audio = word.entry.form.indexOf(" ") !== -1 ? "" : ` <p class="word_info"><span class="bordered_info">音声</span><audio controls><source src="../audio/${get_audio_name(word)}.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio></p>`;

    const audio_and_translations = `<div class="word_infos">${audio + translations}</div>`;

    const contents = word.contents.map(({title, text}) => '<div class="word_infos"><p class="word_info"><span class="nonbordered_info">'+title+'</span>'+text+'</p></div>').join("");

    return `<div class="word">${word_form + audio_and_translations + contents}</div>`;
}

const render = () => {
    document.getElementById("outer")!.innerHTML = [get_word(140), get_word(141), get_word(342), get_word(2), get_word(1)].join("");
}