import styles from './Configuracoes.module.css';
import { Link, useLocation } from "react-router-dom";
import { FaUserCog, FaLock } from "react-icons/fa";

import ConteudoConfiguracoes from './ConteudoConfiguracoes';

function Configuracoes() {
    const location = useLocation();

    const prefix = "/menu/aluno/configuracoes";

    const menuItems = [
        { path: "personalizar", label: "Personalizar", icon: <FaUserCog /> },
        { path: "senha", label: "Mudar Senha", icon: <FaLock /> },
    ];

    const ultimaParte = location.pathname.split("/").filter(Boolean).pop();

    const opcao = ultimaParte === "configuracoes"
        ? "personalizar"
        : ultimaParte;

    console.log("Opção selecionada:", opcao);

    return (
        <div className={styles.containerConfiguracoes}>

            <aside className={styles.menuConfiguracoes}>
                <nav className={styles.navConfiguracoes}>
                    {menuItems.map(({ path, label, icon }) => (
                        <Link
                            key={path}
                            to={`${prefix}/${path}`}
                            className={styles.itemConfiguracoes}
                        >
                            <span className={styles.iconeConfiguracoes}>
                                {icon}
                            </span>

                            <span className={styles.textoConfiguracoes}>
                                {label}
                            </span>
                        </Link>
                    ))}
                </nav>
            </aside>

            <main className={styles.conteudoConfiguracoes}>
                <ConteudoConfiguracoes opcao={opcao} />
            </main>

        </div>
    );
}

export default Configuracoes;