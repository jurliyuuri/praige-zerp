function render_single_image(path: string, o: {width: number, height: number, left: number, top: number}) {
    return `<img src="img/${path}.png" width="${o.width}" height="${o.height}" style="position:absolute; left: ${o.left}px; top: ${o.top}px">`
}

function render_prek_marn(
    paths: string[], 
    template_id: "1+3+(1+1)" | "0+1+0" | "0+2+0" | "0+(1+1+1)+0"
     | "1+1+0" | "1+2+0" | "1+(1+1)+0" | "1+(1+1+1)+0" | "0+3+1"
     | "0+(2+1)+1" | "0+3+(1+1)" | "1+3+1" | "1+(2+1)+1"
     | "0+(1+1)+0 A" | "0+(1+1)+0 B" | "0+(1+1)+0 C"
     | "0+(1+1)+0 D" | "0+(2+1)+0 A" | "0+(2+1)+0 B"
     | "0+(2+1)+0 C" | "1+(2+1)+0 A" | "1+(2+1)+0 B"
     | "1+(2+1)+0 C"
) {
    const template = { "0+1+0": [
        { width: 64, height: 64, left: 0, top: 0 }
    ], "0+2+0": [
        { width: 64, height: 64, left: 0, top: 0 }
    ], "1+3+(1+1)": [
        { width: 23, height: 44, left: 3, top: 11 },
        { width: 30, height: 44, left: 17, top: 10 },
        { width: 23, height: 30, left: 37, top: 8 },
        { width: 23, height: 32, left: 37, top: 26 }
    ], "0+(1+1+1)+0": [
        { width: 64, height: 28, left: 0, top: 2 },
        { width: 64, height: 30, left: 0, top: 16 },
        { width: 64, height: 28, left: 0, top: 34 }
    ], "1+1+0": [
        { width: 35, height: 44, left: 3, top: 10 },
        { width: 40, height: 64, left: 23, top: 0 }
    ], "1+2+0": [
        { width: 35, height: 44, left: 2, top: 10 },
        { width: 40, height: 64, left: 22, top: 0 }
    ], "1+(1+1)+0": [
        { width: 35, height: 44, left: 3, top: 10 },
        { width: 40, height: 35, left: 23, top: 5 },
        { width: 40, height: 40, left: 23, top: 21 }
    ], "1+(1+1+1)+0": [
        { width: 30, height: 44, left: 3, top: 11 },
        { width: 40, height: 28, left: 20, top: 2 },
        { width: 40, height: 30, left: 20, top: 16 },
        { width: 40, height: 28, left: 20, top: 34 }
    ], "0+3+1": [
        { width: 35, height: 44, left: 3, top: 10 }, 
        { width: 40, height: 64, left: 23, top: 0 }
    ], "0+(2+1)+1": [
        { width: 40, height: 44, left: 2, top: 2 },
        { width: 42, height: 28, left: 0, top: 34 },
        { width: 35, height: 46, left: 30, top: 5 }
    ], "0+3+(1+1)": [
        { width: 42, height: 45, left: 0, top: 11 },
        { width: 35, height: 32, left: 29, top: 8 },
        { width: 35, height: 30, left: 29, top: 30 }
    ], "1+3+1": [
        { width: 23, height: 44, left: 3, top: 11 },
        { width: 30, height: 44, left: 17, top: 10 },
        { width: 23, height: 54, left: 37, top: 3 }
    ], "1+(2+1)+1": [
        { width: 23, height: 44, left: 3,  top: 9 },
        { width: 30, height: 30, left: 17, top: 8 },
        { width: 30, height: 30, left: 17, top: 28 },
        { width: 23, height: 52, left: 37, top: 2 }
    ], "0+(1+1)+0 A": [  
        { width: 64, height: 53, left: 0, top: 0 },
        { width: 70, height: 40, left: -2, top: 30 }
    ], "0+(1+1)+0 B": [
        { width: 64, height: 35, left: 0, top:  5 },
        { width: 64, height: 40, left: 0, top: 21 }
    ], "0+(1+1)+0 C": [
        { width: 64, height: 37, left: 0, top: 0 },
        { width: 64, height: 40, left: 0, top: 22 }
    ], "0+(1+1)+0 D": [
        { width: 64, height: 40, left: 0, top: 0 },
        { width: 64, height: 35, left: 1, top: 25 }
    ], "0+(2+1)+0 A": [
        { width: 64, height: 48, left: 0, top: 0 },
        { width: 64, height: 37, left: 0, top: 28 },
    ], "0+(2+1)+0 B": [
        { width: 64, height: 40, left: 0, top: 2 },
        { width: 64, height: 37, left: 0, top: 30 }
    ], "0+(2+1)+0 C": [
        { width: 64, height: 48, left: 0, top: 5 },
        { width: 70, height: 37, left: -2, top: 33 }
    ], "1+(2+1)+0 A": [
        { width: 35, height: 46, left: 2, top: 9 },
        { width: 42, height: 48, left: 23,  top: 0 },
        { width: 42, height: 37, left: 23,  top: 28 }
    ], "1+(2+1)+0 B": [
        { width: 35, height: 46, left: 2, top: 9 },
        { width: 42, height: 48, left: 23, top: 5 },
        { width: 42, height: 37, left: 23, top: 33 }
    ], "1+(2+1)+0 C": [
        { width: 35, height: 46, left: 2, top: 9 },
        { width: 42, height: 44, left: 23,  top: 0 },
        { width: 42, height: 37, left: 23,  top: 28 }
    ] };
    return `<div class="prek_marn_">`+ paths.map(
        (path, i) => render_single_image(path, template[template_id][i])
    ).join("\n")+`</div>`
}