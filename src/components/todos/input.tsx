import React, {FunctionComponent} from "react";

interface IProps {
    value: string;
    onChange: (value:string) => void;
    testId?: string;
    className?:string;
    placeholder?:string
}
const TextInput:FunctionComponent<IProps> = (props) => {

    return <input placeholder={props.placeholder} value={props.value} className={props.className} onChange={(e) => props.onChange(e.target.value)} type="text" data-testid={props.testId}/>
}

export default TextInput;
