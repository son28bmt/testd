import { useEffect, useRef, useState } from "react";

import clsx from "clsx";
import { Link } from "react-router-dom";

import { useDebounceValue } from "usehooks-ts"
import Modal from "../../Share/Modal";
import IconClose from "../../Modules/Icons/IconClose";
import IconSearch from "../../Modules/Icons/IconSearch";
import IconChevronRight from "../../Modules/Icons/IconChevronRight";
import productService from "../../../services/product.service";

const SearchMain = () => {
    const inputRef = useRef(null);
    const [isModalSearch, setIsModalSearch] = useState(false);

    const [valueSearch, setValueSearch] = useState("");
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);
    const [resultSearch, setResultSearch] = useState([]);

    // const valueSearchDebounce = useDebounceValue(valueSearch, 500);

    const eventOnchangeValueSearch = (e) => {
        setValueSearch(e.target.value);
    };

    const eventSearch = async (text) => {
        try {
            const booksRes = await productService.findAll({ q: `${text}` });
            console.log(booksRes)
            if (booksRes?.success) {
                setResultSearch(booksRes?.products);
            }

            setIsLoadingSearch(false);
        } catch (error) {
            setIsLoadingSearch(false);
        }
    };

    useEffect(() => {
        if (valueSearch.trim() !== "") {
            eventSearch(valueSearch);
            setIsModalSearch(true);
        }
        else {
            setIsModalSearch(false);
        }
    }, [valueSearch]);

    return (
        <>
            <div className="relative h-[40px] text-black">
                <div className="flex border rounded-md h-[40px] bg-white">
                    <i>
                        <IconSearch className="h-[40px] p-3 w-[50px]" />
                    </i>
                    <input
                        ref={inputRef}
                        value={valueSearch}
                        onChange={eventOnchangeValueSearch}
                        className="w-full outline-none border-none py-2 px-2 bg-transparent"
                        placeholder="Tên bài viết..."
                    />
                    {valueSearch &&
                        (isLoadingSearch ? (
                            <span className="loading-search"></span>
                        ) : (
                            <i
                                onClick={() => {
                                    setValueSearch("");
                                    setResultSearch([]);
                                }}
                                className=" hover:bg-gray-200 rounded-full cursor-pointer"
                            >
                                <IconClose className="w-[40px] h-[40px] p-3 block" />
                            </i>
                        ))}
                </div>
                <div className={`absolute z-30 top-[43px] rounded-md bg-white left-0 ${isModalSearch ? "block" : "hidden"}`}>
                    <ul className="flex-auto overflow-y-auto max-h-[500px] md:px-2">
                        <div className="mb-4">
                            <div style={{ height: "2px" }} className={clsx(
                                "loading-bar",
                                    {
                                        "before:content-none": !isLoadingSearch
                                    }
                                )}>
                            </div>
                        </div>
                        {resultSearch ? (
                            resultSearch?.length > 0 ? (
                                resultSearch.map((product) => {
                                    return (
                                        <li
                                            key={product?.productId}
                                            className="rounded-md mb-2 bg-gray-50 group hover:bg-slate-400 hover:text-white border"
                                        >
                                            <Link
                                                id={product?.productId}
                                                key={product?.productId}
                                                aria-label={`${product?.title}`}
                                                onClick={() => {
                                                    setValueSearch("");
                                                }}
                                                to={`/san-pham/${product?.productId}`}
                                            >
                                                <div className="flex items-center px-3 py-3">
                                                    <img
                                                        src={
                                                            `${product?.thumbnail}` ??
                                                            `/static/images/product_thumbnail.jpg`
                                                        }
                                                        width={50}
                                                        height={70}
                                                        alt={`Ảnh truyện ${""}`}
                                                        className="w-[50px] h-[70px] object-cover rounded shadow"
                                                    />
                                                    <div className="ml-3">
                                                        <p className="font-medium text-lg line-clamp-1">{product?.title}</p>
                                                    </div>
                                                    <IconChevronRight
                                                        size={15}
                                                        className="ml-auto fill-gray-800 group-hover:fill-white"
                                                    />
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })
                            ) : (
                                <div>Không tìm thấy sản phẩm</div>    
                            )
                        ) : (
                            <div>Loading..</div>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SearchMain;
