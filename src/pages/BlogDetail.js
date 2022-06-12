import React from 'react';
import axios from 'axios';
import marked from 'marked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { Base64 } from 'js-base64';
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

import '../css/content.css';
import Loading from '../components/layouts/Loading';

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
        this.props.fetching();
        return axios.get(pathGitHubApi).then(
            response => dispatch(this.props.getBlog(response.data)),
            err => console.error(err)
        );
    }

    render() {
        const blog = convertBlog(this.props.blog);
        return (
            <div className="custom-container custom-container__bg-raisin-black blog-content color-black-coral">
                <Link className="link-back button-back" to={`/blog`}>
                    <FontAwesomeIcon icon={faLongArrowAltLeft} />
                </Link>
                {this.props.isFetching && <Loading />}
                <main className="box-content">
                    <ReactMarkdown
                        children={blog}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = className.includes('language') ? className.replace('language-', '') : '';
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        style={dracula}
                                        language={match}
                                        PreTag="div"
                                        {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    />
                </main>
            </div>
        );
    }
}
