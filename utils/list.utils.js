class ListUtils {

    /***
     * Add a list of values values to a list
     * @param list
     * @param values
     */
    static addValuesToList(list, values) {
        for(let i = 0; i < values.length; i++){
            list.push(values[i]);
        }
    }
}

module.exports = ListUtils;
