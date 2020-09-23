class Usuarios {
  constructor() {
    this.usuarios = JSON.parse(localStorage.getItem("usuarios"));
    this.table = document.getElementById("usuarios-table");
    this.tableBody = document.querySelector("#usuarios-table tbody");
    this.listarUsuarios();
  }
  async getUsuarios() {
    try {
      const resposta = await fetch(
        "https://private-21e8de-rafaellucio.apiary-mock.com/users"
      );
      const data = resposta.json();
      return data;
    } catch (erro) {
      return erro;
    }
  }

  async listarUsuarios() {
    try {
      if (this.usuarios === null) {
        const usuarios = await this.getUsuarios();
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
      }

      if (Array.isArray(this.usuarios) && this.usuarios.length === 0) {
        this.tableBody.remove();
        const mensagemNenhumUsuario = `<div class="center height-100">
                                      <h3>Nenhum usuário cadastrado.</h3>
				              	             </div>`;

        this.table.insertAdjacentHTML("beforeend", mensagemNenhumUsuario);
      }

      this.usuarios = JSON.parse(localStorage.getItem("usuarios"));

      this.usuarios.forEach((usuario, index) => {
        const itemTableBody = `<tr>
								  	          <td>${usuario.name}</td>
								  	          <td>${usuario.cpf}</td>
								  	          <td>${usuario.phone}</td>
                              <td>${usuario.email}</td>
                              <td>
                                <span><div class="btn-excluir" data-index='${index}'><img src="../assets/images/delete.svg"></div></span>
                              </td>
				              	   </tr>`;

        this.tableBody.insertAdjacentHTML("beforeend", itemTableBody);
      });

      document.querySelectorAll(".btn-excluir").forEach((btnExcluir) => {
        btnExcluir.addEventListener("click", this.deletarUsuario.bind(this));
      });
    } catch (erro) {
      return erro;
    }
  }

  deletarUsuario(e) {
    const targetIndex = e.currentTarget.dataset.index;
    this.usuarios.splice(targetIndex, 1);
    this.tableBody.innerHTML = "";
    localStorage.setItem("usuarios", JSON.stringify(this.usuarios));
    this.listarUsuarios();
  }
}

new Usuarios();
