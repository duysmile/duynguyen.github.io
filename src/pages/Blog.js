import React from 'react';
import axios from 'axios';

import ItemBlog from '../components/item-blog/ItemBlog';
import '../css/blog.css';

const perPage = 10;

export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: []
        };
    }

    async componentDidMount() {
        try {
            const dataBlog = await this.getListBlog(1, perPage);
            const blogs = dataBlog.data.map(blog => {
                const info = blog.name.split('.');
                const name = info[0].split('_').join(' ');
                const time = info[1].replace(/_/g, '-');
                const tags = info[2] && info[2].split('_').join(', ');
                return {
                    name,
                    time: time || '',
                    tags: tags || '',
                    id: blog.sha
                };
            });

            this.setState({
                blogs
            });
        } catch (error) {
            console.error('ERROR', error);
        }
    }

    getListBlog(page, perPage) {
        const apiGitHub = 'https://api.github.com';
        const pathGitHubApi = `${apiGitHub}/repos/orangetwentyfour/blogs-github/contents/blogs?ref=master&page=${page}&per_page=${perPage}`;
        return axios.get(pathGitHubApi);
    }

    render() {
        const blogs = this.state.blogs;
        const blogElements = blogs.map((blog, index) => {
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
                        <h1 className="title">Torf Blog</h1>
                        <div className="author">
                            By Duy Nguyen
                        </div>
                        <div className="description">
                            Nơi mình chia sẻ vài điều nho nhỏ về lập trình và cuộc sống.
                        </div>
                    </div>
                    <div className="list-blog">
                        { blogElements }
                    </div>
                </div>
            </div>
        );
    }
}
