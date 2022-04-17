import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import { createServer, Model } from 'miragejs';

const keyLocalStorage = 'key';

createServer({
  models:{
    transaction: Model,
  },
  routes(){
    this.namespace = 'api';
    this.get('/transactions', () => {
      const transactions = localStorage.getItem(keyLocalStorage);
     
      if(transactions){
         return {transactions: JSON.parse(transactions)};
      }
      return(
        this.schema.all('transaction')
      );
    })
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return this.schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

