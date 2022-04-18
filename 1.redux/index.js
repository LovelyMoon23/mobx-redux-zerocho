const { createStore } = require('redux')

const reducer = (prevState, action) => {
    switch (action.type) {
        case 'CHANGE_COMP_A':
            return {
                compA: action.data,
                compB: 12,
                compC: null,
            }
    
        case 'CHANGE_COMP_B':
                return {
                    compA: 'b',
                    compB: action.data,
                    compC: null,
                }
        
        case 'CHANGE_COMP_C':
            return {
                compA: 'b',
                compB: 12,
                compC: action.data,
            }
    }
}

const initialState = {  //state 초기값
  compA: 'a',
  compB: 12,
  compC: null,
}


const nextState = {  
    compA: action.data,
    compB: 12,
    compC: null,
}


const store = createStore(reducer, initialState) //  store 만들어주기
console.log(store.getState())

// *리덕스는 불변성을 갖는다. 이유는 1) 디버깅시 추적 가능성 2) 히스토리 확인
//따라서 위의 initialState의 compA의 값을 'b'로 바꾸겠다고 initialState.compA = 'b'로 하면 안된다.
// js상에서는 저 값이 어떻게 바뀌어져왔는지 알 수 없다.(history x!)

const aTob = {
  //action. 함수가 아니라, 객체임
  type: 'CHANGE_COMP_A',
  data: 'b',
}

//함수명을 짓는 순간을 피하라. 그래야 깔끔한 코드가 나온다. '확장성'있게. 위의 객체로 예를 들어보자
const aTob = {
  //이런식으로 특정 컴포넌트에 특정 데이터를 주고 싶다고 생각해서 이렇게 다 만들게 되면 코드가 너무 길어진다..
  type: 'CHANGE_COMP_A_TO_C',
  data: 'c',
}

const aTob = {
  type: 'CHANGE_COMP_A_TO_D',
  data: 'd',
}

// 그래서 이런것을 피하기 위해 확장성있는 코드를 써야한다. 바로, 객체가 아닌 함수로 만들어버리는 것 !
// 이런것이 리팩토링의 기본, 자꾸 중복되는 것을 함수로 만들어버림
// * 참고: 아래는 액션을 동적으로만드는 크리에이터를 만들었다. 
const changeCompA = (data) => {
    return {
        type: 'CHANGE_COMP_A',
        data,
    }
};

changeCompA(data: 'b');

//추가적으로,밑에 두개는 같은의미다. 함수가 겹쳐서나오면 이해못하는 사람들이 있기때문에 추가적으로 설명한다.

store.dispatch(changeCompA( data: 'b' ))

store.dispatch({
    type: 'CHANGE_COMP_A',
    data:'b'
}
);



// 1 - 5 불변성과 subscribe

// 위에 초기 state선언했던 부분과 변경하고자 하는 setState를 확인해보자.
// 변하는 compA를 제외하고 compB와 compC의 값은 같다.
// 여기에서 중복값이 발생한다.

const initialState = {  //state 초기값
    compA: 'a',
    compB: 12,
    compC: null,
  }
  
  
  const nextState = {  
      compA: action.data,
      compB: 12,
      compC: null,
  }

// 따라서 위의 값을 중복없이 해준다면,


const initialState = {  //state 초기값
    compA: 'a',
    compB: 12,
    compC: null,
  }
  
  
const nextState = {  
      ...initialState,
    compA: action.data, // 변하는 값만 써주면 그 값을 제외한 나머지의 값은 복사된다.
}
  
// 하지만 나중에 이러한 얕은 복사도 늘어나게 되면 보기 싫게 되고, 그때를 위해 immer를 사용할 수 있다.

// 또한 reducer에 default값도 넣어주어야 한다.
// 나중에 오타같은 경우(dispatch에서)를 대비하기도 할 수 있다.
// 

const reducer = (prevState, action) => {
    switch (action.type) {
        case 'CHANGE_COMP_A':
            return {
                compA: action.data,
                compB: 12,
                compC: null,
            }
    
        case 'CHANGE_COMP_B':
                return {
                    compA: 'b',
                    compB: action.data,
                    compC: null,
                }
        
        case 'CHANGE_COMP_C':
            return {
                compA: 'b',
                compB: 12,
                compC: action.data,
            }
        default: return prevState;
    }
}


//그런데 화면은 언제 바꾸나요? 알아서 바뀝니다. 
// subscribe라는 이벤트 리스터(디버깅할때 사용)가 있는데 이 부분은 react-redux안에 들어있다.
store.subscribe(listner: () => { //react-redux안에 들어있음
    console.log('changed') // 화면 바꿔주는 코드 여기서
})