
const API_URL = 'http://localhost:3000';

let renovacaoEmAndamento = null;

async function renovarToken() {
    if (!renovacaoEmAndamento) {
        renovacaoEmAndamento = fetch(`${API_URL}/alunos/refresh`, {
            method: 'POST',
            credentials: 'include'
        })
        .then(async (res) => {
            const dados = await res.json();

            if (!res.ok || !dados.status) {
                throw new Error('Sessão expirada.');
            }

            localStorage.setItem('token', dados.token);

            return dados.token;
        })
        .finally(() => {
            renovacaoEmAndamento = null;
        });
    }

    return renovacaoEmAndamento;
}

export async function requisicaoComToken(url, options = {}) {
    const fazerRequisicao = (token) => {
        const headers = new Headers(options.headers || {});

        headers.set('Authorization', `Bearer ${token}`);

        return fetch(`${API_URL}${url}`, {
            ...options,
            headers,
            credentials: 'include'
        });
    };

    let token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Usuário não autenticado.');
    }

    let resposta = await fazerRequisicao(token);

    if (resposta.status === 401) {
        try {
            token = await renovarToken();

            resposta = await fazerRequisicao(token);

        } catch (err) {
            localStorage.removeItem('token');
            localStorage.removeItem('dados');

            window.location.href = '/';

            throw err;
        }
    }

    return resposta;
}