import React, {useState, useEffect} from 'react';
import Sidebar from '../../components/sidebar-left';
import Header from '../../components/header';
import Autocomplete from '../../components/autocomplete';
import axios from 'axios';
import './index.scss';
import userEvent from '@testing-library/user-event';

const Dashboard = (props) => {

  const [searchedResult, setSearchedResult] = useState(null);

  const getAppHeaderJSX = () => {
    return (
      <>
        <Header headerTitle={'Settings > Dialogues'} />
      </>
    )
  }

  const getAppSidebarJSX = () => {
    return (
      <div className="side-panel">
        <Sidebar></Sidebar>
      </div>
    )
  }

  const searchTodoData = ()=>{
    axios.get('https://jsonplaceholder.typicode.com/todos', {
    })
    .then(function (response) {
      let actualData = response.data.map((ele => ele.title))
      setSearchedResult(actualData)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <div className="dashboard__page-conatiner -site-text-size">
      {getAppSidebarJSX()}
      <div className="main-body">
        {getAppHeaderJSX()}
        <Autocomplete 
        searchValueProps={(e)=>searchTodoData()} 
        searchedResult={searchedResult && JSON.stringify(searchedResult)} 
        options={searchedResult}
        ></Autocomplete>
      </div>
    </div>
  );
}

export default Dashboard;


