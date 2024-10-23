import { useState } from 'react';

const AlertExample = () => {
    const [visible, setVisible] = useState(true);

    const closeAlert = () => {
        setVisible(false);
    };

    return (
        <div className="container mt-4">
            {visible && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Warning!</strong> This is a warning alert—check it out!
                    <button type="button" className="btn-close" aria-label="Close" onClick={closeAlert}></button>
                </div>
            )}

        </div>
    );
};

export default AlertExample;
