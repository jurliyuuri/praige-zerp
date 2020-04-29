"use strict";
function render_single_image(path, o) {
    return "<img src=\"img/" + path + ".png\" width=\"" + o.width + "\" height=\"" + o.height + "\" style=\"position:absolute; left: " + o.left + "px; top: " + o.top + "px\">";
}
function render_prek_marn(paths, template_id) {
    var template = { "1+3+(1+1)": [
            { width: 23, height: 44, left: 3, top: 11 },
            { width: 30, height: 44, left: 17, top: 10 },
            { width: 23, height: 30, left: 37, top: 8 },
            { width: 23, height: 32, left: 37, top: 26 }
        ] };
    return "<div class=\"prek_marn\">" + [
        render_single_image(paths[0], template[template_id][0]),
        render_single_image(paths[1], template[template_id][1]),
        render_single_image(paths[2], template[template_id][2]),
        render_single_image(paths[3], template[template_id][3])
    ].join("\n") + "</div>";
}
