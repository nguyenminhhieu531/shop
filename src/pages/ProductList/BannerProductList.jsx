import React from 'react';

function BannerProductList(props) {
    return (
        <>
            <section class="relative">
                <img src="./assets/images/img_product_list_banner.webp" alt="" />
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <h2 class="text-4xl font-semibold">Products</h2>
                    <ul class="flex items-center gap-3 justify-center mt-2">
                        <li>
                            <a href="index.html">Home / </a>
                        </li>
                        <li>
                            <a href="index.html">Products</a>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}

export default BannerProductList;