var form = document.querySelector('form')
var tableInput = document.querySelector('#table_name')
var fileInput = document.querySelector('#csv_file')
var showText = document.querySelector('#show-text')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    Papa.parse(fileInput.files[0], {
        complete: function (results) {
            console.log(results)
            getResult(results.data)
        }
    });
})

function getResult(data) {
    var tableName = tableInput.value
    var cols = data[0]
    console.log(cols)

    var text = `
        INSERT INTO ${tableName} (${cols.join(', ')}) \n
        VALUES \n
    `
    for (var i = 1; i < data.length; i++) {
        var values = data[i]
        var line = []
        values.forEach(value => {
            if (isNumber(value)) {
                line.push(value)
            }
            else {
                line.push(`'${value}'`)
            }
        })
        text += `(${line.join(', ')}), \n`
    }

    text += ';'

    showText.innerText = text
}

function isNumber(n) { 
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
} 