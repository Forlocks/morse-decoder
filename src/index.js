const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    let arr = new Array(expr.length / 10); // Создаём пустой двумерный массив нужной длины
    for (let i = 0; i < arr.length; i++) {
        arr[i] = [];
    }

    let dec;
    for (let i = 0; i < expr.length; i++) { // Записываем в каждый вложенный массив по 10 символов исходной строки
        if (i % 10 === 0) {
            dec = i / 10;
        }
        arr[dec].push(expr[i]);
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === "*") { // Декодируем пробелы
            arr[i] = [' '];
        } else {
            for (let j = 0; j < arr[i].length; j++) { // Избавляемся от лишних нулей в каждом подмассиве c "0" и "1"
                if (arr[i][j] === '0') {
                    arr[i].shift();
                    j--;
                } else {
                    break;
                }
            }

            for (let j = 0; j < arr[i].length; j++) { // Превращаем каждый подмассив в последовательность "." и "-"
                if (arr[i][j] + arr[i][j + 1] === '10') {
                    arr[i].shift();
                    arr[i].shift();
                    arr[i].push('.');
                    j--;
                } else if (arr[i][j] + arr[i][j + 1] === '11') {
                    arr[i].shift();
                    arr[i].shift();
                    arr[i].push('-');
                    j--;
                }
            }
        }
    }

    let result = [];
    for (let i = 0; i < arr.length; i++) { // Перемещаем всё из старого массива в новый, где каждый элемент - строка
        result.push(arr[i].join(''));
        arr.shift();
        i--;
    }

    for (let i = 0; i < result.length; i++) { // Декодируем каждый элемент массива
        for (let key in MORSE_TABLE) {
            if (result[i] === key) {
                result[i] = MORSE_TABLE[key];
                break;
            }
        }
    }

    result = result.join(''); // Объединяем все декодированные элементы в одну результирующую строку

    console.log(result);
    return result;
}

module.exports = {
    decode
}