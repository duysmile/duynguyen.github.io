import { connect } from 'react-redux';

import { getBlogs, clearCurrentBlog } from '../actions/blogs';
import Blog from '../pages/Blog';

const mapStateToProps = state => ({
    blogs: state.blogs.listBlogs
});

const mapDispatchToProps = dispatch => ({
    getBlogs: blogs => dispatch(getBlogs(blogs)),
    clearCurrentBlog: () => dispatch(clearCurrentBlog()),
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
