import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    // constructor(props) {
    //   super();
    //   // привязка this к классу (1 вариант)
    //   //this.goToStore = this.goToStore.bind(this);
    // }
    goToStore(event) {
      event.preventDefault();
      const storeId = this.storeInput.value; // получаем значение по ref
      this.props.history.push(`/store/${storeId}`); // переходим по маршруту /store/что-то_там
    }

    render() {
      return (
        <form className="store-selector" onSubmit={(e) => this.goToStore(e)}> { /* привязка this к классу (2 вариант) */ }
            <h2>Please choose a store</h2>
            <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} /> { /* ref для ссылки на input */ }
            <button type="submit">Enter the store</button>
        </form>
      );
    }
}

export default StorePicker;