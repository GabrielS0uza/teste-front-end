class Cadastro {
  constructor() {
    this.usuarios = JSON.parse(localStorage.getItem("usuarios"));
    this.inputNome = document.getElementById("nome");
    this.inputEmail = document.getElementById("email");
    this.inputCpf = document.getElementById("cpf");
    this.inputTelefone = document.getElementById("telefone");
    this.erroMensagemNome = this.inputNome.nextElementSibling;
    this.erroMensagemEmail = this.inputEmail.nextElementSibling;
    this.erroMensagemCpf = this.inputCpf.nextElementSibling;
    this.erroMensagemTelefone = this.inputTelefone.nextElementSibling;
    this.loader = document.querySelector(".loader");
    this.labelCadastrar = document.getElementById("label-cadastrar");
    this.btnCadastrar = document.querySelector(".btn-cadastrar");
    this.btnCadastrar.addEventListener("click", this.validar.bind(this));
    this.btnCadastrar.addEventListener("click", this.cadastrar.bind(this));
  }

  validar() {
    const isInputNomeValido = /[0-9a-zA-Z]{3,}/.test(this.inputNome.value);
    const isInputEmailValido = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      this.inputEmail.value
    );
    const isInputCpfValido = /(\d{3})(\d{3})(\d{3})(\d{2})/.test(
      this.inputCpf.value
    );
    const isInputTelefoneValido = /^1\d\d(\d\d)?$|^0800 ?\d{3} ?\d{4}$|^(\(0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d\) ?|0?([1-9a-zA-Z][0-9a-zA-Z])?[1-9]\d[ .-]?)?(9|9[ .-])?[2-9]\d{3}[ .-]?\d{4}$/.test(
      this.inputTelefone.value
    );

    if (!isInputNomeValido) {
      this.inputNome.classList.add("erro-input");
      this.erroMensagemNome.classList.remove("hide");
    } else {
      this.inputNome.classList.remove("erro-input");
      this.erroMensagemNome.classList.add("hide");
    }

    if (!isInputEmailValido) {
      this.inputEmail.classList.add("erro-input");
      this.erroMensagemEmail.classList.remove("hide");
    } else {
      this.inputEmail.classList.remove("erro-input");
      this.erroMensagemEmail.classList.add("hide");
    }

    if (!isInputCpfValido) {
      this.inputCpf.classList.add("erro-input");
      this.erroMensagemCpf.classList.remove("hide");
    } else {
      this.inputCpf.classList.remove("erro-input");
      this.erroMensagemCpf.classList.add("hide");
    }

    if (!isInputTelefoneValido) {
      this.inputTelefone.classList.add("erro-input");
      this.erroMensagemTelefone.classList.remove("hide");
    } else {
      this.inputTelefone.classList.remove("erro-input");
      this.erroMensagemTelefone.classList.add("hide");
    }

    this.temErros = document.querySelectorAll(".erro-input");
  }

  limparFormulario() {
    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";
  }

  cadastrar() {
    if (this.temErros.length === 0) {
      this.loader.classList.remove("hide");
      this.labelCadastrar.classList.add("hide");

      this.usuario = {
        name: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        phone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
      };

      if (this.usuarios !== null) {
        this.usuarios.push(this.usuario);
      } else {
        this.usuarios = [];
        this.usuarios.push(this.usuario);
      }

      localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
      setTimeout(() => {
        this.loader.classList.add("hide");
        this.labelCadastrar.classList.remove("hide");
        this.limparFormulario();
      }, 1000);
    }
  }
}

new Cadastro();
