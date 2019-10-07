import { GET_BLOGS, GET_BLOG, CLEAR_CURRENT_BLOG } from '../constants/actionTypes';

const defaultState = {
    listBlogs: [],
    currentBlog: {}
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_BLOGS: {
            return {
                ...state,
                listBlogs: action.blogs
            }
        }
        case GET_BLOG: {
            return {
                ...state,
                currentBlog: action.blog
            }
        }
        case CLEAR_CURRENT_BLOG: {
            return {
                ...state,
                currentBlog: {}
            }
        }
        default: {
            return state;
        }
    }
};
