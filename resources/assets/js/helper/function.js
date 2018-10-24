export function load_district_by_province(data, provinceID) {
    var newData = [];
    for (let i = 0; i < data.length; i ++){
        if (data[i].matp === provinceID){
            newData.push(data[i]);
        }
    }
    return newData;
}

export function load_commune_by_district(data, districtID){
    var newData = [];
    for (let i = 0; i < data.length; i ++){
        if (data[i].maqh === districtID){
            newData.push(data[i]);
        }
    }
    return newData;
}

// remove null properties in object
export function cleanObject(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === "") {
            delete obj[propName];
        }
    }
    return obj;
}