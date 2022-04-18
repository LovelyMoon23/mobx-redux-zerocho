// 내가 기존 state를 어떻게 바꾸고 싶다 라는 생각을 위주로 하면 된다.
// Data 중심적 사고를 해야한다
// 여기서 한번 구체적인 예제를 들어보도록 하겠다

const initialState = {
  user: null,
  data: [],
}


const nextState = {  
    ...initialState,
    posts: [action.data]
}

const nextState = {  
    ...initialState,
    // posts: [{id:1,id:2}]
    posts: [ ...initialState.posts, action.data]
}

const logIn = (data) => {
  return {
    //action
    type: 'LOG_IN',
    data,
  }
}

const logOut = () => {
  return {
    type: 'LOG_OUT', //logout하면 정보 필요 없음.
  }
}

const addPost = (data) => {
  return {
    type: 'ADD_POST',
    data, //게시글에 대한 데이터
  }
}


const reducer = (prevState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                user:action.data
            }
    
        case 'LOG_OUT':
                return {
                    user:null
                }
        
        case 'ADD_POST':
            return {
                post:[...prevState.posts,  action.data]
            }
        default: return prevState;
    }
}


// -------------------dispatch 부분은 나중에!


store.dispatch(logIn(data: {
    id:1,
    name: 'moonsil',
    admin: true,
}))
console.log('2nd', store.getState())


store.dispatch(addPost(data: {
    id:1,
    userId: 1,
    content:'안녕하세요 리덕스'
}))
console.log('3rd', store.getState())


store.dispatch(addPost(data: {
    id:2,
    userId: 1,
    content:'두번째 리덕스'
}))
console.log('4th', store.getState())


store.dispatch(logOut()
)
console.log('5th', store.getState())