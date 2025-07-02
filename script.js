/**
 * Classe base para componentes do DOM
 */
class Component {
  #element; // Campo privado para armazenar o elemento DOM

  constructor() {
    this.#element = null;
  }

  get element() {
    return this.#element;
  }

  build() {
    throw new Error('O método "build" deve ser implementado pelas subclasses');
  }

  render(parent) {
    if (!(parent instanceof HTMLElement)) {
      throw new Error('O parent deve ser um elemento DOM');
    }
    if (!this.#element) {
      this.build();
    }
    parent.appendChild(this.#element);
  }

  _setElement(element) {
    this.#element = element;
  }
}

/**
 * Classe para elementos de input
 */
class Input extends Component {
  constructor(type, name, placeholder = '') {
    super();
    this.type = type;
    this.name = name;
    this.placeholder = placeholder;
    this.build();
  }

  build() {
    const input = document.createElement('input');
    input.type = this.type;
    input.name = this.name;
    input.placeholder = this.placeholder;

    if (this.type === 'submit') {
      input.value = this.placeholder;
    }

    this._setElement(input);
  }
}

/**
 * Classe para elementos de label
 */
class Label extends Component {
  constructor(text, htmlFor = '') {
    super();
    this.text = text;
    this.htmlFor = htmlFor;
    this.build();
  }

  build() {
    const label = document.createElement('label');
    label.textContent = this.text;

    if (this.htmlFor) {
      label.htmlFor = this.htmlFor;
    }

    this._setElement(label);
  }
}

/**
 * Classe para elementos de formulário
 */
class Form extends Component {
  constructor(id) {
    super();
    this.id = id;
    this.children = [];
    this.build();
  }

  build() {
    const form = document.createElement('form');
    form.id = this.id;

    this.children.forEach(child => {
      form.appendChild(child.element);
    });

    this._setElement(form);
  }

  addChildren(...children) {
    children.forEach(child => {
      if (!(child instanceof Component)) {
        throw new Error('Todos os filhos devem ser instâncias de Component ou suas subclasses');
      }
      this.children.push(child);
    });
    this.build();
  }
}
/**
 * Classe para elementos de formulário (atualizada)
 */
class Form extends Component {
  constructor(id) {
    super();
    this.id = id;
    this.children = [];
    this.build();
  }

  build() {
    const form = document.createElement('form');
    form.id = this.id;

    this.children.forEach(child => {
      form.appendChild(child.element);
    });

    // Adiciona event listener para submit
    form.addEventListener('submit', e => {
      e.preventDefault();
      this.handleSubmit();
    });

    this._setElement(form);
  }

  handleSubmit() {
    const formData = {};

    this.children.forEach(child => {
      if (child instanceof Input && child.type !== 'submit') {
        formData[child.name] = child.element.value;
      }
    });

    console.log('Dados do formulário:', formData);
    alert('Cadastro realizado com sucesso! Verifique o console.');
  }

  addChildren(...children) {
    children.forEach(child => {
      if (!(child instanceof Component)) {
        throw new Error('Todos os filhos devem ser instâncias de Component ou suas subclasses');
      }
      this.children.push(child);
    });
    this.build();
  }
}
