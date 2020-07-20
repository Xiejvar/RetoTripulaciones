export const validateName = (str) => {
    let patt = /^[A-Z][a-zA-Z0-9_]{4,}/
    if(patt.test(str))
        return true
    else 
        return false
}

export const validateSurName = (str) => {
    let patt = /^[A-Z][a-zA-Z0-9_]{3,}/
    if(patt.test(str))
        return true
    else 
        return false
}

export const validateBirth = (str) => {
    let patt = /^\d{2}\/\d{2}\/\d{4}$/
    if(patt.test(str))
        return true
    else 
        return false
}


export const validateEmail = (email) => {
    let patt = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if(patt.test(email))
        return true
    else
        return false
}


export const validatePassword = (pass) => {
    let patt = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(patt.test(pass))
        return true
    else 
        return false
}

const validateNum = (num) => {
    let patt = /^\d{2}$/
    if(patt.test(num))
        return true
    else   
        return false
    
}

validateNum(22)