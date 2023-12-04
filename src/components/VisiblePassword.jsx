"use client"

import { HiEye, HiEyeOff } from "react-icons/hi"

export default function VisiblePassword({visiblePassoword, setVisiblePassword}) {
    return (
        <div className="flex justify-end items-center">
            <div className="w-12 h-8 absolute flex justify-center items-center">
                {!visiblePassoword ? (
                    <HiEye
                        className="text-gray-500 text-xl absolute cursor-pointer max-sm:text-base"
                        onClick={() => setVisiblePassword(true)}
                    />
                ): (
                    <HiEyeOff
                        className="text-gray-500 text-xl absolute cursor-pointer max-sm:text-base"
                        onClick={() => setVisiblePassword(false)}
                    />
                )}
            </div>
        </div>
    )
}
