import './App.css';
import React from 'react';
import BillGenerateTracker from './billgeneratetracker';
import ExpenseTracker from './expensetracker';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function App() {
  return (
    <div className="App">
      <div className='top-container'>
      <Tabs
      defaultActiveKey="expense"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="expense" title="Expense Tracker">
        <ExpenseTracker/>
      </Tab>
      <Tab eventKey="bill" title="Bill Generator">
       <BillGenerateTracker/>
      </Tab>

    </Tabs>
      </div>

     

</div>


  );
}

export default App;
