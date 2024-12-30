import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';

function OrderPage(props) {
    const cartItems = useSelector((state) => state.cartSlice.cartItems);

    const [formData, setFormData] = useState({
        contact: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        postalCode: '',
        country: 'VietNam',
        ship: false,
        store: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handlePayNow = async (e) => {
        e.preventDefault();

        // Tạo nội dung email
        const emailData = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.contact,
            address: formData.address,
            phone: formData.phone,
            postalCode: formData.postalCode || 'N/A',
            total: cartItems.reduce(
                (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
                0
            ) + "$",
            cartItems: cartItems
                .map((item) => `- ${item.title} x${item.quantity} ($${item.price})`)
                .join('\n'),
            delivery: formData.ship ? "Ship COD" : formData.store ? "Lấy sản phẩm tại cửa hàng" : "",
        }

        try {
            await emailjs.send(
                'service_5fal3in', // ID của service email
                'template_u1sr20x', // ID của template email
                emailData,  // Dữ liệu email
                '-ukl6JeuBmXsF5uKL' // User ID của bạn trong EmailJS
            );
            toast.success('Đặt hàng thành công');
        } catch (error) {
            toast.error('Đặt hàng thất bại! Mời bạn mua hàng lại!');
        }
    };

    if (!cartItems) {
        return <></>
    }

    return (
        <main>
            <section>
                <div className="pt-16">
                    <h2 className="text-3xl font-semibold text-center">Payment Order</h2>
                    <div className="container">
                        <div className="lg:grid grid-cols-2 mt-10 gap-8">
                            <div>
                                <form className="space-y-6" onSubmit={handlePayNow}>
                                    <div className="w-full">
                                        <label className="font-semibold text-lg">Delivery</label>
                                        <div className="flex items-center gap-2 mt-3">
                                            <input name="ship" id="ship-check" className="cursor-pointer size-4" type="checkbox" checked={formData.ship || false} // Sử dụng giá trị từ formData
                                                onChange={handleInputChange} />
                                            <label name="ship" for="ship-check" className="text-[14px] cursor-pointer">Ship</label>
                                        </div>
                                        <div class="flex items-center gap-2 mt-3">
                                            <input name="store" id="store-check" class="cursor-pointer size-4" type="checkbox" checked={formData.store || false} // Sử dụng giá trị từ formData
                                                onChange={handleInputChange} />
                                            <label name="store" for="store-check" class="text-[14px] cursor-pointer">Pick up in store</label>
                                        </div>
                                        <br />
                                        <label htmlFor="contact" className="font-semibold text-lg">Contact</label>
                                        <input
                                            id="contact"
                                            name="contact"
                                            type="text"
                                            className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                            placeholder="Email"
                                            value={formData.contact}
                                            onChange={handleInputChange}
                                        />
                                    </div>


                                    <div className="flex items-center gap-4">
                                        <input
                                            name="firstName"
                                            type="text"
                                            className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                            placeholder="First name"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            name="lastName"
                                            type="text"
                                            className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                            placeholder="Last name"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <input
                                        name="address"
                                        type="text"
                                        className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                    <div className="flex items-center gap-4">
                                        <input
                                            name="phone"
                                            type="text"
                                            className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                            placeholder="Phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            name="postalCode"
                                            type="text"
                                            className="mt-2 w-full h-[50px] border border-gray p-5 rounded-lg text-[14px]"
                                            placeholder="Postal code (optional)"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full uppercase h-[55px] bg-black text-white font-semibold text-sm px-4 flex-1 rounded-lg hover:bg-white border hover:border-black hover:text-black transition-all"
                                    >
                                        ORDER NOW
                                    </button>
                                </form>
                            </div>
                            <div className="lg:p-10 mt-10 lg:mt-0">
                                <ul className="space-y-3">
                                    {cartItems.map((item, index) => (
                                        <li key={index} className="flex items-center gap-3" >
                                            <img className="image_cart" src={item.thumbnail} alt={item.name} />
                                            <p>{item.title}</p>
                                            <span className="ml-auto">${item.price}</span>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="mt-6 space-y-4">
                                    <li className='flex items-center justify-between'>
                                        <span className="text-lg font-bold">Total:</span>
                                        <span className="text-lg font-bold">
                                            ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                                        </span>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main >
    );
}

export default OrderPage;
