export function load_district_by_province(data, provinceID) {
    var newData = [];
    for (let i = 0; i < data.length; i ++){
        if (data[i].matp === provinceID){
            newData.push(data[i]);
        }
    }
    return newData;
}