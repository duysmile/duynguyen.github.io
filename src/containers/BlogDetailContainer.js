import { connect } from 'react-redux';

import { getBlog } from '../actions/blogs';
import BlogDetail from '../pages/BlogDetail';

const mapStateToProps = state => ({
    blog: state.blogs.currentBlog
});

const mapDispatchToProps = dispatch => ({
    getBlog: blog => dispatch(getBlog(blog)),
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);
