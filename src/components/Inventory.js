// Склад
import React from 'react';
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import { app } from '../base';


class Inventory extends React.Component {
    constructor() {
        super();
        this.renderInventory = this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.logout = this.logout.bind(this);
        this.state = { // изначальное состояние
            uid: null, // пользователь не зашел
            owner: null // пользователь не владелец БД
        };
    }

    // после того как отрендерился компонент...
    componentDidMount() {
        app.auth().onAuthStateChanged((user, error) => {
            if(user) { // ...проверяем, входил ли до этого пользователь
                this.authHandler(user);
            }
        });
    }

    handleChange(e, key) { // обработчик изменения инпутов
        const fish = this.props.fishes[key];
        // обновить состояние
        const updatedFish = {
            ...fish, // берем старый объект...
            [e.target.name]: e.target.value // ... и обновляем вычисленное свойство значением из инпута
        };
        this.props.updateFish(key, updatedFish);
    }

    renderLogin() { // рендеринг панели для входа
        return(
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in to manage your store's inventory</p>
                <button className="github" onClick={() => this.authenticate('github')}>Log In With Github</button>
                <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In With Facebook</button>
                <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In With Twitter</button>
            </nav>
        )
    }

    authenticate(provider) { // функция аутентификации
        function getProvider(provider) { // вернуть нужный инстанс провайдера firebase
            switch(provider) {
                case 'facebook':
                  return (new firebase.auth.FacebookAuthProvider());
                case 'github':
                  return (new firebase.auth.GithubAuthProvider());
                case 'twitter':
                  return (new firebase.auth.TwitterAuthProvider());
            }
        }
        app.auth() // аутентификация
            .signInWithPopup(getProvider(provider)) // вход с помощью провайдера
            .then((authData) => { // успех
                this.authHandler(authData.user);
            }).catch((error) => { // ошибка
                console.log(error);
            });
    }

    logout() { // выйти из аккаунта
        app.auth()
            .signOut()
            .then(() => {
                this.setState({
                    uid: null
                });
            });
    }

    authHandler(user) {
        // взять информацию о складе
        const storeRef = app.database().ref(this.props.storeId);
        // запрос в СУБД
        storeRef.once('value', (snapshot) => {
        const data = snapshot.val() || {}; // берем данные
        // если владельца нет, то устанавливаем пользователя в качестве владельца
        if(!data.owner) {
            storeRef.set({ // запись в БД
                owner: user.uid
            });
        }

        this.setState({ // обновляем состояние
            uid: user.uid,
            owner: data.owner || user.uid // новый владелец или старый
        });
    });
    }

    renderInventory(key) { // рендеринг каждого элемента склада
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input 
                    name="name" 
                    type="text" 
                    value={fish.name} 
                    placeholder="Fish Name"
                    onChange={(e) => this.handleChange(e, key)}
                />
                <input 
                    name="price" 
                    type="text" 
                    value={fish.price} 
                    placeholder="Fish Price"
                    onChange={(e) => this.handleChange(e, key)}
                />
                <select 
                    name="status"
                    type="text"
                    value={fish.status}
                    placeholder="Fish Status"
                    onChange={(e) => this.handleChange(e, key)}
                >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea 
                    name="desc" 
                    type="text" 
                    value={fish.desc} 
                    placeholder="Fish Desc"
                    onChange={(e) => this.handleChange(e, key)}
                />
                <input
                    name="image" 
                    type="text" 
                    value={fish.image} 
                    placeholder="Fish Image"
                    onChange={(e) => this.handleChange(e, key)}
                />
                <button onClick={(e) => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }
    render() {
        const logout = (<button onClick={() => this.logout()}>Log Out</button>);

        // если пользователь не зашел
        if(!this.state.uid) {
            return <div>{this.renderLogin()}</div>
        }

        // если зашедший пользователь не является владельцем БД
        if(this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you aren't the owner of the store</p>
                    {logout}
                </div>
            )
        }

        return (
            <div>
                <h2>Inventory</h2>
                {logout}
                { Object.keys(this.props.fishes).map(this.renderInventory) }
                <AddFishForm addFish={ this.props.addFish } />
                <button onClick={ this.props.loadSamples }>Load Sample Fishes</button>
            </div>
        )
    }
}

Inventory.propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired,
}

export default Inventory;