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


export function updateRecord(key, record, recordIndexToEdit){
    let records = getAllRecords(key);
    
    records[recordIndexToEdit] = { ...record }
    localStorage.setItem(key, JSON.stringify(records))
}

export function getRecordIndex(key, record){
    
    let records = getAllRecords(key);
    let recordIndex = records.findIndex(x => x.pk === record.pk)

    if ( recordIndex === -1 ) {
        return false
    }

    return recordIndex
}