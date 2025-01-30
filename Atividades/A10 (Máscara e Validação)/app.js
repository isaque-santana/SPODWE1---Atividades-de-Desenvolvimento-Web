const masks = {
    cpf(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    },
    phone(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    },
    cep(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1');
    },
    date(value) {
        return value
            .replace(/\D+/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\/\d{2})(\d)/, '$1/$2')
            .replace(/(\/\d{4})\d+?$/, '$1');
    }
};

document.querySelectorAll('input[data-js]').forEach($input => {
    const field = $input.dataset.js;
    
    $input.addEventListener('input', e => {
        e.target.value = masks[field](e.target.value);
        validateInput(e.target);
    }, false);

    // Definir borda preta inicialmente
    $input.style.borderColor = 'black';
});

function validateInput(input) {
    if (input.value.trim() === '') {
        input.style.borderColor = 'black';
    } else {
        input.style.borderColor = 'green';
    }
}

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;
    
    document.querySelectorAll('input[data-js]').forEach(input => {
        if (input.value.trim() === '') {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = 'green';
        }
    });
    
    if (isValid) {
        alert('Formulário enviado com sucesso!');
    }
    const mensagemDiv = document.getElementById('mensagem');

    if (isValid) {
        mensagemDiv.style.color = 'green';
        mensagemDiv.innerHTML = 'Cadastro realizado com sucesso!';
    } else {
        mensagemDiv.style.color = 'red';
        mensagemDiv.innerHTML = 'Por favor, preencha todos os campos corretamente.';
    }
});
