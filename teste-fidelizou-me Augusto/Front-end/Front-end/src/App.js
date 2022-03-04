import axios from 'axios';
import React, {Fragment, useState, useEffect} from 'react';
import styled from 'styled-components';

//Mostrar a quantidade de itens selecionadas;
function ShowDatas (data, counter){
  let show = [];

  if (counter === 'ALL'){
    show = data;
  }

  if (data !== undefined && counter <= data.length){
    for (let i = 0; i < counter; i++) {
      show[i] = data[i];  
    }    
  } 

  if (data !== undefined && counter > data.length){
    for (let i = 0; i < data.length; i++) {
      show[i] = data[i];
    }   
  }
  return show;
}


//Filtrar a categoria selecionada pelo usuário;
function Search(data, select, search){
  let newData = [];
  let index = 0;
  JSON.stringify(sessionStorage.setItem('HistoricSearch', search));
  let histSearch = search;
  OpenSearch(select, search, histSearch);
   if ((search !== undefined) && (select === 'Nome')){
      data.map((data)=>{
        if (data.name !== undefined) {
          if(data.name.toUpperCase().includes(search.toUpperCase())) {
            newData[index] = data;
            index++;
            document.querySelector('#resultpesq').style.display = 'block'; 
            JSON.stringify(sessionStorage.setItem('index', index));
          } 
          return newData;              
        }         
      })
    } 
    else if ((search !== undefined) && (select === 'Endereço')){
      data.map((data)=>{
        if (data.address !== undefined) {
          if(data.address.toUpperCase().includes(search.toUpperCase())) {
            newData[index] = data;
            index++;
            document.querySelector('#resultpesq').style.display = 'block';
            JSON.stringify(sessionStorage.setItem('index', index));
          }    
          return newData;
        }         
      }) 
    } 
    else if ((search !== undefined) && (select === 'Estado')){
      data.map((data)=>{
        if (data.state !== undefined) {
          if(data.state.toUpperCase().includes(search.toUpperCase())) {
            newData[index] = data;
            index++;
            document.querySelector('#resultpesq').style.display = 'block';
            JSON.stringify(sessionStorage.setItem('index', index));
          }  
          return newData; 
        }         
      })
    } 
    return  newData;
}

//Abrir a aba para selecionar a pesquisa o botão para pesquisar e o número de itens encontrados na pesquisa
function OpenSearch (select, search, histSearch){
    if (select !== undefined){
    document.querySelector('#search').style.display = 'block';
    document.querySelector('#button').style.display = 'block';
  }

  if (select === '') {
    document.querySelector('#search').style.display = 'none';
    document.querySelector('#button').style.display = 'none';
  }
}

// Mostrar a lista na tela;
function SetDiv (datas) {   
  if (datas.length === 0){
    return <NoDates> <h1> Nenhum dado encontrado </h1> </NoDates>
  }

  if (datas !== undefined){
    return (
      datas.map((d, index) => (
        <Item key={index}>
          
          <Name> <strong> Name: </strong> { d.name || "--"}  </Name>
          <Category> <strong> Category:  </strong>  {d.category || "--"}  </Category>
          <City> <strong> City:  </strong>  {d.city || "--"}  </City>
          <Address> <strong> Address: </strong> {d.address || "--"} </Address>
          <State> <strong> State: </strong> {d.state || "--"} </State>
          <Country> <strong> Country: </strong> {d.country || "--"}  </Country>
          <Cordinates> <strong> Cordinates: </strong> {d.coordinates || "--"}  </Cordinates>
          <Ibu> <strong> Ibu: </strong> {d.ibu || "--"} </Ibu>
          <Abv> <strong> Abv: </strong> {d.abv || "--"} </Abv>
          <Description> <strong> Description: </strong> {d.description || "--"}  </Description>
          <Website> <strong> Website: </strong> {d.website || "--"}  </Website>
        </Item>
      ))
    )
  } 
}

function App(){ 
  const [data, setData] = useState([]);
  const [select, setSelect] = useState();
  const [search , setSearch] = useState();
  const [counter, setCounter] = useState(20);
  const [histSearch, setHist] = useState();

  //Pegar a lista completa ao abrir ao pagina;
 useEffect (()=>{
    getAllList();
  }, [counter, search, select])

  //Avançar mais 20 ou 50 itens;
  function AdicCounter(){
    let ctr = document.querySelector('#select');
    const i = ctr.value;  
    if (parseInt(i) === 20 || parseInt(i) === 0) {
      setCounter(parseInt(counter) + 20);      
    }
    if (parseInt(i) === 50){    
      setCounter(parseInt(counter) + 50);
    }  
  }
   
  //Adicionar HistoricSearch, o número de itens encontrados na pesquisa e adicionar aos dados para mostrar na tela;
  function AddSearch(){
    setHist(sessionStorage.getItem('HistoricSearch')); 
    setCounter(JSON.parse(sessionStorage.getItem('index')));
    JSON.stringify(sessionStorage.setItem('select', select));
    setData(Search(data, select, search));
    document.querySelector('#adic').style.display = 'none';
  }


  // Guardar lista completa;
  const getAllList = async () => {
    await axios.get(`http://localhost:3003/`)
    .then((e) => {
      // Aguardar enquanto não carrega a lista;
      if (data.length === 0){
        setData(e.data);
        return (<Fragment> Carregando </Fragment>)
      }

      //Reseta a lista quando trocar o select do tipo;
      let histSelect = sessionStorage.getItem('select')
      if (search === histSearch){
        if (select !== histSelect){
          setData(e.data);
        }
      }

      //Se o valor da pesquisa for diferente do valor que havia sido pesquisado pegar a lista toda para pesquisar novamente;
      if (search !== histSearch){
        setData(e.data);
      }
    })
    .catch(() => {
      //Se der problema no backend adiciona lista vazia
      setData([]);
    })
  }

  const addSelect = (value) => {
    setSelect(value);
    setCounter (20);
    setSearch('');
    document.querySelector('#adic').style.display = 'flex';
  }


  return (
    <Fragment>
      <Header>
        <h1>  Teste Front End  </h1>
      </Header>
      <DivUserSearch>
        <DivSearch>
          <strong> Filtrar por:  </strong>
          <DivSelect>
            <select name="select" value={select} onChange={e => addSelect(e.currentTarget.value)}> 
            <option value=''> Selecione o filtro  </option>
            <option value='Nome'> Nome </option>
            <option value='Endereço'> Endereço </option>
            <option value='Estado'> Estado </option>
            </select>      
          </DivSelect> 
        </DivSearch>         
        <DivUsers> 
          <strong>Número de usuários</strong>
          <DivSelect>  
          <select name="select" id="select" value={counter} onChange={ e => setCounter(e.currentTarget.value)} > 
            <option value={(counter === 40) ? 20 : 50} > --- </option>
            <option value={20}> 20 </option>
            <option value={50}> 50 </option>
            <option value='ALL'> Todos </option>        
          </select>
          </DivSelect>         
        </DivUsers>
      </DivUserSearch>

        <DivInput><strong>Filtrar por {select}: 
          <InputSearch type="text" id='search' placeholder="Buscar" value={search} onChange={ e => setSearch(e.currentTarget.value)} /></strong> 
          <DivButton> 
            <ButtonSearch id='button' onClick={(e)=> AddSearch()} > Filtrar </ButtonSearch> 
          </DivButton>
        </DivInput>   

        <ResultPesq id='resultpesq'> 
         <h2> {Search(data, select, search) ? ` Foram encontradas ${data.length} resultados da sua pesquisa` : ''} </h2>
        </ResultPesq> 

        {SetDiv(ShowDatas(data, counter))}

        <DivProxSelect>
          <ButtonPlus id='adic' onClick={(()=> AdicCounter(counter))}> Próximo </ButtonPlus>
        </DivProxSelect>

    </Fragment>
  )
}

export default App;

const Header = styled.div`
display: flex;
background: #938a8ac7;
justify-content: center;
align-items: center;
height: 60px;
margin-bottom: 10px;
border: solid;
`

const DivUserSearch = styled.div`
display: flex;
justify-content: space-around;`

const DivSearch = styled.div`
display:flex;
`


const DivSelect = styled.div`
text-align: center;
margin-left: 5px;
`

const DivProxSelect = styled.div`
display: flex;
justify-content: flex-end;
margin-top: -18px;
margin-right: 8px;
`

const ButtonPlus = styled.button`
display: flex;
text-align: center;
align-items: center;
color: #302c2c;
background: #4846466b;
border: solid 1px;
height: 25px;
width: 80px;
margin-top: 18px;
margin-left: 5px;
border-radius: 5px 5px;
justify-content: center;
box-shadow: 2px 2px 5px 2px grey;
cursor: pointer;
`

const DivUsers = styled.div`
display: flex;
margin-left: 2px;
`

const DivInput = styled.div`
display: flex;
margin-left: 31px;
margin-top: 15px;
`

const InputSearch = styled.input`
display: none;
margin-left: 3px;
border-radius: 5px 5px;
`

const DivButton = styled.div`
`

const ButtonSearch = styled.button`
display: none;
text-align: center;
color: #302c2c;
background: #4846466b;
border: solid 1px;
height: 18px;
width: 80px;
margin-top: 18px;
margin-left: 5px;
border-radius: 5px 5px;
justify-content: center;
cursor: pointer;
`

const ResultPesq = styled.div`
display: none;
text-align: center;
background: #80808080;
box-shadow: 0px 4px 5px 3px grey;
`

const Item = styled.div`
width: 75%;
background: #8080808f;
margin-top: 10px;
margin-left: 13%;
margin-right: 12%;
margin-bottom: 4px;
box-shadow: 0 4px 4px 0 rgb(0 0 0 / 10%), 0 5px 13px 0 #6d6868;
border-radius: 10px;
border: solid 1px;
`

const Abv = styled.div`
display: flex;
align-content: flex-start;
-ms-flex-pack: start;
justify-content: flex-start;
margin-top: -17px;
margin-left: 230px;
`

const Address = styled.div`
display: flex;
align-content: flex-start;
-ms-flex-pack: start;
justify-content: flex-start;
margin-top: -17px;
margin-left: 230px;
`

const Category = styled.div`
display: flex;
align-content: flex-start;
-ms-flex-pack: start;
justify-content: flex-start;
margin-top: -17px;
margin-left: 230px;
`

const City = styled.div`
display: flex;
margin-left: 10px;
`

const Cordinates = styled.div`
display:flex;
margin-left: 10px;
`

const Country = styled.div`
display: flex;
align-content: flex-start;
-ms-flex-pack: start;
justify-content: flex-start;
margin-top: -17px;
margin-left: 230px;
`

const Description = styled.div`
margin-left: 10px;
`

const Ibu = styled.div`
display: flex;
margin-left: 10px;
`

const Name = styled.div`
display: flex;
margin-left: 10px;
width: 50%;
`

const State = styled.div`
display: flex;
margin-left: 10px;
`

const Website = styled.div`
display: flex;
margin-left: 10px;
`

const NoDates = styled.div`
text-align: center;
font-size: 28px;
margin-top: 90px;
`
