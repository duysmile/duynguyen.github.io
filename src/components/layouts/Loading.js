import React from 'react';

const Loading = () => {
    return (
        <div className="preloader">
            <svg
                width="200"
                height="200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                class="lds-ripple"
                style={{ background: '0 0' }}
            >
                <circle
                    cx="50"
                    cy="50"
                    r="4.719"
                    fill="none"
                    stroke="#1d3f72"
                    stroke-width="2">
                    <animate
                        attributeName="r"
                        calcMode="spline"
                        values="0;40"
                        keyTimes="0;1"
                        dur="3"
                        keySplines="0 0.2 0.8 1"
                        begin="-1.5s"
                        repeatCount="indefinite" />
                    <animate
                        attributeName="opacity"
                        calcMode="spline"
                        values="1;0"
                        keyTimes="0;1"
                        dur="3"
                        keySplines="0.2 0 0.8 1"
                        begin="-1.5s"
                        repeatCount="indefinite" />
                </circle>
                <circle
                    cx="50"
                    cy="50"
                    r="27.591"
                    fill="none"
                    stroke="#5699d2"
                    stroke-width="2">
                    <animate
                        attributeName="r"
                        calcMode="spline"
                        values="0;40"
                        keyTimes="0;1"
                        dur="3"
                        keySplines="0 0.2 0.8 1"
                        begin="0s"
                        repeatCount="indefinite" />
                    <animate
                        attributeName="opacity"
                        calcMode="spline"
                        values="1;0"
                        keyTimes="0;1"
                        dur="3"
                        keySplines="0.2 0 0.8 1"
                        begin="0s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    )
};

export default Loading;
