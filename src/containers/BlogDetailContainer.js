import { connect } from 'react-redux';

import { getBlog, fetching } from '../actions/blogs';
import BlogDetail from '../pages/BlogDetail';

const mapStateToProps = state => ({
    blog: state.blogs.currentBlog,
    isFetching: state.blogs.isFetching,
});

const mapDispatchToProps = dispatch => ({
    getBlog: blog => dispatch(getBlog(blog)),
    fetching: () => dispatch(fetching()),
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail);
