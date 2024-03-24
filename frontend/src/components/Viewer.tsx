import React from "react";

interface ViewerProps {
    value: string;
}
export default function Component(props: ViewerProps) {
    return <div dangerouslySetInnerHTML={{__html: props.value}} />
}