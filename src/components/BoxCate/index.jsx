import React from 'react';
import { avatarFake } from '../../helper/constant';

function BoxCate({ isCheckLayoutCategory, data, idx }) {
    if (!data) {
        return null;
    }
    return (
        <>
            {
                isCheckLayoutCategory ?
                    <li>
                        <div className="rounded-[20px] overflow-hidden relative group" >
                            <img className="image" src={avatarFake[idx]} alt="" />
                            <a
                                href="#none"
                                className="absolute group-hover:bottom-10 left-1/2 -translate-x-1/2 -bottom-10 mt-8 h-9 bg-white px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300"
                            >
                                {data.name}
                            </a>
                        </div>
                    </li>
                    :
                    <li className="mt-6 md:mt-0">
                        <a href="#none">
                            <div className="rounded-lg overflow-hidden">
                                <img className="image" src={avatarFake[idx]} alt="" />
                            </div>
                            <h3 className="mt-4 font-semibold">{data.name}</h3>
                        </a>
                    </li>
            }
        </>
    );
}

export default BoxCate;