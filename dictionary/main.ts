const get_word = (id: number) => {
    const [word] = dictionary.words.filter(a => a.entry.id === id);
    
    return `<div class="word">
    <div><div class="word_form">${word.entry.form}</div><div class="tags">${
        word.tags.map(a => '<span class="bordered_info">' + a + '</span>').join("")
    }</div></div><div class="word_infos">${
        word.translations.map(t => '<p class="word_info"><span class="bordered_info">' + t.title + '</span>' + t.forms.join(", ") + '</p>').join("")
    }</div>${
        word.contents.map(({title, text}) => '<div class="word_infos"><p class="word_info"><span class="nonbordered_info">'+title+'</span>'+text+'</p></div>').join("")
    }</div>`;
}

const render = () => {
    document.getElementById("outer")!.innerHTML = [get_word(342), get_word(2), get_word(1)].join("");
}