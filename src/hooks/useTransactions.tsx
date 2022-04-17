import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const keyLocalStorage = 'key';

interface ITransaction {
    id: number;
    title: string;
    value: number;
    category: string;
    type: 'deposit' | 'withdraw';
    createdAt: Date;
}

interface ITransactionInput {
  title: string;
  value: number;
  category: string;
  type: 'deposit' | 'withdraw';
}

interface ITransactionContextData {
  transactions: ITransaction[];
  createTransaction: (transaction: ITransactionInput) => Promise<void>;
}

interface ITransactionsProviderProps{
    children: ReactNode;
}

const TransactionsContext = createContext<ITransactionContextData>({} as ITransactionContextData);


export function TransactionsProvider({ children }: ITransactionsProviderProps) {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    useEffect(() => {
    api.get('transactions').then(response => setTransactions(response.data.transactions))
    }, []);

    async function createTransaction(transactionInput: ITransactionInput){
      const response = await api.post('transactions', {...transactionInput, createdAt: new Date()});
      setTransactions([...transactions, response.data.transaction]);
      console.log([...transactions, response.data.transaction])
      localStorage.setItem(keyLocalStorage, JSON.stringify([...transactions, response.data.transaction]));
    }
    

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
          {children}
        </TransactionsContext.Provider>  
      )
}   

export function useTransactions(){
  const context = useContext(TransactionsContext);

  return context;
}
