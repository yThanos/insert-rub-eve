const fs = require('fs');
const csv = require('csv-parser');
const inserts = {
    'rubricas': [],
    'ind_rubricas': [],
    'eventos': [],
    'ind_eventos': [],
}
//encoding utf-8
fs.createReadStream('data.csv', { encoding: 'utf-8' })
    .pipe(csv({separator: ';'}))
    .on('data', (row) => {
        inserts.rubricas.push("INSERT INTO RUBRICAS_RH (ID_RUBRICA, COD_RUBRICA, DESCR_RUBRICA) VALUES ((SEQ_RUBRICAS_RH.nextval), '"+row.COD_RUBRICA+"', '"+row.DESCR_RUBRICA+"');")
        inserts.ind_rubricas.push("INSERT INTO RUBRICAS_RH (ID_RUBRICA, COD_RUBRICA, DESCR_RUBRICA) VALUES ((SEQ_IND_RUBRICAS_RH.nextval), '"+row.COD_RUBRICA+"', '"+row.DESCR_RUBRICA+"');")
        inserts.eventos.push("INSERT INTO EVENTOS_RH (ID_EVENTO, COD_EVENTO, DESCR_EVENTO) VALUES ((SEQ_EVENTOS_RH.nextval), '"+row.COD_RUBRICA+"', '"+row.DESCR_RUBRICA+"');")
        inserts.ind_eventos.push("INSERT INTO EVENTOS_RH (ID_EVENTO, COD_EVENTO, DESCR_EVENTO) VALUES ((SEQ_IND_EVENTOS_RH.nextval), '"+row.COD_RUBRICA+"', '"+row.DESCR_RUBRICA+"');")
    })
    .on('end', () => { 
    console.log(inserts);
    file = ""

    for(let insert of inserts.rubricas){
        console.log(insert)
        file += insert + "\n"
    }
    for(let insert of inserts.ind_rubricas){
        file += insert + "\n"
    }
    for(let insert of inserts.eventos){
        file += insert + "\n"
    }
    for(let insert of inserts.ind_eventos){
        file += insert + "\n"
    }

    fs.writeFile('inserts.sql', JSON.stringify(file), function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    })
    .on('error', (error) => {
        console.error('Error:', error.message);
    });

  