import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

const About = () => {
    return (
        <div className="custom-container custom-container__bg-raisin-black blog-content color-black-coral">
            <Link className="link-back button-back" to={`/blog`}>
                <FontAwesomeIcon icon={faLongArrowAltLeft} />
            </Link>
            <main className="box-content">
                <h3 className="text-center">About me</h3>
                <p>
                    Mình là Duy, hiện vẫn đang là một sinh viên ở mãi trong trường chưa được ra.
                </p>
                <p>
                    Mình dành nhiều thời gian để đọc nhiều thứ bậy bạ thú vị
                    nhưng đọc đâu quên đấy, mà lại là đống tiếng Anh khó nhằn
                    nên mình quyết định viết lại những gì đã đọc đã học
                    vào trong vài trang blog này.
                </p>
                <p>
                    Hi vọng có thể lưu lại đây những bài học bổ ích!
                </p>
                <p>
                    <i>
                        From Duy #withLove
                    </i>
                </p>
                <div className="avatar block-center"></div>
            </main>
        </div>
    );
}

export default About;
