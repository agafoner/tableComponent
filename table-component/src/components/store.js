import { reactive } from "vue";

export const store = reactive( {
    rawTableData: {},
    tableData: {},
    tableHead: {},

    init(jsonString) {
        this.rawTableData = JSON.parse(jsonString);
        this.tableData = this.rawTableData.data;
        this.tableHead = this.rawTableData.head;
        if (this.tableData.length == 0 || this.tableHead.length == 0) {
            console.error('tableApp: Incoming data error',this.tableData,this.tableHead);
        } else console.log('tableApp: Store initiated')
    },
    headCellByKey(key) {
       return this.tableHead.find((el)=>el.key == key);
    },
    /**Формула рассчёта значения ячейки с функцией. Принимает строку формулы и номер строки ячейки компонента для определения данных, 
     * рекуррентно парсит строчку по символу, собирая каждую часть выражения в одну из сущностей: ссылка на ячейку, число, знак сложения или вычитания. 
     * В случае неверной формулы или циклической зависимости формул выводит 'ERR'*/
    calcFormula(string,currentLine, currentCol){
        if (string[0]!=='=') return 'ERR'
        try {
        const formula=string.slice(1);
        return parseString(formula,0,{sign : 1, colName: ''});
        function parseString(string,result,buffer) {
            if (string.length == 0 ) {
                if (buffer.colName=='') return result
                else {
                    return addValue(string,result, buffer);
                }
            }
            if (string[0] == '-' || string[0] == '+') { 

                return addValue(string,result, buffer);
            }
            if (string[0].match(/[a-zA-Z]/) && (buffer.colName=='' || buffer.match(/[a-zA-Z]/))) {
                buffer.colName=buffer.colName+string[0];
                if (buffer.sign === undefined) buffer.sign=1;
                return parseString(string.slice(1), result, buffer);
            }
            if ((!isNaN(string[0]) || string[0]=='.') && (buffer.colName=='' || !isNaN(buffer.colName))) {
                buffer.colName=buffer.colName+string[0];
                if (buffer.sign === undefined) buffer.sign=1;
                return parseString(string.slice(1), result, buffer);
            } else return 'ERR'
        }
        function addValue(string,result, buffer) {
            if (buffer.colName!=='' || buffer.colName!==undefined) {
                if (!isNaN(buffer.colName)) {
                        result=result+parseFloat(buffer.colName)*buffer.sign
                    } else {
                        if (buffer.colName == currentCol) throw new Error('Cycle links')
                        checkCycleInFunctions(currentCol,buffer.colName);
                        result = result+parseFloat(store.tableData[currentLine][buffer.colName])*buffer.sign;
                    }
                    buffer.sign=1;
                }
                    buffer.colName = '';
                    if (string[0] == '-' || string[0] == '+') buffer.sign = (string[0] == '+') ? 1 : -1;
                    return parseString(string.slice(1), result, buffer)
        }

        /**Простая проверка используемой ячейки в формуле на зависимость от изначальной ячейки, глубина проверки зависимости - на один уровень вложения. 
         * TODO: сделать рекуррентную проверку зависимостей на полную глубину вложения */
        function checkCycleInFunctions(currCol,column) {
            if (!(store.headCellByKey(column).type == 'formula')) return;
            const string = store.headCellByKey(column).formula
            if (string.includes(currCol)) {
                const index = string.indexOf(currCol);
                if (string[index-1].match(/[a-zA-Z]/) || string[index+currCol.length].match(/[a-zA-Z]/)) {
                    return
                } else throw new Error('Cycle links')
            }
        }
        } catch (e){ return ('ERR'+e)}
    
    
    }
    

})

export default {
    store: store
}