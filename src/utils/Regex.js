export const validateEmail = new RegExp(
    "^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$"
);

export const validateName = new RegExp(
    "^([ \u00c0-\u01ffa-zA-Z'\-])+$"
);

export const validateLastName = new RegExp(
    "^([ \u00c0-\u01ffa-zA-Z'\-])+$"
);

export const validatePasword = new RegExp(
    "^.{6,}$"
);

export const validateCity = new RegExp(
   "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$"
    
);

export const validateCountry = new RegExp(
   "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$"
    
);





