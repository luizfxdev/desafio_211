// Classe base Component
class Component {
  #element = null;

  constructor(tag, parent, options) {
    this.tag = tag;
    this.parent = parent;
    this.options = options;
    this.build();
  }

  getElement() {
    return this.#element;
  }

  build() {
    this.#element = document.createElement(this.tag);
    Object.assign(this.#element, this.options);
    return this;
  }

  render() {
    if (this.parent instanceof Component) {
      this.parent.getElement().append(this.#element);
    } else {
      document.querySelector(this.parent).append(this.#element);
    }
  }
}

// Classe Input que estende Component
class Input extends Component {
  constructor(parent, options) {
    super('input', parent, options);
  }
}

// Classe Label que estende Component
class Label extends Component {
  constructor(text, parent, options) {
    super('label', parent, Object.assign({}, options, { textContent: text }));
  }
}

// Classe Form que estende Component
class Form extends Component {
  constructor(parent, options) {
    super('form', parent, options);
  }

  addChildren(...children) {
    children.forEach(child => {
      this.getElement().appendChild(child.getElement());
    });
  }
}

// Classe Button que estende Component
class Button extends Component {
  constructor(text, parent, options) {
    super('button', parent, Object.assign({}, options, { textContent: text }));
  }
}

// Implementação
document.addEventListener('DOMContentLoaded', () => {
  const el = new Component('h1', 'body', { innerText: 'Formulário de Cadastro' });
  el.tag = 'h2';
  el.build().render();

  const form = new Form('body', { id: 'myForm' });

  // Campos do formulário
  const labelName = new Label('Nome:', form, { htmlFor: 'nameInput' });
  const inputName = new Input(form, { id: 'nameInput', name: 'name', required: true });

  const labelBirthday = new Label('Data de Nascimento:', form, { htmlFor: 'birthdayInput' });
  const inputBirthday = new Input(form, { id: 'birthdayInput', name: 'birthday', type: 'date' });

  // Botão de submit
  const submitButton = new Button('Enviar', form, {
    type: 'button',
    onclick: () => {
      const formData = {
        name: document.getElementById('nameInput').value,
        birthday: document.getElementById('birthdayInput').value
      };
      console.log('Dados do formulário:', formData);
      alert(`Dados enviados!\nNome: ${formData.name}\nData: ${formData.birthday}`);
    }
  });

  // Renderização
  form.render();
  labelName.render();
  form.addChildren(
    inputName,
    new Component('br', form, {}),
    new Component('br', form, {}),
    labelBirthday,
    inputBirthday,
    new Component('br', form, {}),
    new Component('br', form, {}),
    submitButton
  );
});
