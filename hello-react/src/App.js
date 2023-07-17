import { useState } from 'react';
import './App.css';
import SubApp from './SubApp';
import PropTypes from 'prop-types';

const App = () => {
  const name = "리액트";
  // return 안에 render해줄 내용을 써준다.
  return(
    <div className='react'>
      <h1>Probs 예제</h1>
      <h2>이번 프로젝트는 {name} 프로젝트입니다.</h2>
      {name === '뤼액트' ? <h1>리액트 맞아요</h1> : <h2>글씨가 달라요</h2>}
      <hr/>

      {/* <br></br> index.js에 있는 StrictMode 때문에 태그를 꼭 닫아줘야 한다 */}
      <SubApp /> {/* 이 방식으로 닫아도 된다 */}
      <MyComponent name="이승재" favoriteNumber={3}>LEE</MyComponent> {/* 문자를 제외한 객체는 {}로 묶어서 보내 줘야 한다*/}
      {/* name, favoriteNumber처럼 속성으로 보내는 방법이 있고, LEE 처럼 children 방식으로 보내는 방법이 있다. */}
      <hr/>

      <h1>State 예제</h1>
      <MyState /><br/>
      <Say />
      <EventPractice />
      <IterationSample />
    </div>
    )
}

const MyComponent = ({name,favoriteNumber,children}) => {

  return(
    <div>
      
      안녕하세요? 나의 이름은 {name}입니다. <br/>
      Children 값은 {children}입니다. <br/>
      제가 가장 좋아하는 숫자는 {favoriteNumber}입니다.
    </div>
  )

}

// 전달 받은 props 값이 없을 경우 사용
MyComponent.defaultProps = {
  name: '아무개'
}

MyComponent.proptype = {
  name: PropTypes.string,
  favoriteNumber: PropTypes.number.isRequired
}

// State 예제1
const MyState = () => {

  const [number, setNumber] = useState(1); // 비구조 할당
  let numberVar = 1;

  const increaseCountVar = () => {
    numberVar += 1;
    console.log("변수 = " + numberVar);
  }

  return(
    <div>
      <p>변수 : {numberVar}</p>
      <p>State : {number}</p>
      <button onClick={increaseCountVar}>변수</button>
      <button onClick={() => {
        setNumber(number + 1);
        console.log("State = " + number);
        }}>State</button>
    </div>
  )
}

// State 예제2
const Say = () => {

  const [message, setMessage] = useState('');
  const [color, setColor] = useState('black');

  const onClickEnter = () => {
    setMessage("안녕하세요!!");
  }

  const onClickLeave = () => {
    setMessage("안녕히 가세요~~");
  }

  return(
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1 style={{color}}>{message}</h1> {/* style={} 안에 {color} 객체를 넣어주는 것 */}
      <button style={{color: 'red'}} onClick={() => setColor('red')}>빨간색</button> {/* onClick={ 콜백함수 } */}
      <button style={{color: 'green'}} onClick={() => setColor('green')}>초록색</button>
      <button style={{color: 'blue'}} onClick={() => setColor('blue')}>파란색</button>
    </div>
  )
}

// 이벤트 핸들링
const EventPractice = () => {
  
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  }

  const onClick = () => {
    alert(username + " : " + message);
    setUsername(''); // 초기화
    setMessage(''); // 초기화
  } 

  return(
    <div>
      <h2>이벤트 연습</h2>
      <input type="text" name="username" value={username} placeholder='사용자명'
        onChange={onChangeUsername} />
      <input type="text" name="message" value={message} placeholder='메세지 입력'
        onChange={onChangeMessage} />
      <button onClick={onClick}>확인</button>
    </div>
  )
}

// 엘레먼트 반복 처리 예제
const IterationSample = () => {

  const [names, setNames] = useState([
    {id:1, text:'눈사람'},
    {id:2, text:'얼음'},
    {id:3, text:'눈'},
    {id:4, text:'바람'},
  ])

  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(5);

  const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
  }

  // map함수 : 자동으로 for문 돌리고 key와 값을 반환.
  // React에서는 반복을 통해서 엘레먼트를 출력할 경우 반드시 엘레먼트 속성에 키 값이 있어야 함.
  const nameList = names.map((name) => (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>{name.text}</li>
  ));

  const onChange = (e) => {
    setInputText(e.target.value);
  }

  const onClick = () => {
    const nextNames = names.concat({
      id: nextId,
      text: inputText
    });
    setNextId(nextId + 1);
    setNames(nextNames);
    setInputText('');
  }

  return(
    <div>
      <h2>엘레먼트 반복 처리 예제</h2>
      {/* inputType State가 변경이 되면 렌더링이 일어남 */}
      <input type="text" value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{nameList}</ul>
    </div>
  )
}

export default App;