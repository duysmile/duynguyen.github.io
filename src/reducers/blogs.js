import { GET_BLOGS, GET_BLOG, CLEAR_CURRENT_BLOG, FETCHING } from '../constants/actionTypes';

const defaultState = {
    listBlogs: [],
    currentBlog: {},
    isFetching: false,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_BLOGS: {
            return {
                ...state,
                listBlogs: action.blogs,
                isFetching: false,
            }
        }
        case GET_BLOG: {
            return {
                ...state,
                currentBlog: action.blog,
                isFetching: false,
            }
        }
        case CLEAR_CURRENT_BLOG: {
            return {
                ...state,
                currentBlog: {},
                isFetching: false,
            }
        }
        case FETCHING: {
            return {
                ...state,
                isFetching: true,
            };
        }
        default: {
            return state;
        }
    }
};
