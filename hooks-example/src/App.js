import './App.css';
import {useState, useEffect, useRef, useContext, useMemo, useCallback} from 'react';
import { createContext } from 'react'; // createContext : 저장소를 만들어주는 함수

// 1. useState
// 2. useEffect : 어떠한 컴포넌트가 마운트(화면에 첫 렌더링), 업데이트(재 렌더링), 언마운트(화면에서 사라질 때) 될 때
//    특정한 코드를 처리해 주는 함수.
// 3. useRef : Ref Object를 리턴하는 Hook 함수. 리턴된 Ref값은 컴포넌트의 전 생애 기간 동안 값이 유지됨. 새로 렌더링 되더라도 값이 보존.
//    예) const ref = useRef(value) --> Ref Object {current:value} 리턴되며, ref.current = 'hello'와 같은 방법으로 값을 바꿀 수 있음.
//    state의 변화 --> 렌더링 --> 컴포넌트 내부 변수들을 초기화 시킴. 반면에 Ref의 변화 --> No 렌더링 --> 값이 유지.
//    따라서, 렌더링이 되더라도 초기화하면 안 되는 값을 저장할 때 유용.
//    DOM요소에 접근할 때 엘레먼트 내에 ref 속성을 만들고, 이 ref 속성값을 이용해서 엘레먼트에 접근이 가능. 
// 4. useContext : Redux 또는 Redux Toolkit이 많이 사용됨. 데이터 공유 함수. Context로 공유한 데이터를 받아 오는 역할을 하는 함수. 
// 5. useMemo : Memoization(반복된 계산을 배번 다시 수행하는 것이 아니라 캐신해 놓은 결과를 불러내어서 재샤용하는 최적화 기법) 기능을 수행
//    useMemo 함수의 2번째 인자인 의존성배열(dependency array)의 값이 변경 될 때만 첫 번째 인자인 콜백함수를 실행시키고,
//    실행이 안 되었을 경우는 기존 보관중인 "값"을 리턴
//    useEffect 함수의 2번째 인자에 객체가 있는 경우에 발생하는 문제를 useMemo 함수는 해결할 방법이 있기 때문에
//    useEffect 함수를 대신해서 사용되는 경우가 있음.
// 6. useCallback : useMemo 처럼 Memoization 기능을 수행하는 함수로 useMemo가 콜백함수의 리턴값을 Memoization하는 것과 달리
//    콜백함수 자체를 Memoization 함. 

const App = () => {
  
  return(
    <div className='exam'>
      <h1>useState 예제</h1>
      <Exam1 />
      <Exam2 />
      <h1>useEffect 예제</h1>
      <Exam3 />
      <Exam4 />
      <h1>useRef 예제</h1>
      <Exam5 />
      <hr />
      <Exam6 />
      <h1>useContext 예제</h1>
      <Exam7 />
      <h1>useMemo 예제</h1>
      <Exam8 />
      <Exam9 />
      <CopyTest />
      <h1>useCallback 예제</h1>
      <Exam10 />
      <Exam11 />
    </div>
  )
}

// useState 예제
const Exam1 = () => {
  const [time, setTime] = useState(1);
  const handleClick = () => {
    let newTime = time + 1;
    if(newTime > 12){
      newTime = newTime - 12;
    }
    setTime(newTime);
  }
  
  return(
    <div>
      <span>현재 시간 : {time}시</span>
      <button onClick={handleClick}>시간 변경</button>
    </div>
  )
}

const Exam2 = () => {
  const [names, setNames] = useState(['김철수', '박민수']);
  const [input, setInput] = useState('');
  const handleInputChange = (e) => {
    setInput(e.target.value);
  }
  const handleClick = () => { // 불변성, 전개 연산자(Spread 연산자)
    setNames((prevState) => {return [input, ...prevState]}) // ... 은 js의 Spread 연산자
  }

  return(
    <div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleClick}>클릭</button>
      {/* map함수는 자동으로 for문을 실행시켜서 인덱스와 값을 인자로 받아 옴 */}
      {names.map((name, idx) => {
        return <p key={idx}>{name}</p>
      })}
    </div>
  )
}

// useEffect 예제
const Exam3 = () => {
  const [count, setCount] = useState(1);
  const [name, setName] = useState('');

  const handleCountClick = () => {
    setCount(count + 1);
  }

  const handleInputChange = (e) => {
    setName(e.target.value);
  }
  
  // 매번 렌더링이 될때마다 콜백함수 실행
  useEffect(() => {console.log("렌더링 발생시 마다 콜백함수 실행...")});

  // 의존성 배열(Dependency Array)
  // 마운트(첫 번째 렌더링이 일어날 때만 콜백함수 실행)
  useEffect(() => {console.log("마운트 시에만 콜백함수 실행...")}, []);

  // 마운트(첫 번째 렌더링)와 count값이 변경될 때만 콜백함수가 실행
  useEffect(() => {console.log("마운트와 count시에만 콜백함수 실행...")}, [count]);

  return(
    <div>
      <button onClick={handleCountClick}>클릭</button>
      <span>count : {count}</span>
      <input type='text' value={name} placeholder="이름을 입력하세요" onChange={handleInputChange} /><br />
      <span>name : {name}</span>
    </div>
  )
}

const Exam4 = () => {
  const [showTimer, setShowTimer] = useState(false);
  let btn_name;
  if(showTimer) btn_name = "타이머 중지";
    else btn_name = "타이머 시작";

  return(
    <div>
      {showTimer && <Timer />} {/* showTimer가 true일때 <Timer />를 실행 */}
      <button onClick={() => {setShowTimer(!showTimer)}}>{btn_name}</button>
    </div>
  )
}

export default App;

const Timer = () => {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("타이머 돌아가는 중");
    }, 1000); // 1초동안 지연
    return () => {
      clearInterval(timer);
      console.log("타이머가 종료되었습니다.")
    }
  }, []);
  
  return(
    <div>
      <span>타이머를 시작합니다. 콘솔을 보세요.</span>
    </div>
  )
}

// useRef 예제
const Exam5 = () => {
  const [count, setCount] = useState(1);
  const countRef = useRef(1); // countRef가 {current:1} 객체를 참조(참조변수는 주소값이 들어간다). 렌더링 할때마다 주소가 바뀐다.
  const renderCount = useRef(1);

  let countVar = 0;

  const increaseCountState = () => {
    setCount(count + 1);
  }
  const increaseCountVar = () => {
    countVar += 1;
    console.log("Var = " + countVar);
  }
  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
    console.log("Ref = " + countRef.current);
  }

  useEffect(() => { // 매번 렌더링 --> React는 처음 렌더링 할 때는 검사를 위해 두 번 렌더링을 함.
    renderCount.current = renderCount.current + 1;
    console.log("Exam5 예제" + renderCount.current + "번째 렌더링");
  })

  return(
    <div>
      <p>State : {count}</p>
      <p>Ref : {countRef.current}</p>
      <p>Var : {countVar}</p>
      <button onClick={increaseCountState}>State 증가</button>
      <button onClick={increaseCountRef}>Ref 증가</button>
      <button onClick={increaseCountVar}>Var 증가</button>
    </div>
  )
}

const Exam6 = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus(); // 렌더링 되는 순간 focus
  }, []);

  const login = () => {
    alert(`안녕하세요? ${inputRef.current.value}님`); // 템플리트 표현법
    inputRef.current.focus();
  }

  return(
    <div>
      <input type='text' ref={inputRef} placeholder='이름을 입력하세요' />
      <button onClick={login}>로그인</button>
    </div>
  )
}

// useContext 예제
const Exam7 = () => {
  const [isDark, setIsDark] = useState(false);

  return(
    <div>
      <UserContext.Provider value={'이승재'}> {/* Provider로 저장소의 영향이 미치는 컴포넌트로 둘러쌈. UserContext 저장소에 '이승재' 저장 */}
        <ThemeContext.Provider value={{isDark, setIsDark}}> {/* ThemeContext 저장소에 {isDark, setIsDark} 객체로 저장 */}
          <Page />
        </ThemeContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

const ThemeContext = createContext(null); // 저장소 생성
const UserContext = createContext(null); // 저장소 생성

const Page = () => {
  return(
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

const Header = () => {
  const {isDark} = useContext(ThemeContext); // 저장소에 보관된 값을 가져옴
  const user = useContext(UserContext); // 저장소에 보관된 값을 가져옴

  return(
    <div>
      <header className='header'
        style={{
          backgroundColor: isDark ? 'black':'lightgray',
          color: isDark ? 'white':'black',
        }}>
        <h1>어서 오세요. {user} !!!</h1>
      </header>
    </div>
  )
}

const Content = () => {
  const {isDark} = useContext(ThemeContext);
  const user = useContext(UserContext);

  return(
    <div className='content'
      style = {{
        backgroundColor: isDark ? 'black':'white',
        color: isDark ? 'white':'black'
      }}>
      <p>{user}님, 좋은 하루 되세요.</p>
    </div>
  )
}

const Footer = () => {
  const {isDark, setIsDark} = useContext(ThemeContext);

  return(
    <div>
      <footer className='footer'
        style = {{
          backgroundColor: isDark ? 'black':'lightgray'
        }}>
        <button className='button' onClick={() => setIsDark(!isDark)}>Dark Mode</button>
      </footer>
    </div>
  )
}

// useMemo 예제1
const Exam8 = () => {
  const [hardNumber, setHardNumber] = useState(1);
  const [easyNumber, setEasyNumber] = useState(1);

  //const hardSum = hardCalculate(hardNumber);
  const hardSum = useMemo(() => {
    return hardCalculate(hardNumber);
  },[hardNumber]);
  // hardNum이 변경될 때만 콜백함수가 실행. 변경이 일어나지 않으면 그 전에 가지고 있던 hardSum 값을 재사용

  const easySum = easyCalculate(easyNumber);

  return(
    <div>
      <h3>짜증나는 계산기</h3>
      <input type='number' value={hardNumber} 
        onChange={(e) => setHardNumber(parseInt(e.target.value))} />
      <span> + 10,000 = {hardSum}</span>
      <hr />
      <h3>조금 덜 짜증나는 계산기</h3>
      <input type='number' value={easyNumber}
        onChange={(e) => setEasyNumber(parseInt(e.target.value))} />
      <span> + 10,000 = {easySum}</span>
    </div>
  )
}

const hardCalculate = (number) => {
  console.log("짜증나는 계산기 렌더링");
  for(let i=0; i<99999; i++){} // i<999999999 였는데 로딩 오래걸려서 짜증나서 바꿈
  return number + 10000;
}

const easyCalculate = (number) => {
  console.log("조금 덜 짜증나는 계산기 렌더링");
  return number + 10000;
}

// useMemo 예제2
const Exam9 = () => {
  const [number, setNumber] = useState(0);
  const [isKorea, setIsKorea] = useState(true);
  // const location = isKorea ? '한국' : '외국'
  const location = useMemo(() => {return {
    country : isKorea ? '한국' : '외국'
    } // primitive type(원시형, 일반형)이 아닌 reference type의 경우
  }, [isKorea]);
  // useEffect(() => console.log("useEffect"),[location]); // location이 바뀔때에만 값이 바뀌도록 함.


  return(
    <div>
      <h1>하루에 몇끼 먹어요?</h1>
      <input type='number' value={number} onChange={(e) => setNumber(e.target.value)} />
      <hr />
      <h1>어느 나라에 있나요?</h1>
      <p>나라 : {location.country}</p>
      <button onClick={() => setIsKorea(!isKorea)}>비행기 타자..</button>
    </div>
  )
}

// 얇은 복사, 깊은 복사 설명
const CopyTest = () => {

  const object = {
    name: "김민수",
    gender: "male"
  }

  const copy = {...object}; // 얇은 복사(Shallow Copy) : 서로 다른 주소를 가지면서 값만 복사
  // const copy = Object.assign({}, object); --> ES6에서 사용하는 얇은 복사
  console.log(object === copy); //false
  copy.gender = "female";
  console.log("copy", copy); // 값이 다르게 나옴 --> 서로 다른 주소를 가지고 있음. 불변성을 유지한다...
  console.log("object", object);
  
  
  const object1 = {
    name: "이성경",
    gender: 'female'
  }
  
  const copy1 = object1; // 깊은 복사(Deep Copy) : 동일한 주소를 공유
  console.log(object1 === copy1); // true
  copy1.gender = "male";
  console.log("copy1", copy1); // 값이 둘 다 바뀜 --> 동일한 주소를 공유하기 때문임. 불변성을 유지하지 못 하는 것임...
  console.log("object1", object1);
  
}

// useCallback 예제
const Exam10 = () => {
  const [number, setNumber] = useState(0);
  const someFunction = useCallback(() => {console.log(`someFunc : number : ${number}`);
  return;
  }, [number]); // ``은 Template 표기법으로 출력

  useEffect(() => {console.log("someFunc가 변경되었습니다.");}, [someFunction]); // 첫 번째 + someFunction이 변경될 때 실행

  return(
    <div>
      <input type='number' value={number} onChange={(e) => setNumber(e.target.value)} />
      <br />
      <button onClick={someFunction}>Call someFunc</button>
    </div>
  )
}

const Exam11 = () => {
  const [size, setSize] = useState(100);
  const [isDark, setIsDark] = useState(false);

  const createBoxStyle = useCallback(() => {
    return {
      backgroundColor: 'red',
      width: `${size}px`,
      height: `${size}px`
    }
  }, [size] );

  return(
    <div style={{backgroundColor:isDark ? 'black' : 'white'}}>
      <input type='number' value={size} onChange={(e) => setSize(e.target.value)} />
      <button onClick={() => setIsDark(!isDark)}>Change Theme</button>
      <Box createBoxStyle = {createBoxStyle} />
    </div>
  )
}

const Box = ({createBoxStyle}) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    console.log("박스 사이즈 확장");
    setStyle(createBoxStyle())
  }, [createBoxStyle])

  return(
    <div style={style}>

    </div>
  )
}