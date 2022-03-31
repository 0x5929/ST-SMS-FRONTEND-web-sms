export function insertRecord(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr))
}


export function generateRecordPk(key) {
    if (localStorage.getItem(key) == null){
        localStorage.setItem(key, '0')
    }

    let pk = parseInt(localStorage.getItem(key))
    
    localStorage.setItem(key, (++pk).toString())

    return pk;
}

export function getAllRecords(key) {
    if (localStorage.getItem(key) == null) {
        localStorage.setItem(key, JSON.stringify([]))
    }

    return JSON.parse(localStorage.getItem(key));
}