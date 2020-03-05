import { GET_BLOGS, GET_BLOG, CLEAR_CURRENT_BLOG, FETCHING } from '../constants/actionTypes';

export const getBlogs = blogs => {
    return {
        type: GET_BLOGS,
        blogs
    };
};

export const getBlog = blog => {
    return {
        type: GET_BLOG,
        blog
    };
};

export const clearCurrentBlog = () => {
    return {
        type: CLEAR_CURRENT_BLOG
    };
};

export const fetching = () => {
    return {
        type: FETCHING
    };
};
