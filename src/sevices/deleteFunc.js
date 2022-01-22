const fs = require('fs');


const excluir = (arquivo) => {
    fs.rmSync(`${arquivo}`)
}


module.exports = excluir;