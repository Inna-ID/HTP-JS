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
      var field = document.createElement('div');
      // var label = document.createElement('label');
      // var input = document.createElement('input');
      var label = `<label>${item.label}</label>`;
      var input = `<input type="${item.kind}" name="${item.name}"/>`;
      

      var elementsArr = [label, input];

      form.appendChild(appendChildren(elementsArr, field));
	}
}

function appendChildren(elementsArr, parentElement) {

  for(let elem of elementsArr) {
      parentElement.appendChild(elem);
  }
  return parentElement;
}



createForm(siteForm, formDef1);