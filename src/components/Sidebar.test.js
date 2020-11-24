import React from 'react';
//import PropTypes from 'prop-types';
import SideBar from './SideBar';
import {render} from '@testing-library/react'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
it('renders without crashing',()=> {
//링크를 쓰려고 하면 라우터 마운트하고,  
    // const div=document.createElement('div');
    const snap=renderer.create(
      <BrowserRouter>
        <SideBar /> 
      </BrowserRouter>
    ).toJSON()
  
  })
