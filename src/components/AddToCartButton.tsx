"use client"

import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";

const AddToCartButton = () => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [isSuccess])

    return(
        <Button
            size={"lg"}
            className={"w-full"}
            onClick={() => {
                setIsSuccess(true)
            }}
        >
            {isSuccess ? "Added!" : "Add to cart"}
        </Button>
    )
}

export default AddToCartButton