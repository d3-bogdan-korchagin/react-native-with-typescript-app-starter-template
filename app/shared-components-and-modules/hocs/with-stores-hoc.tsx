//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React from "react";

const withStoresHoc = props => (Wrapped) => {

    return (
        <React.Fragment>
            <Wrapped {...props}/>
        </React.Fragment>
    );
}

export default withStoresHoc;
