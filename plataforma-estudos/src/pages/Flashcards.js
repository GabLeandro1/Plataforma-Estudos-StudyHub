
import { useState, useEffect } from 'react';
import styles from './Flashcards.module.css';
import { requisicaoComToken } from '../services/api';

function Flashcards() {
    // Estados do formulário
    const [formularioAberto, setFormularioAberto] = useState(false);
    const [nomeCategoria, setNomeCategoria] = useState('');
    const [categoriaPai, setCategoriaPai] = useState('');

    // Estados das categorias e flashcards
    const [categorias, setCategorias] = useState([]);
    const [cards, setCards] = useState([]);

    const [categoriasAbertas, setCategoriasAbertas] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
    const [cardsRevelados, setCardsRevelados] = useState([]);

    // Estados de carregamento e erros
    const [erro, setErro] = useState('');
    const [carregandoCategorias, setCarregandoCategorias] = useState(true);
    const [carregandoCards, setCarregandoCards] = useState(false);
    const [salvandoCategoria, setSalvandoCategoria] = useState(false);

    const aluno = JSON.parse(localStorage.getItem('dados') || '{}');
    const token = localStorage.getItem('token');

    // Abrir formulário
    function abrirFormulario() {
        setErro('');
        setFormularioAberto(true);
    }

    // Fechar formulário
    function fecharFormulario() {
        setFormularioAberto(false);
        setNomeCategoria('');
        setCategoriaPai('');
        setErro('');
    }

    // Buscar categorias do aluno
    async function getCategorias() {
        try {
            const resposta = await requisicaoComToken(`/categoria/id_aluno/${aluno.id_aluno}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                }
            );

            if (!resposta.ok) {
                throw new Error('Falha ao buscar categorias.');
            }

            const dados = await resposta.json();

            const categoriasNormalizadas = dados.categoria.map(categoria => ({
                ...categoria,
                id_categoria: Number(categoria.id_categoria),
                id_categoria_pai:
                    categoria.id_categoria_pai == null
                        ? null
                        : Number(categoria.id_categoria_pai)
            }));

            setCategorias(categoriasNormalizadas);

        } catch (err) {
            console.error(err);
            setErro('Não foi possível carregar as categorias.');
        } finally {
            setCarregandoCategorias(false);
        }
    }

    // Criar categoria
    async function criarCategoria() {
        try {
            setErro('');

            if (!nomeCategoria.trim()) {
                setErro('Digite o nome da categoria.');
                return;
            }

            setSalvandoCategoria(true);

            const resposta = await requisicaoComToken('/categoria',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        id_aluno: aluno.id_aluno,
                        id_categoria_pai:
                            categoriaPai === '' ? null : Number(categoriaPai),
                        nome: nomeCategoria.trim()
                    })
                }
            );

            const dados = await resposta.json();

            if (!resposta.ok || !dados.status) {
                throw new Error(
                    dados.mensagem || 'Não foi possível criar a categoria.'
                );
            }

            // Atualizar categorias após o cadastro
            await getCategorias();

            // Fechar formulário e limpar campos
            fecharFormulario();

        } catch (err) {
            console.error(err);
            setErro(err.message || 'Erro ao cadastrar categoria.');
        } finally {
            setSalvandoCategoria(false);
        }
    }

    // Buscar flashcards de uma categoria
    async function getCards(categoria) {
        try {
            setCarregandoCards(true);
            setErro('');

            setCategoriaSelecionada(categoria);
            setCards([]);
            setCardsRevelados([]);

            const resposta = await requisicaoComToken(`/card/${categoria.id_categoria}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!resposta.ok) {
                throw new Error('Falha ao buscar flashcards.');
            }

            const dados = await resposta.json();

            setCards(dados);

        } catch (err) {
            console.error(err);
            setErro('Não foi possível carregar os flashcards.');
        } finally {
            setCarregandoCards(false);
        }
    }
}

export default Flashcards;