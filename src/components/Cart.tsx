"use client"

import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {ShoppingCart} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {cn, formatPrice} from "@/lib/utils";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";
import Image from "next/image";
import {useCart} from "@/hooks/use-cart";
import CartItem from "@/components/CartItem";
import {ScrollArea} from "@/components/ui/scroll-area";
import {useEffect, useState} from "react";

const Cart = () => {
    const {items} = useCart()
    const itemCount = items.length
    const cartTotal = items.reduce(
        (total, {product}) => total + product.price, 0)
    const fee = 1

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return(
        <Sheet>
            <SheetTrigger className={"group -m-2 flex items-center p-2"}>
                {/* Navbar Cart Icon*/}
                <ShoppingCart
                    className={"h-6 w-6 flex-shrink-0 text-gray-400 group-hover:tet-gray-500"}
                    aria-hidden={"true"}
                />
                <span className={"ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"}>
                    {isMounted ? itemCount : 0}
                </span>
            </SheetTrigger>
            {/* Cart Sidebar*/}
            <SheetContent className={"flex w-full flex-col pre-0 sm:max-w-lg"}>
                <SheetHeader className={"space-y-2.5 pr-6"}>
                    <SheetTitle>Cart ({itemCount})</SheetTitle>
                </SheetHeader>
                {itemCount > 0 ? (
                    <>
                        <div className={"flex w-full flex-col pr-6"}>
                            <ScrollArea>
                                {items.map(({product}) => (
                                    <CartItem
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </ScrollArea>
                        </div>
                        <div className={"space-y-4 pr-6"}>
                            <Separator />
                            <div className={"space-y-1.5 text-sm"}>
                                <div className={"flex"}>
                                    <span className={"flex-1"}>
                                        Shipping
                                    </span>
                                    <span>Free</span>
                                </div>
                                <div className={"flex"}>
                                    <span className={"flex-1"}>
                                        Transaction Fee
                                    </span>
                                    <span>
                                        {formatPrice(fee)}
                                    </span>
                                </div>
                                <div className={"flex"}>
                                    <span className={"flex-1"}>
                                        Total
                                    </span>
                                    <span>
                                        {formatPrice(cartTotal + fee)}
                                    </span>
                                </div>
                            </div>

                            <SheetFooter>
                                <SheetTrigger asChild>
                                    <Link
                                        href={"/cart"}
                                        className={buttonVariants({
                                            className: "w-full",
                                        })}
                                    >
                                        Continue to Checkout
                                    </Link>
                                </SheetTrigger>
                            </SheetFooter>
                        </div>
                    </>
                ) : (
                    <div className={"flex h-full flex-col items-center justify-center space-y-1"}>
                        <div aria-hidden={"true"} className={"relative mb-4 h-60 w-60 text-muted-foreground"}>
                            <Image
                                src={"/hippo-empty-cart.png"}
                                alt={"empty shopping cart hippo"}
                                fill
                            />
                        </div>
                        <div className={"text-xl font-semibold"}>
                            Your cart is empty!
                        </div>
                        <SheetTrigger asChild>
                            <Link
                                href={"/products"}
                                className={buttonVariants({
                                    variant: "link",
                                    size: "sm",
                                    className: "text-sm text-muted-foreground"
                                })}
                            >
                                Add items to your cart...
                            </Link>
                        </SheetTrigger>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}

export default Cart;