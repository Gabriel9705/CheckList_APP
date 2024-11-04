import { Oval } from "react-loader-spinner"
import { LoadingSpace } from "./LoadingStyled";

export default function LoadingMenor() {
    return (
        <LoadingSpace>
            <Oval
                visible={true}
                height="50"
                width="50"
                color="#4d9ba9"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </LoadingSpace>
    )
};
