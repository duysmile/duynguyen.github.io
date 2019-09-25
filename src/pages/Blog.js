import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import '../css/blog.css';

const perPage = 10;

export default class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: []
        };

        this.getListBlog = this.getListBlog.bind(this);
    }

    async componentDidMount() {
        try {
            const dataBlog = await this.getListBlog(1, perPage);
            console.log(dataBlog);
        } catch (error) {
            console.error('ERROR', error);
        }
    }

    getListBlog(page, perPage) {
        const apiGitHub = 'https://api.github.com';
        const page = 1;
        const perPage = 10;
        const pathGitHubApi = `${apiGitHub}/repos/orangetwentyfour/duynguyen.github.io/contents/blogs?page=${page}&per_page=${perPage}`;
        return axios.get(pathGitHubApi);
    }

    render() {
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
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>
                        <div className="item-blog">
                            <div>
                                <span className="time">24-09-2019</span>
                                <span className="tag">nodejs, javascript</span>
                            </div>
                            <div className="title-article">
                                <Link className="link-article" to={'/blog'}>Event loop Nodejs</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
