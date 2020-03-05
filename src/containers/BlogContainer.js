import { connect } from 'react-redux';

import { getBlogs, clearCurrentBlog, fetching } from '../actions/blogs';
import Blog from '../pages/Blog';

const mapStateToProps = state => ({
    blogs: state.blogs.listBlogs,
    isFetching: state.blogs.isFetching,
});

const mapDispatchToProps = dispatch => ({
    getBlogs: blogs => dispatch(getBlogs(blogs)),
    clearCurrentBlog: () => dispatch(clearCurrentBlog()),
    fetching: () => dispatch(fetching()),
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
