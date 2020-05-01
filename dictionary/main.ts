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

const get_word = (id: number) => {
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

    const audio_and_translations = `<div class="word_infos">${audio + translations}</div>`;

    const contents = word.contents.map(({title, text}) => '<div class="word_infos"><p class="word_info"><span class="nonbordered_info">'+title+'</span>'+text+'</p></div>').join("");

    return `<div class="word">${word_form + audio_and_translations + contents}</div>`;
}

const render = () => {
    document.getElementById("outer")!.innerHTML = dictionary.words.map(a => get_word(a.entry.id)).join("");
}