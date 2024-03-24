const valid = ({username,fullname,email,password,confirmPassword,gender}) => {
    const err = {}
    if (!fullname){
        err.fullname = 'Please add your fullname'
    }else if(fullname.length > 25){
        err.fullname = 'length should be less than 25 caracteres'
    }

    if(!username){
        err.username = 'Please add your username'
    }else if(username.replace(/ /g,'').length > 25){
        err.username= 'length should be less than 25 caracteres'
    }

    if(!password){
        err.password = 'Please add your password'
    }else if(password.length < 6){
        err.password= 'very short password'
    }

    if (password !== confirmPassword){
        err.confirmPassword = "password should be match"
    }

    if(!email){
        err.email = 'Please add your email'
    }

    return {
        errMsg : err,
        errLength : Object.keys(err).length
    }
}

export default valid;