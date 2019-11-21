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

var formDef2 =
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {label:'Зарегистрироваться:',kind:'submit'},
];


let siteForm = document.getElementById('site-data-form');
let userForm = document.getElementById('user-data-form');


function createForm(form, data) {
	for(let item of data) {
		console.log(item);
      
        var DOMElement = '';
        switch(item.kind) {
            case 'longtext': DOMElement = createFieldLongText(item.label, item.name); break;
            case 'shorttext': DOMElement = createFieldShortText(item.label, item.name); break;
            case 'number': DOMElement = createFieldNumber(item.label, item.name); break;
            case 'combo':  DOMElement = createFieldSelect(item.label, item.name, item.variants); break;
            case 'radio':  DOMElement = createFieldRadio(item.label, item.name, item.variants); break;
            case 'check': DOMElement = createFieldCheckbox(item.label, item.name); break;
            case 'memo':  DOMElement = createFieldTextarea(item.label, item.name); break;
            case 'submit': DOMElement = createFieldSubmit(item.label, item.name); break;
            default: break;
        }
      
        if(DOMElement) {
            form.appendChild(DOMElement);
        }
      
	}
}


function createFieldLongText(label, name) {
    var field = document.createElement('div');
    var tagLabel = `<label>${label}</label>`;
    var tagInput = `<input type="text" name="${name}" style="width: 350px"/>`;

    field.innerHTML += `${tagLabel}${tagInput}`;
    return field;
}

function createFieldShortText(label, name) {
    var field = document.createElement('div');
    var tagLabel = `<label>${label}</label>`;
    var tagInput = `<input type="text" name="${name}" style="width: 150px"/>`;

    field.innerHTML += `${tagLabel}${tagInput}`;
    return field;
}

function createFieldNumber(label, name) {
    var field = document.createElement('div');
    var tagLabel = `<label>${label}</label>`;
    var tagInput = `<input type="number" name="${name}" style="width: 80px"/>`;

    field.innerHTML += `${tagLabel}${tagInput}`;
    return field;
}

function createFieldSelect(label, name, variants) {
    var field = document.createElement('div');
    var tagLabel = `<label>${label}</label>`;
    var tagSelect = document.createElement('select');
    tagSelect.setAttribute('name', name);

    var options = '';
    for(let key of variants) {
        options += `<option value="${key.value}">${key.text}</option>`
    }

    tagSelect.innerHTML = `${options}`;
    field.innerHTML = `${tagLabel}${tagSelect.outerHTML}`;
    return field;
}

function createFieldRadio(label, name, variants) {
    var field = document.createElement('div');
    var tagLabel = `<label>${label}</label>`;

    var radioButtons = '';
    for(let key of variants) {
        radioButtons += `<input type="radio" name="${name}" value="${key.value}"><span>${key.text}</span>`;
    }

    field.innerHTML = `${tagLabel}${radioButtons}`;
    return field;
}

function createFieldCheckbox(label, name) {
    var field = document.createElement('div');
    var tagLabel = `<label>${label}</label>`;
    var tagInput = `<input type="checkbox" name="${name}" checked/>`;

    field.innerHTML += `${tagLabel}${tagInput}`;
    return field;
}

function createFieldTextarea(label, name) {
    var field = document.createElement('div');
    var tagLabel = `<label style="display: block">${label}</label>`;
    var tagInput = `<textarea type="checkbox" name="${name}" rows="4" cols="50"/></textarea>`;

    field.innerHTML += `${tagLabel}${tagInput}`;
    return field;
}

function createFieldSubmit(label, name) {
    var field = document.createElement('div');
    field.innerHTML += `<input type="submit" value="${label.substring(0, label.length - 1)}"/>`;
    return field;
}


createForm(siteForm, formDef1);
createForm(userForm, formDef2);