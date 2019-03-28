import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
    state ={
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: ''
        }
    }

    render () {
        return (
            <div>
                <h4>Enter your Contact Data</h4>
                <form action="">
                    <input type="text" name="name" placeholder="Your name" />
                    <input type="text" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Your Street" />
                    <input type="text" name="postal" placeholder="Post Code" />
                </form>
                <Button btnType="Success">ORDER</Button>
            </div>
        );
    }

}

export default ContactData;