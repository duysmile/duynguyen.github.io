import React from 'react';
import axios from 'axios';

import ItemBlog from '../components/item-blog/ItemBlog';
import Loading from '../components/layouts/Loading';
import '../css/blog.css';

const perPage = 10;

export default class Blog extends React.Component {
    componentDidMount() {
        this.props.clearCurrentBlog();
        this.getListBlog(this.props.dispatch, 1, perPage);
    }

    getListBlog(dispatch, page, perPage) {
        const apiGitHub = 'https://api.github.com';
        const pathGitHubApi = `${apiGitHub}/repos/duysmile/blogs-github/contents/blogs?ref=master&page=${page}&per_page=${perPage}`;
        this.props.fetching();
        return axios.get(pathGitHubApi).then(
            response => dispatch(this.props.getBlogs(response.data)),
            err => console.error(err)
        );
    }

    render() {
        const dataBlog = this.props.blogs;
        const blogs = dataBlog.map(blog => {
            const info = blog.name.split('.');
            const name = info[0].split('_').join(' ');
            const time = info[1].replace(/_/g, '-');
            const tags = info[2] && info[2].split('_').join(', ');

            const dateArr = info[1].split('_');
            const datetime = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);

            return {
                name,
                datetime,
                time: time || '',
                tags: tags || '',
                id: blog.sha
            };
        });

        const sortedBlogs = [...blogs].sort((b1, b2) => {
            return b1.datetime.valueOf() > b2.datetime.valueOf() ? -1 : 1;
        });

        const blogElements = sortedBlogs.map((blog, index) => {
            return (
                <ItemBlog
                    key={index}
                    item={blog}
                />
            );
        });

        return (
            <div className="custom-container custom-container__bg-raisin-black">
                <div className="box-blog">
                    <div className="about-me color-black-coral">
                        <div className="logo"></div>
                        <h1 className="title">Duysmile Blog</h1>
                        <div className="author">
                            By Duy Nguyen
                        </div>
                        <div className="description">
                            Nơi mình chia sẻ vài điều nho nhỏ về lập trình và cuộc sống.
                        </div>
                    </div>
                    <div className="list-blog">
                        {this.props.isFetching && <Loading />}
                        {blogElements}
                    </div>
                </div>
            </div>
        );
    }
}
