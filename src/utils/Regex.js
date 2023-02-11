export const validateEmail = new RegExp(
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export const validateName = new RegExp(
    /^[a-zA-Z ]{2,30}$/
);


export const validateLastName = new RegExp(
    /^[a-zA-Z ]{2,30}$/
);

export const validatePasword = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
);

export const validateCity = new RegExp(
    /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/
    
);

export const validateCountry = new RegExp(
    /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/
    
);





