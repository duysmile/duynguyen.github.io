import React from 'react';
import axios from 'axios';
import marked from 'marked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { Base64 } from 'js-base64';
import { Link } from "react-router-dom";

import '../css/content.css';

marked.setOptions({
    breaks: true,
});
const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
    return `<a id="tribute-link" href=${href} title=${title}" target="_blank">${text}</a>`;
};

function convertBlog(blog) {
    if (!blog || !blog.content) {
        return '';
    }
    console.log(blog);
    const contentBlog = Base64.decode(blog.content);
    return contentBlog;
}

export default class BlogDetail extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.getBlogContent(this.props.dispatch, id);
    }

    getBlogContent(dispatch, id) {
        const apiGitHub = 'https://api.github.com';
        const pathGitHubApi = `${apiGitHub}/repos/orangetwentyfour/blogs-github/git/blobs/${id}`;
        return axios.get(pathGitHubApi).then(
            response => dispatch(this.props.getBlog(response.data)),
            err => console.error(err)
        );
    }

    render() {
        const blog = convertBlog(this.props.blog);
        const markdownText = marked(blog, renderer);
        return (
            <div className="custom-container custom-container__bg-raisin-black blog-content color-black-coral">
                <Link className="link-back button-back" to={`/blog`}>
                    <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
                <div className="box-content" dangerouslySetInnerHTML={{ __html: markdownText }}></div>
            </div>
        );
    }
}
