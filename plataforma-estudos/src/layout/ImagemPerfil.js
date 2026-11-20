
import { useState, useEffect } from 'react';
import styles from './ImagemPerfil.module.css';

function ImagemPerfil({ imagemPerfil: imagemInicial, className }) {
    const [imagem, setImagem] = useState(imagemInicial);

    // Atualiza quando a propriedade recebida mudar
    useEffect(() => {
        setImagem(imagemInicial);
    }, [imagemInicial]);

    // Escuta alterações de imagem em outros componentes
    useEffect(() => {
        function atualizarImagem(event) {
            setImagem(event.detail);
        }

        window.addEventListener('atualizarImagemPerfil', atualizarImagem);

        return () => {
            window.removeEventListener('atualizarImagemPerfil', atualizarImagem);
        };
    }, []);

    // Verifica se existe uma imagem
    if (!imagem) {
        return (
            <div className={className || styles.semImagem}>
                Sem imagem
            </div>
        );
    }

    let src;

    // Caso a imagem já seja uma string
    if (typeof imagem === 'string') {
        src = imagem.startsWith('data:') || imagem.startsWith('blob:')
            ? imagem
            : `data:image/jpeg;base64,${imagem}`;

    // Caso a imagem venha como Buffer do backend
    } else if (imagem.type === 'Buffer' && Array.isArray(imagem.data)) {
        const bytes = new Uint8Array(imagem.data);

        let binario = '';

        bytes.forEach(byte => {
            binario += String.fromCharCode(byte);
        });

        const base64 = btoa(binario);

        src = `data:image/jpeg;base64,${base64}`;

    } else {
        console.error('Formato de imagem inválido:', imagem);

        return (
            <div className={className || styles.semImagem}>
                Sem imagem
            </div>
        );
    }

    return (
        <img
            src={src}
            alt="Imagem de perfil"
            className={className || styles.imagem}
        />
    );
}

export default ImagemPerfil;