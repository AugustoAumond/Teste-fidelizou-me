import React, {Fragment, useState} from 'react';
import styled from 'styled-components';

function App(){ 
  const [coordenate, setCoordenate] = useState();
  const [coordenateR1, setCoordenateR1] = useState();
  const [x, setX] = useState();
  const [xR1 , setXR1] = useState();
  const [y, setY] = useState();
  const [yR1 , setYR1] = useState();
  const [moviment, setMoviment] = useState();
  const [test, setTest] =useState(true);
  const [i, setI] = useState(0);

    let divEnterX = document.querySelector('#DiventerX');
    let enterX = document.querySelector('#enterX');
    let divEnterY = document.querySelector('#DiventerY');
    const enterY = document.querySelector('#enterY');
    let divCoordenate = document.querySelector('#DivCoordenate'); 
    let buttonRoverTest = document.querySelector('#roverteste');
    let buttonAddCoordenate = document.querySelector('#addcordenate');
    let divMoviments = document.querySelector('#DivMoviments');
    let buttonAddRover = document.querySelector('#add');
    let buttonEnd = document.querySelector('#endrover');
    let divEnd = document.querySelector('#end');
    let div1 = document.querySelector('#div1');
    let div2 = document.querySelector('#div2')
    let result = document.querySelector('#Result');
    let resultfinal = document.querySelector('#ResultFinal');

  //Adicionar X, validar se há valor e abrir o input de Y;
  function AddX(){
    if (document.querySelector('#enterX').value === '') {
      window.alert('Digite o valor de X'); 
    } else {
      setX(parseInt(document.querySelector('#enterX').value));
      document.querySelector('#DiventerY').style.display = 'flex';
    }  
  }

  // Adicionar Y, validar se há valor e abrir o radio de cordenadas e definir se é a primeira entrada para o rover teste;
  function AddY(){ 
    if (enterY.value === '') {
      window.alert('Digite o valor de Y');
    } else {
      setY(parseInt(enterY.value));
      divCoordenate.style.display = 'flex';
      if (test === true){
        buttonAddCoordenate.style.display = 'none';
        setTest(!test);
      }
      else {
      buttonRoverTest.style.display = 'none';
      buttonAddCoordenate.style.display = 'flex'}
    }
  }

  //Fechar input de X, Y e as coordenadas, adicionar a caixa de texto com o resultado do rover de entrada;
  function RoverTest(){
    if (coordenate === undefined) {
      window.alert('Digite o valor da Coordenada');     
    } else {
      divEnterX.style.display = 'none';
      divEnterY.style.display = 'none';
      divCoordenate.style.display = 'none'; 
      resultfinal.style.display = 'flex';
      resultfinal.innerHTML = `<h2> Como é o Rover de teste a entrada e a saída dele serão (x: ${x}, y: ${y}) direção ${coordenate}
      <p> Click na tela para continuar</p></h2>`;  
    }    
  }

  //Se não for o rover de teste adicionar o radio dos movimentos e mostrar a posição de entrada do segundo rover;
  function AddCoordenate(){
    if (coordenate === '') {
      window.alert('Digite o valor da Coordenada');     
    } else {
      divEnterX.style.display = 'none';
      divEnterY.style.display = 'none';
      divCoordenate.style.display = 'none'; 
      divMoviments.style.display = 'flex';
      result.style.display = 'flex';
      result.innerHTML = `<h2> A posição inicial do rover é (x: ${x}, y: ${y}) direção ${coordenate} 
      </h2>`
    }   
  }

  // Calculando a posição no quadrante e os movimento do rover;
  function Moviment(){ 
    if (coordenate === 'Norte'){
      if (moviment === 'M'){
        setY(parseInt(y + 1));
      }

      if (moviment === 'L'){
        setCoordenate('Oeste');   
      } 
    
      if (moviment === 'R'){
        setCoordenate('Leste');
      }
    }

    if (coordenate === 'Leste'){
      if (moviment === 'M'){
        setX(parseInt(x -1));
      }

      if (moviment === 'L'){
        setCoordenate('Norte');    
      }

      if (moviment === 'R'){
        setCoordenate('Sul');
      }
    }

    if (coordenate === 'Sul'){
      if (moviment === 'M'){
        setY(parseInt(y -1));
      }
  
        if (moviment === 'L'){
          setCoordenate('Leste');    
      }
  
        if (moviment === 'R'){
          setCoordenate('Oeste');
        } 
    }

    if (coordenate === 'Oeste'){
      if (moviment === 'M'){
        setX(parseInt(x +1));
      }
  
      if (moviment === 'L'){
        setCoordenate('Sul');    
      }
  
      if (moviment === 'R'){
        setCoordenate('Norte');
      }  
    } 
    setI(i + 1);
  }

  // Mostrar na tela os movimentos do rover;
  if (i > 0){
    result.innerHTML = `<h2> A posição atual do rover é (x: ${x}, y: ${y}) direção ${coordenate}</h2>`;
  }
  
  // Guardando os dados de saida do primeiro rover, fechando a caixa dos movimentos e mostrando na tela a posição final;
  function AddSegundoRover(){
    buttonAddRover.style.display = 'none';
    buttonEnd.style.display = 'flex';
    divMoviments.style.display = 'none';
    result.style.display = 'none';
    resultfinal.style.display = 'flex';
    setXR1(x);
    setYR1(y);
    setCoordenateR1(coordenate);
    setMoviment();
    resultfinal.innerHTML = `<h2> A posição final do primeiro rover é (x: ${x}, y: ${y}) direção ${coordenate};
    <p> Click na tela para continuar</p> </h2>` 
  }

  // Iniciando novamente os inputs para a entrada do terceiro rover;
  function Initialize(){
    enterX.value = undefined;
    enterY.value = undefined;
    setCoordenate('');
    divEnterX.style.display = 'flex';
    resultfinal.style.display = 'none';
  }   

  //Finalizando a saída do segundo rover e mostrando na tela as saída dos dois rovers que se movimentaram no terreno;
  function End(){
    divMoviments.style.display = 'none';
    result.style.display = 'none';
    divEnd.style.display = 'flex';
    div1.innerHTML = ` <h2>  As coordenadas de saída do primeiro rover são (x: ${xR1}, y: ${yR1}) direção ${coordenateR1}<h2>`
    div2.innerHTML = `<h2>As coordenadas de saída do segundo rover são (x: ${x}, y: ${y}) direção ${coordenate} </h2>`
  }
  
  return (
  <Fragment>
    <Header> <h1> Determine o trageto do Rover</h1></Header>    
      <DivInputX id='DiventerX'> 
        <DivTxt>Qual o valor de X? </DivTxt>
        <InputX id='enterX' type={'number'}/> 
        <ButtonEnter onClick={(()=> AddX())}>Entrada </ButtonEnter>
      </DivInputX>

      <DivInputY id='DiventerY'> 
        <DivTxt>Qual o valor de Y? </DivTxt>
        <InputY id='enterY' type={'number'}/> 
        <ButtonEnter onClick={(()=>AddY())}>Entrada </ButtonEnter>
      </DivInputY>

      <DivInputCoordenate id='DivCoordenate'> 
        Qual a coordenada geografica? 
        <DivNorth>
        <InputCoordenate value='Norte'  id='coordenate' name='coordenate' type='radio' onChange={ () => setCoordenate('Norte')} checked={coordenate==='Norte'}/> Norte 
        </DivNorth>
        <DivWest>
          <InputCoordenate value='Leste' id='coordenate' name='coordenate' type='radio' onChange={ () => setCoordenate('Leste')} checked={coordenate==='Leste'}/> West
        </DivWest>
        <DivSouth>
          <InputCoordenate value='Sul' name='coordenate' type='radio' onChange={ () => setCoordenate('Sul')} checked={coordenate==='Sul'}/>  South
        </DivSouth>
        <DivEast>
          <InputCoordenate value='Oeste' name='coordenate' type='radio' onChange={ () => setCoordenate('Oeste')} checked={coordenate==='Oeste'}/> East
        </DivEast>
        <ButtonTest id='roverteste' onClick={(()=>RoverTest())}>Entrada </ButtonTest>   
        <ButtonCoordenate id='addcordenate' onClick={(()=>AddCoordenate())}>Entrada </ButtonCoordenate>  
      </DivInputCoordenate>

      <DivMoviments id='DivMoviments'>
        <DivTxtMov>Escolha o movimento que o Rover fará</DivTxtMov>   
        <DivLeft>
        <InputMoviments value='E'  id='moviments' name='moviments' type='radio' onChange={ () => setMoviment('L')} checked={moviment==='L'}/> Girar para a esquerda
        </DivLeft>
        <DivRight>
          <InputMoviments value='R' id='moviments' name='moviments' type='radio' onChange={ () => setMoviment('R')} checked={moviment==='R'}/> Girar para a direita
        </DivRight>
        <DivMoviment>
          <InputMoviments value='M' id='moviments' name='moviments' type='radio' onChange={ () => setMoviment('M')} checked={moviment==='M'}/>  Andar uma casa para frente
        </DivMoviment>
        <ButtonMoviment onClick={(()=>Moviment())}> Executar movimento </ButtonMoviment>  
        <ButtonAdd id='add' onClick={(()=>AddSegundoRover())}> Adicionar segundo Rover </ButtonAdd>  
        <ButtonEnd id='endrover' onClick={(()=>End())}> Encerrar os movimentos </ButtonEnd>  
      </DivMoviments>

      <Result id='Result'> </Result> 
      <ResultFinal id='ResultFinal' onClick={(()=>Initialize())}></ResultFinal>
      <DivEnd id='end'>
        <DivTxtEnd id='div1'></DivTxtEnd>
        <DivTxtEnd id='div2'></DivTxtEnd>
      </DivEnd>
  </Fragment>  
  )
}

export default App;

const Header = styled.div`
display: flex;
background: #FFE0BF;
align-items: center;
height: 88px;
width: 90%;
margin: auto;
justify-content: center;
border: solid white;
`

const DivInputX = styled.div`
display: flex;
height: 110px;
width: 70%;
margin-top: 60px;
margin-right: 15%;
margin-left: 15%;
border: solid 2px white;
align-items: center;
justify-content: space-around;
`

const DivTxt = styled.div`
`

const InputX = styled.input`
display: flex;
text-align: center;
height: 15px;
width: 75px;
`

const ButtonEnter = styled.button`
text-align: center;
place-content: center;
padding: 1px 20px 3px 20px;
height: 21px;`

const DivInputY = styled.div`
display: none;
height: 110px;
width: 70%;
margin-top: 60px;
margin-right: 15%;
margin-left: 15%;
border: solid 2px white;
align-items: center;
justify-content: space-around;
`

const InputY = styled.input`
display: flex;
text-align: center;
height: 15px;
width: 75px;`

const DivInputCoordenate = styled.div`
display: none;
flex-direction: column;
width: 70%;
height: 170px;
margin-top: 60px;
margin-left: 15%;
margin-right: 15%;
border: solid white;
justify-content: center;
align-items: center;
`

const DivNorth = styled.div`
display: flex;
margin-right: 20px;
margin-top: 10px;
`

const DivWest = styled.div`
display: flex;
margin-right: 25px;
margin-top: 10px;
`

const DivSouth = styled.div`
display: flex;
margin-right: 20px;
margin-top: 10px;
`

const DivEast= styled.div`
display: flex;
margin-right: 30px;
margin-top: 10px;
`

const InputCoordenate = styled.input`
`

const ButtonTest = styled.button`
display: flex;
text-align: center;
width: 110px;
margin-top: 10px;
margin-right: 5px;
justify-content: center;
align-items: center;
`

const ButtonCoordenate = styled.button`
display: flex;
text-align: center;
width: 110px;
margin-top: 10px;
margin-right: 5px;
justify-content: center;
align-items: center;
`

const DivMoviments = styled.div`
display: none;
flex-direction: column;
align-items: center;
margin-top: 35px;
margin-left: 15%;
margin-right: 15%;
border: solid white;
`

const DivTxtMov = styled.div`
display: flex;
margin-top: 10px;
margin-bottom: 15px;`

const DivLeft = styled.div`
display: flex;
margin-right: 20px;
`

const DivRight = styled.div`
display: flex;
margin-right: 38px;
`

const DivMoviment = styled.div`
display: flex;
margin-left: 17px;
margin-bottom: 20px;
`

const InputMoviments = styled.input`
margin-bottom: 10px;
`

const ButtonMoviment = styled.button`
display: flex;
text-align: center;
width: 170px;
margin-bottom: 15px;
justify-content: center;
`

const ButtonAdd = styled.button`
display: flex;
text-align: center;
width: 170px;
margin-bottom: 15px;
justify-content: center;
`

const ButtonEnd = styled.button`
display: none;
text-align: center;
width: 170px;
margin-bottom: 15px;
justify-content: center;
`

const Result = styled.div`
display: none;
flex-direction: column;
text-align: center;
height: 300px;
justify-content: space-around;
margin-left: 15%;
margin-right: 15%;
`

const ResultFinal = styled.div`
display: none;
flex-direction: column;
text-align: center;
height: 300px;
justify-content: space-around;
margin-left: 15%;
margin-right: 15%;
`
const DivEnd = styled.div`
display: none;
flex-direction: column;
justify-content: space-around;
align-items: center;
width: 70%;
height: 350px;
margin-top: 50px;
margin-left: 15%;
margin-right: 15%;
border: solid white;
`

const DivTxtEnd = styled.div`
display: flex;
text-align: center;`
