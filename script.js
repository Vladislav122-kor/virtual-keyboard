

const container = document.createElement('div');
container.classList.add('container');
document.body.appendChild(container);

const wrap = document.createElement('div');
wrap.classList.add('wrap');
container.appendChild(wrap);

const h2 = document.createElement('h2');
h2.classList.add('name');
wrap.appendChild(h2);
h2.innerHTML = 'RSS Виртуальная клавиатура';

const textArea = document.createElement('textarea');
wrap.appendChild(textArea);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
wrap.appendChild(keyboard);

const p = document.createElement('p');
p.classList.add('text');
wrap.appendChild(p);
p.innerHTML = 'Клавиатура создана в операционной системе Windows </br>Для переключения языка комбинация: левыe ctrl + alt';


let placeholder = '';
let ctrlIsPressed = false;
let shiftIsPressed = false;
if (!localStorage.getItem('lang')) {
    localStorage.setItem("lang", 'english');
}

document.onkeydown = function() {
        return false;
}


class Keyboard {
    constructor(value) {
        this.english = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 
        'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 
        'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#9650', 'Shift', 'Ctrl', 
        'Win', 'Alt', '', 'Alt', '&#9664', '&#9660', '&#9654', 'Ctrl'];
        this.russian = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 
        'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 
        'л', 'д', 'ж', "э", 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650', 'Shift', 'Ctrl', 
        'Win', 'Alt', '', 'Alt', '&#9664', '&#9660', '&#9654', 'Ctrl'];
        this.englishShift = ['~', '!', '@', '#', '$', '%', '^', '&#949', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Q', 
        'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 
        'J', 'K', 'L', ':', '"', 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '&#706', '&#707', '?', '&#9650', 'Shift', 'Ctrl', 
        'Win', 'Alt', '', 'Alt', '&#9664', '&#9660', '&#9654', 'Ctrl']; 	
        this.russianShift = ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Й', 
        'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 
        'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '&#9650', 'Shift', 'Ctrl', 
        'Win', 'Alt', '', 'Alt', '&#9664', '&#9660', '&#9654', 'Ctrl'];
        this.code = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 
        'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 
        'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 
        'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', "Quote", 'Enter', 'ShiftLeft', 
        'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 
        'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 
        'ControlRight'];
        this.arrows = [60, 62];
        this.dark = [13, 14, 28, 29, 41, 42, 53, 54, 55, 56, 57, 59, 60, 61, 62, 63];
        this.long = [13, 29, 42];
        this.middle = [41, 54];
        this.small = [14];
        this.value = value;
    }

    makeKeyboard() {
        for (let i = 0; i < this[localStorage.getItem('lang')].length; i++) {
            let key = document.createElement('div');
            key.classList.add('keys');
            key.setAttribute('data-code', [this.code[i]]);
            if (this.dark.includes(i)) { key.classList.add('dark') }
            if (this.long.includes(i)) { key.classList.add('long') }
            if (this.middle.includes(i)) { key.classList.add('middle') }
            if (this.arrows.includes(i)) { 
                key.style.fontSize = '22px';
             }
            if (this.small.includes(i)) { key.classList.add('small') }
            if (i === 58) { key.classList.add('very_long') }
            keyboard.appendChild(key);
        }
        this.makeValues();
    }

    makeValues() {
        this.lang = localStorage.getItem('lang');
        let collection = document.querySelectorAll('.keys');
        if (shiftIsPressed) {
            if (localStorage.getItem('lang') === 'english' && document.querySelector('[data-code=CapsLock]').className !== 'keys dark long active') {
                for (let i = 0; i < collection.length; i++) {
                    collection[i].innerHTML = this.englishShift[i];
                }
            }
            else if (localStorage.getItem('lang') === 'english' && document.querySelector('[data-code=CapsLock]').className === 'keys dark long active') {
                for (let i = 0; i < collection.length; i++) {
                    if (/^[a-zA-Z]+$/.test(this.englishShift[i]) && this.englishShift[i].length === 1) {
                        collection[i].innerHTML = this.englishShift[i].toLowerCase();
                    } else {
                        collection[i].innerHTML = this.englishShift[i];
                    }
                }
            }
            else if (localStorage.getItem('lang') === 'russian' && document.querySelector('[data-code=CapsLock]').className !== 'keys dark long active') {
                for (let i = 0; i < collection.length; i++) {
                    collection[i].innerHTML = this.russianShift[i];
                }
            }
            else if (localStorage.getItem('lang') === 'russian' && document.querySelector('[data-code=CapsLock]').className === 'keys dark long active') {
                for (let i = 0; i < collection.length; i++) {
                    if (/^[а-яёА-ЯЁ]+$/.test(this.russianShift[i]) && this.russianShift[i].length === 1) {
                        collection[i].innerHTML = this.russianShift[i].toLowerCase();
                    } else {
                        collection[i].innerHTML = this.russianShift[i];
                    }
                }
            }
        }
        else if (document.querySelector('[data-code=CapsLock]').className === 'keys dark long active') {
            for (let i = 0; i < collection.length; i++) {
                if (collection[i].innerHTML.length === 1 && /^[a-zA-Z]+$/.test(collection[i].innerHTML) || /^[а-яёА-ЯЁ]+$/.test(collection[i].innerHTML)) {
                    collection[i].innerHTML = this[localStorage.getItem('lang')][i].toUpperCase();
                } else {
                    collection[i].innerHTML = this[localStorage.getItem('lang')][i];
                }
            }
        } else {
            for (let i = 0; i < collection.length; i++) {
                collection[i].innerHTML = this[localStorage.getItem('lang')][i];
            }
        }
    }
    
    showValueMouse(value) {
        let cursor = textArea.selectionStart;
        if (value.target.className === 'keys') {
            placeholder = placeholder.slice(0, cursor) + value.target.innerHTML + placeholder.slice(cursor);
            cursor++;
        }
        else if (value.target.getAttribute('data-code') === 'Enter') {
            placeholder = placeholder.slice(0, cursor) + '\n' + placeholder.slice(cursor);
            cursor++;
        }
        else if (value.target.getAttribute('data-code') === 'ShiftLeft' || value.target.getAttribute('data-code') === 'ShiftRight') {
            shiftIsPressed = true;
            this.makeValues();
        }
        else if (value.target.getAttribute('data-code') === 'ArrowLeft') {
            if (cursor !== 0) { cursor-- }
        }
        else if (value.target.getAttribute('data-code') === 'ArrowRight') {
            cursor++;
        }
        else if (value.target.getAttribute('data-code') === 'ArrowUp') {
            let obj = {};
            let strings = 1;
            let elements = 1;
            for (let i = 0; i < placeholder.length; i++) {
                if (placeholder[i] === '\n') {
                    obj[strings] = elements;
                    elements = 0;
                    strings++;
                } 
                else if (i !== 0 && elements % 69 === 0) {
                    elements = 1;
                    strings++;
                } 
                obj[strings] = elements;
                elements++;
            }
            let count = 0;
            let last = '';
            for (let elem of Object.keys(obj)) {
                last = elem;
            }
            obj[last] = obj[last] + 1;
            for (let elem of Object.entries(obj)) {
                if (count !== false) {
                    count += elem[1];
                    if (cursor < count) {
                        if (elem[0] === '1') {
                            count = false;
                        } 
                        else if (obj[elem[0] - 1] - (elem[1] - (count - cursor)) <= 0) {
                            cursor = count - elem[1] - 1;
                            count = false;
                        }
                        else {
                            cursor -= obj[elem[0] - 1];
                            count = false;
                        }
                    }
                }
            }
        }
        else if (value.target.getAttribute('data-code') === 'ArrowDown') {
            let obj = {};
            let strings = 1;
            let elements = 1;
            for (let i = 0; i < placeholder.length; i++) {
                if (placeholder[i] === '\n') {
                    obj[strings] = elements;
                    elements = 0;
                    strings++;
                } 
                else if (i !== 0 && elements % 69 === 0) {
                    elements = 1;
                    strings++;
                } 
                obj[strings] = elements;
                elements++;
            }
            let count = 0;
            let last = '';
            for (let elem of Object.keys(obj)) {
                last = elem;
            }
            obj[last] = obj[last] + 1;
            console.log(obj);
            for (let elem of Object.entries(obj)) {
                if (count !== false) {
                    count += elem[1];
                    if (cursor < count) {
                        if (elem[0] === last) {
                            count = false;
                            console.log(0)
                        } 
                        else if (obj[+(elem[0]) + 1] - (elem[1] - (count - cursor)) <= 0) {
                            cursor += ((count - cursor - 1) + obj[+(elem[0]) + 1]);
                            count = false;
                            console.log(1)
                        }
                        else {
                            cursor += obj[+(elem[0])];
                            count = false;
                            console.log(2)
                        }
                    }
                }
            }
        }
        else if (value.target.getAttribute('data-code') === 'Space') {
            placeholder = placeholder.slice(0, cursor) + ' ' + placeholder.slice(cursor);
            cursor++;
        }
        else if (value.target.getAttribute('data-code') === 'Tab') {
            placeholder = placeholder.slice(0, cursor) + '    ' + placeholder.slice(cursor);
            cursor += 4;
        }
        else if (value.target.getAttribute('data-code') === 'Backspace') {
            if (cursor !== 0) {
                placeholder = placeholder.slice(0, cursor - 1) + placeholder.slice(cursor);
                cursor--;
            }
        }
        else if (value.target.getAttribute('data-code') === 'Delete') {
            if (cursor !== placeholder.length) {
                placeholder = placeholder.slice(0, cursor) + placeholder.slice(cursor + 1);
            }
        }
        else if (value.target.getAttribute('data-code') === 'CapsLock') {
            value.target.classList.toggle('active');
            this.makeValues();
        }
        textArea.onblur = function() {
            if (value.target.hasAttribute('data-code')) {
                textArea.focus();
            }
        };
        textArea.value = placeholder;
        textArea.setSelectionRange(cursor, cursor)
    }

    showValueMouseUp(value) {
        if (value.target.getAttribute('data-code') === 'ShiftLeft' || value.target.getAttribute('data-code') === 'ShiftRight') {
            shiftIsPressed = false;
            this.makeValues();
        }
    }

    showValueKeyboardDown(event) {
        let cursor = textArea.selectionStart;
        let element = document.querySelector(`[data-code=${event.code}]`);
        if (event.code === 'Enter') {
            placeholder = placeholder.slice(0, cursor) + '\n' + placeholder.slice(cursor);
            cursor++;
        }
        else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
            shiftIsPressed = true;
            this.makeValues();
        }
        else if (event.code === 'ArrowLeft') {
            if (cursor !== 0) { cursor-- }
        }
        else if (event.code === 'ArrowRight') {
            cursor++;
        }
        else if (event.code === 'ArrowUp') {
            let obj = {};
            let strings = 1;
            let elements = 1;
            for (let i = 0; i < placeholder.length; i++) {
                if (placeholder[i] === '\n') {
                    obj[strings] = elements;
                    elements = 0;
                    strings++;
                } 
                else if (i !== 0 && elements % 69 === 0) {
                    elements = 1;
                    strings++;
                } 
                obj[strings] = elements;
                elements++;
            }
            let count = 0;
            let last = '';
            for (let elem of Object.keys(obj)) {
                last = elem;
            }
            obj[last] = obj[last] + 1;
            for (let elem of Object.entries(obj)) {
                if (count !== false) {
                    count += elem[1];
                    if (cursor < count) {
                        if (elem[0] === '1') {
                            count = false;
                        } 
                        else if (obj[elem[0] - 1] - (elem[1] - (count - cursor)) <= 0) {
                            cursor = count - elem[1] - 1;
                            count = false;
                        }
                        else {
                            cursor -= obj[elem[0] - 1];
                            count = false;
                        }
                    }
                }
            }
        }
        else if (event.code === 'ArrowDown') {
            let obj = {};
            let strings = 1;
            let elements = 1;
            for (let i = 0; i < placeholder.length; i++) {
                if (placeholder[i] === '\n') {
                    obj[strings] = elements;
                    elements = 0;
                    strings++;
                } 
                else if (i !== 0 && elements % 69 === 0) {
                    elements = 1;
                    strings++;
                } 
                obj[strings] = elements;
                elements++;
            }
            let count = 0;
            let last = '';
            for (let elem of Object.keys(obj)) {
                last = elem;
            }
            obj[last] = obj[last] + 1;
            console.log(obj);
            for (let elem of Object.entries(obj)) {
                if (count !== false) {
                    count += elem[1];
                    if (cursor < count) {
                        if (elem[0] === last) {
                            count = false;
                            console.log(0)
                        } 
                        else if (obj[+(elem[0]) + 1] - (elem[1] - (count - cursor)) <= 0) {
                            cursor += ((count - cursor - 1) + obj[+(elem[0]) + 1]);
                            count = false;
                            console.log(1)
                        }
                        else {
                            cursor += obj[+(elem[0])];
                            count = false;
                            console.log(2)
                        }
                    }
                }
            }
        }
        else if (event.code === 'Space') {
            placeholder = placeholder.slice(0, cursor) + ' ' + placeholder.slice(cursor);
            cursor++;
        }
        else if (event.code === 'Tab') {
            placeholder = placeholder.slice(0, cursor) + '    ' + placeholder.slice(cursor);
            cursor += 4;
        }
        else if (event.code === 'Backspace') {
            if (cursor !== 0) {
                placeholder = placeholder.slice(0, cursor - 1) + placeholder.slice(cursor);
                cursor--;
            }
        }
        else if (event.code === 'Delete') {
            if (cursor !== placeholder.length) {
                placeholder = placeholder.slice(0, cursor) + placeholder.slice(cursor + 1);
            }
        }
        else if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
            ctrlIsPressed = true;
        }
        else if (ctrlIsPressed && event.code === 'AltLeft' || ctrlIsPressed && event.code === 'AltRight') {
            if (localStorage.getItem('lang') === 'russian') {
                localStorage.setItem("lang", 'english');
            } else {
                localStorage.setItem("lang", 'russian');
            }
            this.makeValues();
        }
        else if (element.className === 'keys' || element.className === 'keys active') {
            placeholder = placeholder.slice(0, cursor) + element.innerHTML + placeholder.slice(cursor);
            cursor++;
        }
        if (event.code === 'CapsLock') {
            element.classList.toggle('active');
            this.makeValues();
        } else {
            element.classList.add('active');
        }
        textArea.value = placeholder;
        textArea.setSelectionRange(cursor, cursor);
    }

    showValueKeyboardUp(event) {
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
            shiftIsPressed = false;
            this.makeValues();
        }
        if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
            ctrlIsPressed = false;
        }
        if (event.code !== 'CapsLock') {
            let element = document.querySelector(`[data-code=${event.code}]`);
            element.classList.remove('active');
        }
    }
}


(new Keyboard()).makeKeyboard();

keyboard.addEventListener("mousedown", function(){
    new Keyboard().showValueMouse(event);
}, false);

keyboard.addEventListener("mouseup", function(){
    new Keyboard().showValueMouseUp(event);
}, false);

document.addEventListener("keydown", function(){
    new Keyboard().showValueKeyboardDown(event);
}, false);

document.addEventListener("keyup", function(){
    new Keyboard().showValueKeyboardUp(event);
}, false);












