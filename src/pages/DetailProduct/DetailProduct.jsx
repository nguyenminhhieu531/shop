import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ApiService from '../../service/ApiServices';
import { Grow, Rating } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import BoxProduct from '../../components/BoxProduct';

function DetailProduct(props) {
    const { id } = useParams();
    const element = useRef();
    const [dataDetail, setDataDetail] = useState();
    const [dataProductByCate, setDataProductByCate] = useState();

    const fetchDataDetail = async () => {
        const res = await ApiService.GetDetailProduct(id);
        if (res.status === 200) {
            setDataDetail(res.data);
        }
    }

    const fetchDataByCategory = async () => {
        if (dataDetail) {
            const res = await ApiService.GetProductsByCategory(dataDetail.category);
            if (res.status === 200) {
                setDataProductByCate(res.data.products)
            }
        }
    }

    useEffect(() => {
        if (id) {
            if (element) {
                element.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                });
            }
            fetchDataDetail();
        }
    }, [id, element]);
    console.log(dataDetail);

    useEffect(() => {
        fetchDataByCategory();
    }, [dataDetail])
    console.log(dataProductByCate);

    return (
        <>
            <div ref={element}></div>
            {
                dataDetail && dataProductByCate ? (
                    <div className="container">
                        <ul className="flex gap-2 items-center py-4">
                            <li>
                                <a className="text-sm">Home /</a>
                            </li>
                            <li>
                                <a className="text-sm">Product /</a>
                            </li>
                            <li>
                                <a className="text-sm">{dataDetail.title}</a>
                            </li>
                        </ul>
                        <div className="lg:grid grid-cols-5 gap-7 mt-4">
                            <Grow in={dataDetail} style={{ transformOrigin: '0 0 0' }} {...(dataDetail ? { timeout: 1000 } : {})}>
                                <div className="col-span-3 flex gap-3">
                                    <ul className="flex flex-col gap-4">
                                        {
                                            dataDetail.images.map(item => (
                                                <li key={item} className="w-[82px] cursor-pointer p-[10px] rounded-md border border-black hover:border-black transition-all">
                                                    <img className="image" src={item} alt="" />
                                                </li>
                                            ))
                                        }

                                    </ul>
                                    <div className="overflow-hidden">
                                        <div className="rounded-xl overflow-hidden">
                                            <img
                                                src={dataDetail.thumbnail}
                                                className="image"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Grow>
                            <div className="col-span-2 mt-6">
                                <h2 className="text-xl lg:text-3xl font-semibold">
                                    {dataDetail.title}
                                </h2>
                                <ul className="flex items-center gap-1 mt-4">
                                    <Rating name="half-rating-read" defaultValue={dataDetail.rating} precision={0.5} readOnly />

                                </ul>
                                <p className="mt-3 text-xl font-semibold">${dataDetail.price}</p>
                                <div className="mt-2 pt-2 border-t border-gray">
                                    <p className="flex items-center gap-2 mt-2">
                                        <img
                                            className="w-5 block animate-flicker"
                                            src="../assets/images/ico_eye.png"
                                            alt=""
                                        />
                                        <span className="font-medium text-sm">
                                            35 people are viewing this right now
                                        </span>
                                    </p>
                                    <p className="flex items-center gap-2 mt-4">
                                        <img
                                            className="w-5 block animate-zoomInOut"
                                            src="../assets/images/ico_fire.png"
                                            alt=""
                                        />
                                        <span className="text-red-600 font-medium text-sm">
                                            35 sold in last 18 hours
                                        </span>
                                    </p>
                                    <p className="flex items-center gap-2 mt-6">
                                        <img className="w-5 block" src="../assets/images/ico_checked.png" alt="" />{" "}
                                        <span className="text-green font-medium text-sm">In stock</span>
                                    </p>
                                    <p className="mt-5 text-midGray">
                                        {dataDetail.description}
                                    </p>
                                    <div className="mt-6 flex items-center gap-3">
                                        <div className="flex items-center w-max relative">
                                            <button
                                                type="button"
                                                className="text-lg block text-[0px] absolute left-4"
                                            >
                                                <span className="text-2xl leading-[24px]">-</span>
                                            </button>
                                            <input
                                                type="text"
                                                className="w-[120px] h-[50px] border px-10 border-gray rounded-full text-center"
                                                defaultValue={1}
                                            />
                                            <button
                                                type="button"
                                                className="text-lg block text-[0px] absolute right-4"
                                            >
                                                <span className="text-2xl leading-[24px]">+</span>
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            className="h-[50px] bg-black text-white font-semibold text-sm px-4 flex-1 rounded-full hover:bg hover:bg-white border hover:border-black hover:text-black transition-all"
                                        >
                                            Add To Cart
                                        </button>
                                        <button
                                            type="button"
                                            className="p-4 bg-white border border-[#e6e6e6] rounded-full"
                                        >
                                            <img className="w-4" src="../assets/images/ico_heart.png" alt="" />
                                        </button>
                                    </div>
                                    <ul className="flex items-center gap-4 mt-6">
                                        <li>
                                            <button
                                                type="button"
                                                className="flex items-center gap-4 text-sm font-medium"
                                            >
                                                <img className="w-4" src="../assets/images/ico_reload.png" alt="" />
                                                Compare
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="flex items-center gap-4 text-sm font-medium"
                                            >
                                                <img className="w-4" src="../assets/images/ico_question.png" alt="" />
                                                Question
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="flex items-center gap-4 text-sm font-medium"
                                            >
                                                <img className="w-4" src="../assets/images/ico_shipping.png" alt="" />
                                                Shipping info
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                className="flex items-center gap-4 text-sm font-medium"
                                            >
                                                <img className="w-4" src="../assets/images/ico_share.png" alt="" />
                                                Share
                                            </button>
                                        </li>
                                    </ul>
                                    <div className="flex items-center mt-6 mb-6 pt-6 pb-6 border-t border-b border-b-gray border-t-gray">
                                        <div>
                                            <img
                                                className="block w-9"
                                                src="../assets/images/ico_shipping2.png"
                                                alt=""
                                            />
                                        </div>
                                        <p className="flex-1 ml-4 pl-4 border-l border-l-[#d9d9d9] text-sm">
                                            Order in the next 22 hours 45 minutes to get it between <br />
                                            <span className="font-semibold underline">
                                                Tuesday, Oct 22{" "}
                                            </span>{" "}
                                            <span className="mx-2">and</span>
                                            <span className="font-semibold underline"> Saturday, Oct 26</span>
                                        </p>
                                    </div>
                                    <div className="p-[15px] rounded-xl border border-[#dedede] flex items-start gap-3">
                                        <div>
                                            <img src="../assets/images/ico_check.png" className="w-6 block" alt="" />
                                        </div>
                                        <div className="text-sm">
                                            <p className="text-lightGray">
                                                Pickup available at{" "}
                                                <span className="font-semibold text-black"> Akaze store</span>
                                            </p>
                                            <p className="text-xs text-lightGray mt-1">
                                                Usually ready in 24 hours
                                            </p>
                                            <button type="button" className="underline text-xs mt-4">
                                                View store information
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-center mt-6 p-6 bg-[#f6f6f6] rounded-lg">
                                        <p className="text-sm tracking-widest">Guaranteed Checkout</p>
                                        <img className="block mt-3" src="../assets/images/img_payment.avif" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-9 lg:mt-24">
                            <ul className="flex items-center lg:justify-center gap-6">
                                <li>
                                    <button
                                        type="button"
                                        className="text-lg font-semibold py-2 px-4 bg-black text-white rounded-full"
                                    >
                                        Description
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="lg:block hidden text-lg font-semibold py-2 px-4 text-[#8a8a8a] hover:text-black transition-all"
                                    >
                                        Review
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="lg:block hidden text-lg font-semibold py-2 px-4 text-[#8a8a8a] hover:text-black transition-all"
                                    >
                                        Shipping
                                    </button>
                                </li>
                                <li>
                                    <button
                                        type="button"
                                        className="lg:block hidden text-lg font-semibold py-2 px-4 text-[#8a8a8a] hover:text-black transition-all"
                                    >
                                        Return
                                    </button>
                                </li>
                            </ul>
                            <div className="mt-9 lg:mt-20">
                                <p className="text-[#8a8a8a] leading-7">
                                    Get a fresh fit for spring with the Free People Love Letter Ivory
                                    Floral Jacquard Cropped Cami Top! Stretchy jacquard fabric, with a
                                    textured floral design throughout, shapes this cami top that has wide
                                    straps, a high square neckline, and a fitted bodice that ends at a
                                    cropped hem with lettuce-edge trim.
                                </p>
                                <p className="mt-9 text-[#8a8a8a] leading-7">
                                    Get a fresh fit for spring with the Free People Love Letter Ivory
                                    Floral Jacquard Cropped Cami Top! Stretchy jacquard fabric, with a
                                    textured floral design throughout, shapes this cami top that has wide
                                    straps, a high square neckline, and a fitted bodice that ends at a
                                    cropped hem with lettuce-edge trim. Get a fresh fit for spring with the
                                    Free People Love Letter Ivory Floral Jacquard Cropped Cami Top! Stretchy
                                    jacquard fabric, with a textured floral design throughout, shapes this
                                    cami top that has wide straps, a high square neckline, and a fitted
                                    bodice that ends at a cropped hem with lettuce-edge trim.
                                </p>
                            </div>
                        </div>
                        <div className="mt-24 mb-24">
                            <h2 className="text-center text-lg lg:text-3xl font-semibold">
                                You may also like
                            </h2>
                            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                <li className="mt-6 md:mt-0 text-center group relative">
                                    <a href="#none" className="bg-red">
                                        <span className="absolute py-1 text-xs px-2 top-3 left-3 bg-black text-white rounded-xl">
                                            Out of stock
                                        </span>
                                        <ul className="absolute bottom-28 left-4 z-10 flex flex-col gap-3">
                                            <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                                                <button
                                                    type="button"
                                                    className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all"
                                                >
                                                    <img
                                                        src="../assets/images/ico_heart.png"
                                                        className="image size-4 rounded-full"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                            <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all delay-100">
                                                <button
                                                    type="button"
                                                    className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all"
                                                >
                                                    <img
                                                        src="../assets/images/ico_reload.png"
                                                        className="image size-4 rounded-full"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                            <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all delay-200">
                                                <button
                                                    type="button"
                                                    className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all"
                                                >
                                                    <img
                                                        src="../assets/images/ico_search.png"
                                                        className="image size-4 rounded-full"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="rounded-xl overflow-hidden bg-white lg:h-[385px]">
                                            <img
                                                className="block size-full object-cover"
                                                src="../assets/images/img_product.webp"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex justify-center items-center gap-1 mt-5">
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_active.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                        </div>
                                        <h3 className="text-15 mt-2">Egg Dining Table</h3>
                                    </a>
                                    <div className="mt-2 relative h-5 overflow-hidden">
                                        <a href="#none" className="bg-red"></a>
                                        <div className="absolute left-1/2 -translate-x-1/2 group-hover:bottom-0 -bottom-5 transition-all duration-300">
                                            <a href="#none" className="bg-red">
                                                <div className="flex items-center justify-center font-bold text-15 text-center">
                                                    <span className="">$70.00</span>
                                                </div>
                                            </a>
                                            <a
                                                href="#none"
                                                className="uppercase text-xs font-medium tracking-widest relative before:absolute before:bottom-0 before:w-0 before:h-[1px] before:bg-black before:left-0 hover:before:w-full before:transition-all before:duration-500"
                                            >
                                                Add to cart
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li className="mt-6 md:mt-0 text-center group relative">
                                    <a href="#none">
                                        <ul className="absolute bottom-28 left-4 z-10 flex flex-col gap-3">
                                            <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                                                <button
                                                    type="button"
                                                    className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all"
                                                >
                                                    <img
                                                        src="../assets/images/ico_heart.png"
                                                        className="image size-4 rounded-full"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                            <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all delay-100">
                                                <button
                                                    type="button"
                                                    className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all"
                                                >
                                                    <img
                                                        src="../assets/images/ico_reload.png"
                                                        className="image size-4 rounded-full"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                            <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all delay-200">
                                                <button
                                                    type="button"
                                                    className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all"
                                                >
                                                    <img
                                                        src="../assets/images/ico_search.png"
                                                        className="image size-4 rounded-full"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="rounded-xl overflow-hidden bg-white lg:h-[385px]">
                                            <img
                                                className="block size-full object-cover"
                                                src="../assets/images/img_product2.webp"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex justify-center items-center gap-1 mt-5">
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_active.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                        </div>
                                        <h3 className="text-15 mt-2">Century Starburst Clock</h3>
                                    </a>
                                    <div className="mt-2 relative h-5 overflow-hidden">
                                        <a href="#none"></a>
                                        <div className="absolute left-1/2 -translate-x-1/2 group-hover:bottom-0 -bottom-5 transition-all duration-300">
                                            <a href="#none">
                                                <div className="flex items-center justify-center font-bold text-15 text-center">
                                                    <span className="">$55.00</span>
                                                </div>
                                            </a>
                                            <a
                                                href="#none"
                                                className="uppercase text-xs font-medium tracking-widest relative before:absolute before:bottom-0 before:w-0 before:h-[1px] before:bg-black before:left-0 hover:before:w-full before:transition-all before:duration-500"
                                            >
                                                Add to cart
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li className="mt-6 md:mt-0 text-center group relative">
                                    <a href="#none">
                                        <div className="rounded-xl overflow-hidden bg-white lg:h-[385px]">
                                            <img
                                                className="block size-full object-cover"
                                                src="../assets/images/img_product3.webp"
                                                alt=""
                                            />
                                        </div>
                                        <ul className="absolute bottom-28 left-4 z-10 flex flex-col gap-3">
                                            <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                                                <button
                                                    type="button"
                                                    className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all"
                                                >
                                                    <img
                                                        src="../assets/images/ico_heart.png"
                                                        className="image size-4 rounded-full"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                            <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all delay-100">
                                                <button
                                                    type="button"
                                                    className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all"
                                                >
                                                    <img
                                                        src="../assets/images/ico_reload.png"
                                                        className="image size-4 rounded-full"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                            <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all delay-200">
                                                <button
                                                    type="button"
                                                    className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all"
                                                >
                                                    <img
                                                        src="../assets/images/ico_search.png"
                                                        className="image size-4 rounded-full"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="flex justify-center items-center gap-1 mt-5">
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_active.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                        </div>
                                        <h3 className="text-15 mt-2">Bouquet Flower Vase</h3>
                                    </a>
                                    <div className="mt-2 relative h-5 overflow-hidden">
                                        <a href="#none"></a>
                                        <div className="absolute left-1/2 -translate-x-1/2 group-hover:bottom-0 -bottom-5 transition-all duration-300">
                                            <a href="#none">
                                                <div className="flex items-center justify-center font-bold text-15 text-center">
                                                    <span className="">$59.00</span> -
                                                    <span className="">$60.00</span>
                                                </div>
                                            </a>
                                            <a
                                                href="#none"
                                                className="uppercase text-xs font-medium tracking-widest relative before:absolute before:bottom-0 before:w-0 before:h-[1px] before:bg-black before:left-0 hover:before:w-full before:transition-all before:duration-500"
                                            >
                                                Add to cart
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li className="mt-6 md:mt-0 text-center group relative">
                                    <a href="#none">
                                        <span className="absolute py-1 text-xs px-2 top-3 left-3 bg-red-600 text-white rounded-xl">
                                            -30%
                                        </span>
                                        <ul className="absolute bottom-28 left-4 z-10 flex flex-col gap-3">
                                            <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                                                <button
                                                    type="button"
                                                    className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all"
                                                >
                                                    <img
                                                        src="../assets/images/ico_heart.png"
                                                        className="image size-4 rounded-full"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                            <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all delay-100">
                                                <button
                                                    type="button"
                                                    className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all"
                                                >
                                                    <img
                                                        src="../assets/images/ico_reload.png"
                                                        className="image size-4 rounded-full"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                            <li className="opacity-0 translate-y-4 duration-200 group-hover:opacity-100 group-hover:translate-y-0 transition-all delay-200">
                                                <button
                                                    type="button"
                                                    className="shadow-lg p-3 rounded-full bg-white block hover:bg-slate-200 transition-all"
                                                >
                                                    <img
                                                        src="../assets/images/ico_search.png"
                                                        className="image size-4 rounded-full"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                        </ul>
                                        <div className="rounded-xl overflow-hidden bg-white lg:h-[385px]">
                                            <img
                                                className="block size-full object-cover"
                                                src="../assets/images/img_product4.webp"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex justify-center items-center gap-1 mt-5">
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_active.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                            <img
                                                className="size-13 inline-block"
                                                src="../assets/images/ico_star_gray.png"
                                                alt=""
                                            />
                                        </div>
                                        <h3 className="text-15 mt-2">Caravaggio Read Wall Light</h3>
                                    </a>
                                    <div className="mt-2 relative h-5 overflow-hidden">
                                        <a href="#none"></a>
                                        <div className="absolute left-1/2 -translate-x-1/2 group-hover:bottom-0 -bottom-5 transition-all duration-300">
                                            <a href="#none">
                                                <div className="flex items-center justify-center font-bold text-15 text-center">
                                                    <span className="line-through text-lightGray">$59.00 </span> -
                                                    <span className="text-red-600">$60.00</span>
                                                </div>
                                            </a>
                                            <a
                                                href="#none"
                                                className="uppercase text-xs font-medium tracking-widest relative before:absolute before:bottom-0 before:w-0 before:h-[1px] before:bg-black before:left-0 hover:before:w-full before:transition-all before:duration-500"
                                            >
                                                Add to cart
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-24 mb-24">
                            <h2 className="text-center text-lg lg:text-3xl font-semibold">
                                Sản phẩm liên quan
                            </h2>
                            <ul className="mt-6 grid grid-cols-2 gap-10 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                {
                                    dataProductByCate.map((item) => <BoxProduct key={item.id} data={item} />)
                                }
                            </ul>
                        </div>
                    </div>
                ) : (
                    <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={!dataDetail}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                )
            }
        </>

    );
}

export default DetailProduct;