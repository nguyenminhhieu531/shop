import React from 'react';
import { Link } from 'react-router-dom';
import MenuAccount from './MenuAccount';
import { useSelector } from 'react-redux';

function HeaderProfile(props) {
    const { isLogin } = useSelector((state) => state.authenSlice);
    const cartItems = useSelector((state) => state.cartSlice.cartItems);

    return (
        <>
            <div className="flex items-center gap-6 ml-auto lg:ml-0 shrink-0">
                <a href="#none" className="lg:hidden">
                    <img className="size-5" src="../assets/images/ico_search.png" alt="" />
                </a>

                {
                    isLogin ? <MenuAccount /> : (
                        <Link to={"login"}>
                            <img className="size-5" src="../assets/images/ico_user.png" alt="" />
                        </Link>
                    )
                }

                <a href="#none" className="relative">
                    <span className="absolute -top-[8px] -right-[10px] size-[18px] bg-black text-white rounded-full text-xs grid place-items-center">
                        10
                    </span>
                    <img className="size-5" src="../assets/images/ico_heart.png" alt="" />
                </a>

                <Link to={"shopping-cart"} className="relative">
                    <span className="absolute -top-[8px] -right-[10px] size-[18px] bg-black text-white rounded-full text-xs grid place-items-center">
                        {cartItems.length}
                    </span>
                    <img className="size-5" src="../assets/images/ico_bag.png" alt="" />
                </Link>
            </div>
        </>
    );
}

export default HeaderProfile;