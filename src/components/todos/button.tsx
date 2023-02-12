import React, {FunctionComponent} from "react";

interface IProps {
    label: string;
    disabled?: boolean;
    testId?: string;
    onClick: () => void;

    className?:string;
}
const Button: FunctionComponent<IProps> = (props) => {
    return <button data-testid={props.testId} disabled={props.disabled} className={props.className} onClick={props.onClick}>{props.label}</button>
}

export default Button;
