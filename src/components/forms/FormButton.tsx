import {Button} from "@/components/ui/button";
import React from "react";

type FormButterProps = {
    name: string;
};

export function FormButton(props: FormButterProps) {
    return (
        <Button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 active:bg-sky-800"
        >
            {props.name}
        </Button>
    );
}
