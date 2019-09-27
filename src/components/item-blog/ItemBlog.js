import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function ItemBlog(props) {
    return (
        <div className="item-blog">
            <div>
                <span className="time">{props.item.time}</span>
                <span className="tag">{props.item.tags}</span>
            </div>
            <div className="title-article">
                <Link className="link-article" to={`/blog/${props.item.id}`}>{props.item.name}</Link>
            </div>
        </div>
    );
}

ItemBlog.propTypes = {
    item: PropTypes.shape({
        time: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    })
};

export default ItemBlog;
