import Modal from "react-modal";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const {createTransaction} = useTransactions();
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState<'deposit' | 'withdraw'>('deposit');

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();
        await createTransaction({
            title,
            value,
            category,
            type
        })
        setTitle('');
        setValue(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">
            <button className="react-modal-close" onClick={onRequestClose}>
                <img src={closeImg} alt="Close modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Create transaction</h2>
                <input
                    placeholder="Title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                <input
                    type="number"
                    placeholder="Value" 
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    />
                <TransactionTypeContainer>
                    <RadioBox isActive={type === 'deposit'} type="button" onClick={() => setType('deposit')} activeColor="green">
                        <img src={incomeImg} alt='Income' />
                        <span>Income</span>
                    </RadioBox>
                    <RadioBox isActive={type === 'withdraw'} type="button" onClick={() => setType('withdraw')} activeColor="red">
                        <img src={outcomeImg} alt='Outcome' />
                        <span>Outcome</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input
                    placeholder="Category" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    />
                <button type="submit">
                    Save
                </button>
            </ Container>
        </Modal>
    );
}