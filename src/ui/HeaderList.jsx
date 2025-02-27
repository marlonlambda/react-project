import { IoSearchOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";

import { Button, Card, CardBody, Input } from "@heroui/react";
import React from 'react'

export const HeaderList = ({ children }) => {
    return (
        <Card className="mb-4">
            <CardBody className=" justify-between" >
                <div className="flex gap-4">
                    <Input
                        color="primary"
                        variant="bordered"
                        labelPlacement="outside"
                        placeholder="you@example.com"
                        startContent={
                            <IoSearchOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                    { children }

                </div>
            </CardBody>
        </Card>

    )
}
