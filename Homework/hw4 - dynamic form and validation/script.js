var formDef1 =
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
  {label:'Размещение:',kind:'radio',name:'payment',
    variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
  {label:'Разрешить отзывы:',kind:'check',name:'votes'},
  {label:'Описание сайта:',kind:'memo',name:'description'},
  {label:'Опубликовать:',kind:'submit'},
];

let siteForm = document.forms['site-data'];


function createForm(form, data) {
	for(let item of data) {     
        var DOMElement = '';
        switch(item.kind) {
            case 'longtext': DOMElement = createFieldLongText(item.name); break;
            case 'shorttext': DOMElement = createFieldShortText(item.name); break;
            case 'number': DOMElement = createFieldNumber(item.name); break;
            case 'combo': DOMElement = createFieldSelect(item.name, item.variants); break;
            case 'radio': DOMElement = createFieldRadio(item.name, item.variants); break;
            case 'check': DOMElement = createFieldCheckbox(item.name); break;
            case 'memo': DOMElement = createFieldTextarea(item.name, item.label); break;
            case 'submit': DOMElement = createFieldSubmit(item.name, item.label); break;
            default: break;
        }

        if(DOMElement) {
            var field = document.createElement('div');
            if(item.kind == 'submit' || item.kind == 'memo') {
                field.innerHTML += DOMElement;
            } else {
                field.innerHTML += `<label>${item.label}</label>${DOMElement}`;
            }
            form.appendChild(field);
        }
	}
}


function createFieldLongText(name) {
    var tagInput = `<input type="text" name="${name}" class="input-data" style="width: 350px"/>`;
    return tagInput;
}

function createFieldShortText(name) {
    var tagInput = `<input type="text" name="${name}" class="input-data" style="width: 150px"/>`;
    return tagInput;
}

function createFieldNumber(name) {
    var tagInput = `<input type="number" name="${name}" class="input-data" style="width: 80px"/>`;
    return tagInput;
}

function createFieldSelect(name, variants) {
    var tagSelect = document.createElement('select');
    tagSelect.setAttribute('name', name);

    var options = '';
    for(let key of variants) {
        options += `<option value="${key.value}">${key.text}</option>`
    }

    tagSelect.innerHTML = `${options}`;
    return tagSelect.outerHTML;
}

function createFieldRadio(name, variants) {
    var radioButtons = '';
    for(let key of variants) {
        radioButtons += `<input type="radio" name="${name}" value="${key.value}"><span>${key.text}</span>`;
    }
    return radioButtons;
}

function createFieldCheckbox(name) {
    var tagInput = `<input type="checkbox" name="${name}" checked/>`;
    return tagInput;
}

function createFieldTextarea(name, label) {
    var tagLabel = `<label style="display: block">${label}</label>`
    var tagTextarea = `<textarea name="${name}" class="input-data" rows="4" cols="60"/></textarea>`;
    return `${tagLabel}${tagTextarea}`;
}

function createFieldSubmit(name, label) {
    var TagButton = `<input type="button" value="${label.substring(0, label.length - 1)}"/>`;
    return TagButton;
}


createForm(siteForm, formDef1);


////// validate
var isErrorExist = false;
function validateTextInput(input) {
    if(input.value == '') {
        setError(input, 'Заполните поле');
        isErrorExist = true;
    } else {
        removeError(input);
        isErrorExist = false;
    }
}

function validateTextInputAll(inputArr) {
    for(let input of inputArr) {
        validateTextInput(input);
    }
}

function validateRadio() {
    var radios = document.getElementsByName('payment');
    var isChecked = false;
    for(let radio of radios) {
        if(radio.type == 'radio' && radio.checked) {
            isChecked = true;
            removeError(radio);
            isErrorExist = false;
        }
    }
    if(!isChecked) {
        setError(radios[0], 'Выберите один из вариантов');
        isErrorExist = true;
    }
}


function setError(input, textError) {
    if(input.parentNode.querySelector('.error')) {
        return;
    }
    input.parentNode.classList.add('error');
    let span = document.createElement('span');
    span.innerHTML = textError;
    span.classList.add('error');
    input.parentNode.appendChild(span);
}

function removeError(input) {
    input.parentNode.classList.remove('error');
    var spanError = input.parentNode.querySelector('.error');
    if(spanError) {
        spanError.remove();
    }
}


siteForm.querySelectorAll('.input-data').forEach( function(item) {
    item.addEventListener('blur', function(e) {
        validateTextInput(e.target);
    });
});

siteForm.querySelectorAll('input[type=radio][name="payment"]').forEach( function(item) {
    item.addEventListener('change', function() {
        validateRadio();
    });
});


siteForm.querySelector('input[type=button]').addEventListener('click', function() {
    validateTextInputAll(siteForm.querySelectorAll('.input-data'));
    validateRadio();
    if(!isErrorExist) {
        siteForm.reset();
        siteForm.submit();
    }
});