import React from 'react';


class Home extends React.Component{
  constructor(props){
    super(props);

    this.state = {

    }


  }

  componentDidMount(){
    
   
  }

  
  render(){
  	let id = 4;
    return (
      <>
      	<h3>Домашня сторінка</h3>
        <hr/>
        <p> Ласкаво просимо до WEB-застосунку SMART Ranch. </p>
        <p> Ви можете увійти до свого профілю натиснувши пункт в меню "Профіль", або переглянути/змінити параметри системи, обравши один із пунктів меню ліворуч від "Профіль."</p>
      </>
    );
  }
}

export default Home;
