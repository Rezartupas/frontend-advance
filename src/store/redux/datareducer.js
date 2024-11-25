// Action Types
export const SET_API_DATA = 'SET_API_DATA';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const ADD_MOVIE = 'ADD_MOVIE';
export const UPDATE_MOVIE = 'UPDATE_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const SET_MY_LIST = 'SET_MY_LIST';
export const ADD_TO_MY_LIST = 'ADD_TO_MY_LIST';
export const REMOVE_FROM_MY_LIST = 'REMOVE_FROM_MY_LIST';

const STORAGE_VERSION = '1.0';
const STORAGE_KEY = 'myList';

// Load initial state from localStorage
const loadMyListFromStorage = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const { version, list } = JSON.parse(savedData);
      if (version === STORAGE_VERSION) {
        return list;
      }
    }
    return [];
  } catch (error) {
    console.error('Error loading myList from localStorage:', error);
    return [];
  }
};

// Initial State
const initialState = {
  data: [],
  myList: loadMyListFromStorage(),
  loading: false,
  error: null
};

// Save myList to localStorage
const saveMyListToStorage = (myList) => {
  try {
    const data = {
      version: STORAGE_VERSION,
      list: myList
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving myList to localStorage:', error);
  }
};

// Action Creators
export const setApiData = (data) => ({
  type: SET_API_DATA,
  payload: data
});

export const setLoading = (status) => ({
  type: SET_LOADING,
  payload: status
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error
});

export const addMovie = (movie) => ({
  type: ADD_MOVIE,
  payload: movie
});

export const updateMovie = (movie) => ({
  type: UPDATE_MOVIE,
  payload: movie
});

export const addToMyList = (movie) => ({
  type: ADD_TO_MY_LIST,
  payload: movie
});

export const removeFromMyList = (movieId) => ({
  type: REMOVE_FROM_MY_LIST,
  payload: movieId
});

export const setMyList = (list) => ({
  type: SET_MY_LIST,
  payload: list
});

export const deleteMovie = (movieId) => ({
  type: DELETE_MOVIE,
  payload: movieId
});

// Reducer
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_API_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case ADD_MOVIE:
      return {
        ...state,
        data: [...state.data, action.payload]
      };
    case UPDATE_MOVIE:
      return {
        ...state,
        data: state.data.map(movie => 
          movie.id === action.payload.id ? action.payload : movie
        )
      };
case ADD_TO_MY_LIST: {
      const newList = [...state.myList, action.payload];
      saveMyListToStorage(newList);
      return {
        ...state,
        myList: newList
      };
    }
    case REMOVE_FROM_MY_LIST: {
      const newList = state.myList.filter(movie => movie.id !== action.payload);
      saveMyListToStorage(newList);
      return {
        ...state,
        myList: newList
      };
    }
    case SET_MY_LIST: {
      saveMyListToStorage(action.payload);
      return {
        ...state,
        myList: action.payload
      };
    }
    case DELETE_MOVIE:
      return {
        ...state,
        data: state.data.filter(movie => movie.id !== action.payload)
      };
    default:
      return state;
  }
};

export default dataReducer;
