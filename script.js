

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
        'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '', 'Shift', 'Ctrl', 
        'Win', 'Alt', '', 'Alt', '', '', '', 'Ctrl'];
        this.russian = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'й', 'ц', 
        'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 
        'л', 'д', 'ж', "э", 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '', 'Shift', 'Ctrl', 
        'Win', 'Alt', '', 'Alt', '', '', '', 'Ctrl'];
        this.code = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 
        'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 
        'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 
        'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', "Quote", 'Enter', 'ShiftLeft', 
        'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 
        'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 
        'ControlRight'];
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
            if (this.small.includes(i)) { key.classList.add('small') }
            if (i === 58) { key.classList.add('very_long') }
            keyboard.appendChild(key);
        }
        this.makeValues();
    }

    makeValues() {
        this.lang = localStorage.getItem('lang');
        let collection = document.querySelectorAll('.keys');
        for (let i = 0; i < collection.length; i++) {
            collection[i].innerHTML = this[localStorage.getItem('lang')][i];
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
        textArea.onblur = function() {
            if (value.target.hasAttribute('data-code')) {
                textArea.focus();
            }
        };
        textArea.value = placeholder;
        textArea.setSelectionRange(cursor, cursor)
    }

    showValueKeyboardDown(event) {
        let cursor = textArea.selectionStart;
        let element = document.querySelector(`[data-code=${event.code}]`);
        if (event.code === 'Enter') {
            placeholder = placeholder.slice(0, cursor) + '\n' + placeholder.slice(cursor);
            cursor++;
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
        else if (event.code === 'ControlLeft') {
            ctrlIsPressed = true;
        }
        else if (ctrlIsPressed && event.code === 'AltLeft') {
            if (localStorage.getItem('lang') === 'russian') {
                localStorage.setItem("lang", 'english');
            } else {
                localStorage.setItem("lang", 'russian');
            }
            this.makeValues();
        }
        else if (element.className === 'keys') {
            placeholder = placeholder.slice(0, cursor) + element.innerHTML + placeholder.slice(cursor);
            cursor++;
        }
        element.classList.add('active');
        textArea.value = placeholder;
        textArea.setSelectionRange(cursor, cursor)
    }

    showValueKeyboardUp(event) {
        if (event.code === 'ControlLeft') {
            ctrlIsPressed = false;
        }
        let element = document.querySelector(`[data-code=${event.code}]`);
        element.classList.remove('active');
    }
}


(new Keyboard()).makeKeyboard();

keyboard.addEventListener("mousedown", function(){
    new Keyboard().showValueMouse(event);
}, false);

document.addEventListener("keydown", function(){
    new Keyboard().showValueKeyboardDown(event);
}, false);

document.addEventListener("keyup", function(){
    new Keyboard().showValueKeyboardUp(event);
}, false);












