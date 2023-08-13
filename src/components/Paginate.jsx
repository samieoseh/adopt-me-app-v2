import { useState } from "react";
import backwardArrow from "../assets/backward-arrow.svg";
import forwardArrow from "../assets/forward-arrow.svg";

// eslint-disable-next-line react/prop-types
const PageButton = ({ number, active, onClickFn }) => {
    return (
        <div
            className={`p-1 m-2 w-8 flex justify-center items-center bg-white rounded shadow-sm cursor-pointer ${
                number === active ? "active" : ""
            }`}
            onClick={onClickFn}
        >
            <p className="text-sm">{number}</p>
        </div>
    );
};

// eslint-disable-next-line react/prop-types
const Paginate = ({ component, totalPages }) => {
    const [firstIndex, setFirstIndex] = useState(1);
    const [activeIndex, setActiveIndex] = useState(1);
    const [pageEnd, setPageEnd] = useState(false);

    const btnHandler = (newIndex) => {
        setPageEnd(newIndex + 4 >= totalPages);
        const newPage = newIndex >= totalPages - 4 ? totalPages - 4 : newIndex;
        if (!pageEnd) {
            setFirstIndex(newPage);
            setActiveIndex(newIndex);
        }
    };

    const generateDivs = () => {
        if (totalPages <= 5) {
            const divs = [];
            for (let i = firstIndex; i <= totalPages; ++i) {
                divs.push(
                    <PageButton
                        key={i}
                        number={i}
                        active={activeIndex}
                        onClickFn={() => setActiveIndex(i)}
                    />
                );
            }
            return divs;
        } else {
            return (
                <div className="flex">
                    <PageButton
                        number={firstIndex}
                        active={activeIndex}
                        onClickFn={() => {
                            btnHandler(firstIndex);
                            setActiveIndex(firstIndex);
                        }}
                    />
                    <PageButton
                        number={firstIndex + 1}
                        active={activeIndex}
                        onClickFn={() => {
                            btnHandler(firstIndex + 1);
                            setActiveIndex(firstIndex + 1);
                        }}
                    />
                    <PageButton
                        number={pageEnd ? firstIndex + 2 : "..."}
                        active={activeIndex}
                        onClickFn={() =>
                            setActiveIndex(
                                pageEnd ? firstIndex + 2 : activeIndex
                            )
                        }
                    />
                    <PageButton
                        number={Math.min(firstIndex + 8, totalPages - 1)}
                        active={activeIndex}
                        onClickFn={() => {
                            btnHandler(
                                Math.min(firstIndex + 8, totalPages - 1)
                            );
                            setActiveIndex(
                                Math.min(firstIndex + 8, totalPages - 1)
                            );
                        }}
                    />
                    <PageButton
                        number={
                            firstIndex + 9 > totalPages
                                ? totalPages
                                : firstIndex + 9
                        }
                        active={activeIndex}
                        onClickFn={() =>
                            setActiveIndex(Math.min(firstIndex + 9, totalPages))
                        }
                    />
                </div>
            );
        }
    };

    return (
        <div className="h-auto w-auto flex justify-center items-center flex-col">
            {component}
            <p>{activeIndex}</p>
            <div className="flex justify-center flex-row">
                <button
                    className={`p-1 m-2 ${
                        firstIndex <= 1 ? "bg-gray-200" : "bg-white"
                    } rounded shadow-sm w-8 text-center flex items-center justify-center cursor-pointer`}
                    disabled={firstIndex <= 1}
                    onClick={() => {
                        setPageEnd(false);
                        btnHandler(firstIndex - 1);
                    }}
                >
                    <img
                        src={backwardArrow}
                        alt="backward arrow"
                        className="h-2 w-2"
                    />
                </button>
                {generateDivs()}
                <button
                    className={`p-1 m-2  w-8  ${
                        pageEnd ? "bg-gray-200" : "bg-white"
                    } rounded shadow-sm flex items-center justify-center cursor-pointer`}
                    disabled={pageEnd}
                    onClick={() => btnHandler(firstIndex + 1)}
                >
                    <img
                        src={forwardArrow}
                        alt="forward arrow"
                        className="h-2 w-2"
                    />
                </button>
            </div>
        </div>
    );
};

export default Paginate;
