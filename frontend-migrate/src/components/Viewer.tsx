import React, { useState } from "react";

interface ViewerProps {
    value: string;
}
export default function Component(props: ViewerProps) {
    return <div>{props.value}</div>
}