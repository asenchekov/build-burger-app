import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder.jsx';
import BuildControls from '../../components/Burger/BuildControls/BuildControls.jsx';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });

    it('should render <BuildControls /> when receiving ingredients.', () => {
        wrapper.setProps({ing: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});