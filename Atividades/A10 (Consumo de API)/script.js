function buscarCEP() {
    let cep = document.getElementById("cep").value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length !== 8) {
        document.getElementById("resultado").innerHTML = "<p style='color: red;'>CEP inválido! Digite 8 números.</p>";
        return;
    }

    let url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                document.getElementById("resultado").innerHTML = "<p style='color: red;'>CEP não encontrado!</p>";
            } else {
                document.getElementById("resultado").innerHTML = `
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Rua:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade} - ${data.uf}</p>
                `;
            }
        })
        .catch(() => {
            document.getElementById("resultado").innerHTML = "<p style='color: red;'>Erro ao buscar o CEP.</p>";
        });
}
