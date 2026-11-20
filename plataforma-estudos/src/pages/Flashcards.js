
import { useState, useEffect } from 'react';
import styles from './Flashcards.module.css';
import { requisicaoComToken } from '../services/api';
import ButtonGoBack from '../layout/ButtonGoBack'

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

    const [formularioCardAberto, setFormularioCardAberto] = useState(false);
    const [pergunta, setPergunta] = useState('');
    const [resposta, setResposta] = useState('');
    const [salvandoCard, setSalvandoCard] = useState(false);

    const aluno = JSON.parse(localStorage.getItem('dados') || '{}');
    const token = localStorage.getItem('token');

    useEffect(() => {
        getCategorias();
    }, []);

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
            const resposta = await requisicaoComToken(
                `/categoria/id_aluno/${aluno.id_aluno}`,
                {
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

            const categoriasNormalizadas = (dados.categoria || []).map(categoria => ({
                ...categoria,
                id_categoria: Number(categoria.id_categoria),
                id_categoria_pai:
                    categoria.id_categoria_pai == null
                        ? null
                        : Number(categoria.id_categoria_pai),
                quantidade_cards: Number(categoria.quantidade_cards) || 0
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

            await getCategorias();
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

            const resposta = await requisicaoComToken(
                `/card/id_aluno/${aluno.id_aluno}/id_categoria/${categoria.id_categoria}`,
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

            setCards(Array.isArray(dados.card) ? dados.card : []);

        } catch (err) {
            console.error(err);
            setErro('Não foi possível carregar os flashcards.');
        } finally {
            setCarregandoCards(false);
        }
    }

    // Revelar ou ocultar resposta
    function revelarCard(id) {
        setCardsRevelados(prev =>
            prev.includes(id)
                ? prev.filter(cardId => cardId !== id)
                : [...prev, id]
        );
    }

    // Voltar para as categorias
    function voltarCategorias() {
        setCategoriaSelecionada(null);
        setCards([]);
        setCardsRevelados([]);
        setErro('');
    }

    // Abrir ou fechar categoria
    function alternarCategoria(id) {
        setCategoriasAbertas(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    }

    // Organizar categorias e subcategorias
    function renderCategorias(idPai = null, nivel = 0) {
        return categorias
            .filter(categoria => categoria.id_categoria_pai === idPai)
            .map(categoria => {
                const abertas = categoriasAbertas.includes(
                    categoria.id_categoria
                );

                const possuiFilhas = categorias.some(
                    item => item.id_categoria_pai === categoria.id_categoria
                );

                return (
                    <div
                        key={categoria.id_categoria}
                        className={styles.categoria}
                        style={{ marginLeft: `${nivel * 20}px` }}
                    >
                        <div className={styles.categoria_linha}>
                                {possuiFilhas && (
                                <button
                                    className={styles.btnRevelarSubCategorias}
                                    type="button"
                                    onClick={() => alternarCategoria(categoria.id_categoria)}
                                >
                                    <span>
                                        {abertas ? '▼' : '▶'}
                                    </span>
                                </button>
                            )}

                            <button
                                type="button"
                                className={styles.btnCategoria}
                                onClick={() => getCards(categoria)}
                            >
                                <span>{categoria.nome}</span>

                                <span className={styles.quantidadeCards}>
                                    {categoria.quantidade_cards} cards
                                </span>
                            </button>
                        </div>

                        {abertas && possuiFilhas && (
                            <div className={styles.subcategorias}>
                                {renderCategorias(
                                    categoria.id_categoria,
                                    nivel + 1
                                )}
                            </div>
                        )}
                    </div>
                );
            });
    }

    async function criarCard() {
        try {
            setErro('');

            if (!pergunta.trim() || !resposta.trim()) {
                setErro('Preencha a pergunta e a resposta.');
                return;
            }

            setSalvandoCard(true);

            const requisicao = await requisicaoComToken('/card', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_aluno: aluno.id_aluno,
                    id_categoria: categoriaSelecionada.id_categoria,
                    pergunta: pergunta.trim(),
                    resposta: resposta.trim()
                })
            });

            const dados = await requisicao.json();

            if (!requisicao.ok || !dados.status) {
                throw new Error(
                    dados.mensagem || dados.msg || 'Erro ao cadastrar flashcard.'
                );
            }

            setPergunta('');
            setResposta('');
            setFormularioCardAberto(false);

            await getCards(categoriaSelecionada);
            await getCategorias();

        } catch (err) {
            console.error(err);
            setErro(err.message || 'Não foi possível cadastrar o flashcard.');
        } finally {
            setSalvandoCard(false);
        }
    }

    return (
        <main className={styles.home}>

            {!categoriaSelecionada ? (
                <>
                    <header className={styles.cabecalho}>
                        <h1>Meus Flashcards</h1>

                        <button
                            type="button"
                            onClick={abrirFormulario}
                            className={styles.btnAdicionar}
                        >
                            + Nova categoria
                        </button>
                    </header>

                    {formularioAberto && (
                        <section className={styles.formulario}>
                            <h2>Nova categoria</h2>

                            <input
                                type="text"
                                placeholder="Nome da categoria"
                                value={nomeCategoria}
                                onChange={e => setNomeCategoria(e.target.value)}
                            />

                            <select
                                value={categoriaPai}
                                onChange={e => setCategoriaPai(e.target.value)}
                            >
                                <option value="">Categoria principal</option>

                                {categorias.map(categoria => (
                                    <option
                                        key={categoria.id_categoria}
                                        value={categoria.id_categoria}
                                    >
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>

                            <button
                                type="button"
                                onClick={criarCategoria}
                                disabled={salvandoCategoria}
                            >
                                {salvandoCategoria ? 'Salvando...' : 'Salvar'}
                            </button>

                            <button
                                type="button"
                                onClick={fecharFormulario}
                            >
                                Cancelar
                            </button>
                        </section>
                    )}

                    {erro && (
                        <p className={styles.erro}>{erro}</p>
                    )}

                    {carregandoCategorias ? (
                        <p>Carregando categorias...</p>
                    ) : categorias.length === 0 ? (
                        <p>Nenhuma categoria cadastrada.</p>
                    ) : (
                        <section className={styles.listaCategorias}>
                            {renderCategorias()}
                        </section>
                    )}
                </>
            ) : (
                <>
                    <header className={styles.cabecalho}>
                        <ButtonGoBack
                            className={styles.btnVoltar}
                            onClick={voltarCategorias}
                        />

                        <h1>{categoriaSelecionada.nome}</h1>
                        <button
                            type="button"
                            onClick={() => {
                                setErro('');
                                setFormularioCardAberto(!formularioCardAberto);
                            }}
                            className={styles.btnAdicionar}
                        >
                            + Novo flashcard
                        </button>
                        {formularioCardAberto && (
                            <section className={styles.formulario}>
                                <h2>Novo flashcard</h2>

                                <input
                                    type="text"
                                    placeholder="Digite a pergunta"
                                    value={pergunta}
                                    onChange={e => setPergunta(e.target.value)}
                                />

                                <textarea
                                    placeholder="Digite a resposta"
                                    value={resposta}
                                    onChange={e => setResposta(e.target.value)}
                                />

                                <button
                                    type="button"
                                    onClick={criarCard}
                                    disabled={salvandoCard}
                                >
                                    {salvandoCard ? 'Salvando...' : 'Salvar flashcard'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setFormularioCardAberto(false);
                                        setPergunta('');
                                        setResposta('');
                                        setErro('');
                                    }}
                                >
                                    Cancelar
                                </button>
                            </section>
                        )}
                    </header>

                    {erro && (
                        <p className={styles.erro}>{erro}</p>
                    )}

                    {carregandoCards ? (
                        <p>Carregando flashcards...</p>
                    ) : cards.length === 0 ? (
                        <p>Nenhum flashcard cadastrado nesta categoria.</p>
                    ) : (
                        <>
                            <p className={styles.contador}>
                                {cards.length} flashcards
                                {' • '}
                                {cardsRevelados.length} revelados
                            </p>

                            <section className={styles.gradeCards}>
                                {cards.map(card => {
                                    const revelado = cardsRevelados.includes(
                                        card.id_card
                                    );

                                    return (
                                        <article
                                            key={card.id_card}
                                            className={`${styles.card} ${
                                                revelado ? styles.revelado : ''
                                            }`}
                                            onClick={() =>
                                                revelarCard(card.id_card)
                                            }
                                        >
                                            <span className={styles.cardTitulo}>
                                                {revelado ? 'RESPOSTA' : 'PERGUNTA'}
                                            </span>

                                            <div className={styles.cardConteudo}>
                                                {revelado
                                                    ? card.resposta
                                                    : card.pergunta}
                                            </div>

                                            <span className={styles.cardRodape}>
                                                {revelado
                                                    ? 'Clique para ocultar'
                                                    : 'Clique para revelar'}
                                            </span>
                                        </article>
                                    );
                                })}
                            </section>
                        </>
                    )}
                </>
            )}
        </main>
    );
}

export default Flashcards;
