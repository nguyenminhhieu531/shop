import React from 'react';
import { Link } from 'react-router-dom';
import BoxProduct from '../../components/BoxProduct';
import Pagination from '@mui/material/Pagination';
import { useSelector } from 'react-redux';

function MainProductList(props) {
    const listProduct = useSelector((state) => state.productSlice.listProduct);
    console.log(listProduct);

    return (
        <section className="pt-12 pb-12 bg-gray">
            <div className="container">
                <div className="lg:grid grid-cols-5">
                    <div className="col-span-1 p-0 lg:p-4">
                        <div className="">
                            <h2 className="text-lg font-semibold">Category</h2>
                            <ul className="mt-4 space-y-3">
                                <li>
                                    <a
                                        href="#none"
                                        className="font-medium text-black text-sm hover:text-black transition-all"
                                    >
                                        Bathroom (6)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#none"
                                        className="font-medium text-lightGray text-sm hover:text-black transition-all"
                                    >
                                        Chair (7)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#none"
                                        className="font-medium text-lightGray text-sm hover:text-black transition-all"
                                    >
                                        Decor (17)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#none"
                                        className="font-medium text-lightGray text-sm hover:text-black transition-all"
                                    >
                                        Lamp (3)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#none"
                                        className="font-medium text-lightGray text-sm hover:text-black transition-all"
                                    >
                                        Table (9)
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-5">
                            <h2 className="text-lg font-semibold">Availability</h2>
                            <ul className="mt-4 space-y-3">
                                <li>
                                    <a
                                        href="#none"
                                        className="font-medium text-black text-sm hover:text-black transition-all"
                                    >
                                        In stock (16)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#none"
                                        className="font-medium text-lightGray text-sm hover:text-black transition-all"
                                    >
                                        Out of stock (1)
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-4 mt-6 lg:mt-0">
                        <div className="py-2 px-3 border rounded-full cursor-pointer w-max">
                            <select name="" id="" className="w-full text-sm">
                                <option value={1}>Price, low to hight</option>
                                <option value={2}>Price, hight to low</option>
                                <option value={3}>Date, old to new</option>
                                <option value={4}>Date, new to old</option>
                                <option value={5}>Best selling</option>
                            </select>
                        </div>
                        <ul className="mt-6 grid grid-cols-2 gap-4 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {listProduct.map((item) => (
                                <BoxProduct key={item} data={item} />
                            ))}
                        </ul>
                        <div className="mt-10 flex justify-center ">
                            <Pagination onChange={(e, page) => {
                                console.log(page);
                            }} count={10} variant="outlined" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default MainProductList;