
import FormularioCadastro from '../components/FormCadastro';
import styles from './Configuracoes.module.css';
import { useParams, Link } from "react-router-dom";
import { FaUserCog, FaLock } from "react-icons/fa";

function Configuracoes() {
  const { tipoUsuario } = useParams();
  const prefix = `/menu/${tipoUsuario}/configuracoes`;

  const menuItems = [
    { path: `personalizar`, label: "Personalizar", icon: <FaUserCog /> },
    { path: `senha`, label: "Mudar Senha", icon: <FaLock /> },
  ];

  return (
    <aside className={styles.menuConfiguracoes}>
      <nav className={styles.navConfiguracoes}>
        {menuItems.map(({ path, label, icon }) => (
          <Link
            key={path}
            to={path}
            className={styles.itemConfiguracoes}
          >
            <span className={styles.iconeConfiguracoes}>{icon}</span>
            <span className={styles.textoConfiguracoes}>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Configuracoes;
