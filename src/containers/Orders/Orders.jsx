import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchOrders } from '../../store/actions/order';

export class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let ordersList = [];
        if(this.props.loading) {
            ordersList = <Spinner />;
        } else {
            ordersList = this.props.orders.map(order => {
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

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(fetchOrders())
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
