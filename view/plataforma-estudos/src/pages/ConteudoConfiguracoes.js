import MudarSenha from "../configuracoes/MudarSenha";
import Personalizar from "../configuracoes/Personalizar";

function ConteudoConfiguracoes({ opcao }) {
    switch (opcao) {
        case "personalizar":
            return <Personalizar />;

        case "senha":
            return <MudarSenha />;
        default:
            return <div>Rota não encontrada</div>;
    }
}

export default ConteudoConfiguracoes;