const App = {
  //Carrega o acesso ao DOM  (o que está entre aspas dentro dos parenteses modificar) 
  input: document.getElementById('mainText'),
  btnEncript: document.querySelector('.criptografar'),
  btnDecript: document.querySelector('.descriptografar'),
  btnCopy: document.querySelector('.copy'),
  output: document.querySelector('.outputText'),

  //Chaves de criptografia que utilizaremos:
  keys: {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat',
  },

   //funcao encript
  encript(text) {
    var chars = App.keys;
    App.output.innerHTML = text.replace(/[aeiou]/g, (m) => chars[m]);
  },


   //funcao decript
  decript(text) {
    //Inverte o objeto App.keys Ex: {a:"ai"} => {ai:"a"}  
    const flip = (data) =>
      Object.fromEntries(
        Object.entries(data).map(([key, value]) => [value, key])
      );
    var chars = flip(App.keys);
    App.output.innerHTML = text.replace(
      /(ai|enter|imes|ober|ufat)/g,
      (m) => chars[m]
    );
  },
    //funcao copiar
  copy(text) {
    try {
      navigator.clipboard.writeText(text);
      App.btnCopy.childNodes[1].classList.remove('bi-clipboard');
      App.btnCopy.childNodes[1].classList.add('bi-clipboard-check');
      App.btnCopy.classList.add('check');
      App.btnCopy.childNodes[3].innerText = 'Copiado';
    } catch (err) {
      console.log('Copia do texto falhou: ' + err);
    }
  },

  //alterna o botão copiar
  copyToggle() {
    App.output.innerHTML != ''
      ? App.btnCopy.classList.add('show')
      : App.btnCopy.classList.remove('show');
    App.btnCopy.classList.remove('check');
    App.btnCopy.childNodes[1].classList.remove('bi-clipboard-check');
    App.btnCopy.childNodes[1].classList.add('bi-clipboard');
    App.btnCopy.childNodes[3].innerText = 'Copiar';
  },

 //Inicializa
  init() {
    //Adiciona os listeners (ouvintes) aos botôes
    App.input.addEventListener('keyup', () => {
      App.btnCopy.classList.remove('show');
    });

    App.btnEncript.addEventListener('click', () => {
      App.encript(App.input.value);
      App.copyToggle();
    });


   App.btnDecript.addEventListener('click', () => {
      App.decript(App.input.value);
      App.copyToggle();
    });

    App.btnCopy.addEventListener('click', () => {
      App.copy(App.output.innerHTML);
      App.input.value = '';
    });
  },
};

//carrega o script após a pagina carregar por completo
window.onload = App.init();
