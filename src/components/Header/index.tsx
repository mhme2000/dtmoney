import { Container, Content } from "./styles";
import logoImg from '../../assets/logo.svg';

interface HeaderProps{
    onOpenNewTransactionModal : () => void;
    onClearTransactions : () => void;
}

export function Header({ onOpenNewTransactionModal, onClearTransactions } : HeaderProps) {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="logo dtmoney" />
                <button onClick={onClearTransactions}>
                    Clear transactions
                </button>
                <button onClick={onOpenNewTransactionModal}>
                    New transaction
                </button>             
            </Content>
        </Container>
    );
}