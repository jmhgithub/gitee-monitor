require('../less/index.less'); //行间样式受限制不能添加伪类伪元素，所以还是添加了less(css)控制样式
import React from 'react';
import {Component} from 'react'
import ReactDom from 'react-dom';
import {createStore, combineReducers} from 'redux';

class ToDoList extends Component {
  addHandler(){ //添加待办事项的listener
    let Inp = this.refs.Inp; //获取真实DOM的输入value
    if(!Inp.value){ //如果没有输入值，直接返回
      return;
    }
    store.dispatch( //dispatch一个添加项目的action，并传入输入数据
      {
        type: 'ADD_ITEM',
        newItem: Inp.value
      }
    )
    Inp.value = ''; //提交后，清空输入
    Inp.focus(); //重置输入焦点
  }
  toggleHandler(item){ //Action Creator：负责提交切换中划线的action
    store.dispatch(
      {
        type: 'TOGGLE_ITEM',
        changeID: item.ID
      }
    );
  }
  showAllHandler(){ //Action Creator：负责showAll的action
    store.dispatch(
      {
        type: 'SET_FILTER',
        filter: 'SHOW_ALL'
      }
    );
  }
  showActiveHandler(){ //Action Creator：负责showActive的action
    store.dispatch(
      {
        type: 'SET_FILTER',
        filter: 'SHOW_ACTIVE'
      }
    );
  }
  showCrossedHandler(){ //Action Creator：负责showCrossed的action
    store.dispatch(
      {
        type: 'SET_FILTER',
        filter: 'SHOW_CROSSED'
      }
    );
  }
  render(){ //渲染结构样式
    let _this = this; //缓存this
    let state = store.getState(); //缓存store的快照--state
    let {list, option} = state; //解构赋值获取两个子state
    //list是一个数组，内部数组元素是对象表示每一个列表项
    //option是一个字符串，表示当先选择的选项
    switch(option){ //通过判断当前的option字符串来决定是否过滤list数组
      case 'SHOW_ACTIVE':
        list = list.filter(function(item){
          return !item.del;
        });
        break;
      case 'SHOW_CROSSED':
        list = list.filter(function(item){
          return item.del;
        });
        break;
    }
    document.body.addEventListener('keydown', function(e){
      if(e.which == 13){
        _this.addHandler();
      }
    }); //绑定键盘enter事件
    return (
      <div>
        <input type="text" ref="Inp"/> //设置ref属性为了获取真实DOM节点
        <button onClick={_this.addHandler.bind(_this)}>Add</button>
        <ul className="option">
          <li onClick={_this.showAllHandler.bind(_this)}>
            <span style={{textDecoration: option!='SHOW_ALL' ? 'underline' : 'none'}}>ShowAll</span>
          </li>
          <li onClick={_this.showActiveHandler.bind(_this)}>
            <span style={{textDecoration: option!='SHOW_ACTIVE' ? 'underline' : 'none'}}>ShowActive</span>
          </li>
          <li onClick={_this.showCrossedHandler.bind(_this)}>
            <span style={{textDecoration: option!='SHOW_CROSSED' ? 'underline' : 'none'}}>ShowCrossed</span>
          </li> //判断option字符串来决定三个选项的样式
        </ul>
        <ul className="list">
          {
            list.map(function(item, index){ //通过list数组map映射为虚拟DOM节点
              return <li key={index}>
                        <span style={{textDecoration: item.del ? 'line-through': 'none'}} 
                        onClick={_this.toggleHandler.bind(_this, item)}>{item.item}</span>
                     </li>
            })
          }
        </ul>
      </div>
    )
  }
}
const list = (state = [], action) => { //list-reducer
  switch(action.type){
    case 'ADD_ITEM':
      return [
        ...state, 
        {
          item: action.newItem, //列表项内容
          ID: state.length, //列表项ID
          del: false //列表项是否已划掉
        }
      ];
    case 'TOGGLE_ITEM':
      return state.map((item)=>{
        return Object.assign({},item,{
          del: action.changeID == item.ID ? !item.del : item.del
        });
      });
    default:
      return state;
  }
}
const option = (state = 'SHOW_ALL', action) => { //option-reducer
  switch(action.type){
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
}
const reducer = combineReducers({list, option}); //利用redux库API-combineReducers()合并reducer
const store = createStore(reducer); //利用redux库API-createStore()创建store
const render = () => { //自定义的渲染函数
  ReactDom.render(
    <ToDoList/>,
    document.getElementById('root')
  );
}
store.subscribe(render); //绑定render函数，每次state更新时执行
render(); //首次渲染
