import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

export class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                this.setState({loading: false});
                // console.log(res.data);
                let fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    render() {
        // console.log(this.state.orders);
        let ordersList = [];
        if(this.state.loading) {
            ordersList = <Spinner />;
        } else {
            ordersList = this.state.orders.map(order => {
                // console.log(order);
                return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />;
        });
        }
        return (
        <div>
            {ordersList}
        </div>
        )
    }
}

export default withErrorHandler(Orders, axios);
