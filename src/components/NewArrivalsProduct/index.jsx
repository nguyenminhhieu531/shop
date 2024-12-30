import React from 'react';
import BoxProduct from '../BoxProduct';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NewArrivalsProduct() {
    const newArrivals = useSelector((state) => state.productSlice.newArrivals);
    return (
        <>
            <section className="pt-16 pb-8 bg-gray">
                <div className="container">
                    <div className="lg:flex justify-between items-end">
                        <div>
                            <h2 className="text-3xl font-bold">New Arrivals</h2>
                            <p className="mt-2 text-lightGray">
                                Experience the best products at our store!
                            </p>
                        </div>
                        <Link
                            to={"/product"}
                            className="mt-6 lg:mt-0 h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300"
                        >
                            View All
                        </Link>
                    </div>
                    <ul className="mt-6 grid grid-cols-2 gap-10 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {newArrivals.slice(10, 14).map((item, index) => (
                            <BoxProduct key={index} data={item} />
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default NewArrivalsProduct;