import BoxProduct from '../BoxProduct';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Bestseller() {
    const bestSeller = useSelector((state) => state.productSlice.bestSeller);
    return (
        <>
            <section className="mt-9 lg:mt-24 pt-16 pb-8 bg-gray">
                <div className="container">
                    <div className="lg:flex justify-between items-end">
                        <div>
                            <h2 className="text-3xl font-bold">Bestseller</h2>
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
                        {bestSeller.slice(0, 8).map((item, index) => (
                            <BoxProduct key={index} data={item} />
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Bestseller;