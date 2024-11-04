import { FallingLines } from "react-loader-spinner";
import { Overlay } from "./LoadingStyled";

const Loading = () => {
    return (
        <Overlay>
            <FallingLines
                color="#4d56a9"
                width="150"
                visible={true}
                ariaLabel="falling-circles-loading"
            />
        </Overlay>
    )
};

export default Loading;
